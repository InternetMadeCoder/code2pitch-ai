from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
import httpx
import os
import logging
from dotenv import load_dotenv
import re
from base64 import b64decode
import json
import asyncio
import uuid
from datetime import datetime
import random  # Add this import

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Code2Pitch API",
    description="API for generating pitch materials from GitHub repositories",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RepoRequest(BaseModel):
    github_url: HttpUrl

@app.middleware("http")
async def add_request_id(request: Request, call_next):
    request_id = str(uuid.uuid4())
    start_time = datetime.now()
    
    try:
        response = await call_next(request)
        process_time = (datetime.now() - start_time).total_seconds()
        response.headers["X-Request-ID"] = request_id
        logger.info(
            f"RequestID: {request_id} - Method: {request.method} - "
            f"Path: {request.url.path} - Time: {process_time:.3f}s"
        )
        return response
    except Exception as e:
        logger.error(
            f"RequestID: {request_id} - Error: {str(e)} - "
            f"Path: {request.url.path}"
        )
        raise

async def extract_repo_info(url: str) -> tuple[str, str]:
    """Extract username and repo name from GitHub URL."""
    pattern = r"github\.com/([^/]+)/([^/]+)"
    match = re.search(pattern, str(url))
    if not match:
        raise HTTPException(status_code=400, message="Invalid GitHub URL")
    return match.group(1), match.group(2)

async def fetch_github_data(username: str, repo: str) -> dict:
    """Fetch README and commit data from GitHub."""
    headers = {}
    if github_token := os.getenv("GITHUB_TOKEN"):
        headers["Authorization"] = f"token {github_token}"
    
    async with httpx.AsyncClient() as client:
        # Fetch README
        readme_response = await client.get(
            f"https://api.github.com/repos/{username}/{repo}/readme",
            headers=headers
        )
        if readme_response.status_code != 200:
            raise HTTPException(status_code=404, detail="README not found")
        
        readme_content = b64decode(readme_response.json()["content"]).decode()

        # Fetch recent commits
        commits_response = await client.get(
            f"https://api.github.com/repos/{username}/{repo}/commits?per_page=5",
            headers=headers
        )
        if commits_response.status_code != 200:
            raise HTTPException(status_code=404, detail="Commits not found")
        
        commit_messages = [
            commit["commit"]["message"] 
            for commit in commits_response.json()
        ]

        return {
            "readme": readme_content,
            "recent_commits": commit_messages
        }

async def generate_pitch(repo_data: dict) -> dict:
    """Generate pitch content using HuggingFace."""
    API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
    headers = {"Authorization": f"Bearer {os.getenv('HUGGINGFACE_API_KEY')}"}

    # Enhanced prompt with more specific instructions
    prompt = f"""Create a compelling pitch package for this GitHub project. Be specific and detailed:

Project Information:
{repo_data['readme'][:1500]}

Recent Updates:
{' '.join(repo_data['recent_commits'][:3])}

Generate the following sections with EXACT headers and requirements:

Technical Summary:
[Provide a detailed technical overview focusing on architecture, tech stack, and key features. Must be 50-100 words.]

Elevator Pitch:
[Create a compelling business-focused pitch highlighting unique value, market fit, and target users. Must be 100-150 words.]

Demo Script:
[Write a structured walkthrough of 3-5 key features with clear benefits and use cases. Must be 100-200 words.]

Tagline:
[Create a memorable one-liner highlighting the core value proposition. Must be 5-10 words.]"""

    content_retries = 2
    for content_attempt in range(content_retries):
        max_retries = 3
        for api_attempt in range(max_retries):
            try:
                # Increased timeout to 60 seconds
                async with httpx.AsyncClient(timeout=httpx.Timeout(60.0)) as client:
                    logger.info(f"Attempt {api_attempt + 1}/{max_retries} for content generation")
                    
                    # Add timeout handling for status check
                    try:
                        status_response = await client.get(API_URL, timeout=10.0)
                    except httpx.ReadTimeout:
                        logger.warning("Status check timed out, proceeding with generation attempt")
                        status_response = None
                    
                    if status_response and status_response.status_code == 404:
                        raise HTTPException(
                            status_code=500,
                            detail="Model not available. Trying alternative model..."
                        )

                    try:
                        response = await client.post(
                            API_URL,
                            headers=headers,
                            json={
                                "inputs": prompt,
                                "parameters": {
                                    "max_length": 3072,
                                    "min_length": 500,
                                    "do_sample": True,
                                    "temperature": 0.8,
                                    "top_p": 0.95,
                                    "top_k": 50,
                                    "num_beams": 5,
                                    "no_repeat_ngram_size": 3,
                                    "length_penalty": 1.5
                                }
                            }
                        )
                    except httpx.ReadTimeout:
                        logger.warning(f"Request timed out on attempt {api_attempt + 1}")
                        if api_attempt < max_retries - 1:
                            # Exponential backoff with jitter
                            wait_time = (2 ** api_attempt) + (random.random() * 0.5)
                            logger.info(f"Waiting {wait_time:.2f} seconds before retry")
                            await asyncio.sleep(wait_time)
                            continue
                        raise HTTPException(
                            status_code=504,
                            detail="Request timed out after multiple retries"
                        )

                    try:
                        result = response.json()
                    except json.JSONDecodeError:
                        if attempt < max_retries - 1:
                            continue
                        raise HTTPException(
                            status_code=500,
                            detail="Invalid JSON response from AI service"
                        )

                    if isinstance(result, list) and result:
                        text = result[0].get('generated_text', '')
                        
                        sections = {
                            'summary': '',
                            'elevator_pitch': '',
                            'demo_script': '',
                            'tagline': ''
                        }
                        
                        # Enhanced section parsing
                        current_section = None
                        section_content = []
                        
                        for part in text.split('\n'):
                            if 'Technical Summary:' in part:
                                current_section = 'summary'
                                section_content = []
                            elif 'Elevator Pitch:' in part:
                                if current_section:
                                    sections[current_section] = ' '.join(section_content).strip()
                                current_section = 'elevator_pitch'
                                section_content = []
                            elif 'Demo Script:' in part:
                                if current_section:
                                    sections[current_section] = ' '.join(section_content).strip()
                                current_section = 'demo_script'
                                section_content = []
                            elif 'Tagline:' in part:
                                if current_section:
                                    sections[current_section] = ' '.join(section_content).strip()
                                current_section = 'tagline'
                                section_content = []
                            elif current_section and part.strip():
                                content = part.split(':', 1)[-1].strip()
                                if content:
                                    section_content.append(content)
                        
                        if current_section:
                            sections[current_section] = ' '.join(section_content).strip()

                        # Validate content quality
                        min_lengths = {'summary': 50, 'elevator_pitch': 100, 'demo_script': 100, 'tagline': 5}
                        max_lengths = {'summary': 100, 'elevator_pitch': 150, 'demo_script': 200, 'tagline': 15}
                        
                        all_valid = True
                        for section, content in sections.items():
                            word_count = len(content.split())
                            if word_count < min_lengths[section] or word_count > max_lengths[section]:
                                all_valid = False
                                break
                        
                        if all_valid:
                            return sections
                        
                        if content_attempt < content_retries - 1:
                            await asyncio.sleep(2)
                            continue
                            
                        return {
                            'summary': sections['summary'] if len(sections['summary'].split()) >= min_lengths['summary'] 
                                     else f"Content too short. Expected {min_lengths['summary']}-{max_lengths['summary']} words.",
                            'elevator_pitch': sections['elevator_pitch'] if len(sections['elevator_pitch'].split()) >= min_lengths['elevator_pitch']
                                           else f"Content too short. Expected {min_lengths['elevator_pitch']}-{max_lengths['elevator_pitch']} words.",
                            'demo_script': sections['demo_script'] if len(sections['demo_script'].split()) >= min_lengths['demo_script']
                                        else f"Content too short. Expected {min_lengths['demo_script']}-{max_lengths['demo_script']} words.",
                            'tagline': sections['tagline'] if len(sections['tagline'].split()) >= min_lengths['tagline']
                                     else f"Content too short. Expected {min_lengths['tagline']}-{max_lengths['tagline']} words."
                        }

            except httpx.HTTPStatusError as e:
                logger.error(f"HTTP error occurred: {str(e)}")
                if api_attempt == max_retries - 1:
                    raise HTTPException(
                        status_code=e.response.status_code,
                        detail=f"AI service error: {str(e)}"
                    )
            
            except Exception as e:
                logger.error(f"Unexpected error during generation: {str(e)}")
                if api_attempt == max_retries - 1:
                    raise HTTPException(
                        status_code=500,
                        detail=f"Generation failed: {str(e)}"
                    )

        await asyncio.sleep(2 ** api_attempt)

    raise HTTPException(
        status_code=500,
        detail="Failed to generate valid pitch content after multiple attempts"
    )

@app.post("/generate")
async def generate_pitch_from_repo(repo: RepoRequest):
    """Generate pitch materials from GitHub repository."""
    request_id = str(uuid.uuid4())
    try:
        logger.info(f"RequestID: {request_id} - Starting pitch generation for URL: {repo.github_url}")
        
        username, repo_name = await extract_repo_info(repo.github_url)
        logger.info(f"RequestID: {request_id} - Extracted repo info: {username}/{repo_name}")
        
        repo_data = await fetch_github_data(username, repo_name)
        logger.info(f"RequestID: {request_id} - Fetched GitHub data successfully")
        
        pitch_content = await generate_pitch(repo_data)
        logger.info(f"RequestID: {request_id} - Generated pitch content successfully")
        
        return {
            "status": "success",
            "request_id": request_id,
            "data": pitch_content,
            "repo": {
                "username": username,
                "name": repo_name
            }
        }
    except HTTPException as he:
        logger.error(f"RequestID: {request_id} - HTTP Error: {str(he)}")
        raise
    except Exception as e:
        logger.error(f"RequestID: {request_id} - Unexpected error: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail={
                "message": "An internal server error occurred",

                "request_id": request_id,                "error_type": type(e).__name__
            }
        )

@app.get("/")
async def root():
    """Root endpoint returning API information."""
    return {
        "name": "Code2Pitch API",
        "version": "1.0.0",
        "description": "Generate pitch materials from GitHub repositories",
        "docs_url": "/docs",
        "endpoints": {
            "generate": "/generate"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)