import os
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv

load_dotenv()  

app = Flask(__name__)

from flask_cors import CORS
CORS(app, origins=["https://code2pitch-ai.vercel.app"])

HUGGINGFACE_API_TOKEN = os.getenv("HF_API_KEY")  
HUGGINGFACE_MODEL = "sshleifer/distilbart-cnn-12-6"

GITHUB_API_BASE = "https://api.github.com/repos"
HF_API_URL = f"https://api-inference.huggingface.co/models/{HUGGINGFACE_MODEL}"

HEADERS = {
    "Authorization": f"Bearer {HUGGINGFACE_API_TOKEN}"
}

def fetch_readme(github_url):
    try:
        parts = github_url.strip("/").split("/")
        owner, repo = parts[-2], parts[-1]
        api_url = f"{GITHUB_API_BASE}/{owner}/{repo}/readme"
        headers = {"Accept": "application/vnd.github.v3.raw"}
        res = requests.get(api_url, headers=headers)
        return res.text if res.status_code == 200 else None
    except Exception as e:
        print("Error fetching README:", e)
        return None

def query_huggingface(prompt, max_length=150, min_length=60):
    try:
        payload = {
            "inputs": prompt,
            "parameters": {
                "max_length": max_length,
                "min_length": min_length,
                "do_sample": False
            }
        }
        response = requests.post(HF_API_URL, headers=HEADERS, json=payload)
        if response.status_code == 200:
            return response.json()[0]["summary_text"]
        else:
            print("HF Error:", response.status_code, response.text)
            return "AI response failed."
    except Exception as e:
        print("HF exception:", e)
        return "AI response failed."

@app.route("/generate-pitch", methods=["POST"])
def generate_pitch():
    data = request.get_json()
    repo_link = data.get("repo_link")
    if not repo_link:
        return jsonify({"error": "Missing repo_link"}), 400

    readme = fetch_readme(repo_link)
    if not readme:
        return jsonify({"error": "Could not fetch README."}), 404

    trimmed = readme[:1000]  

    summary_prompt = (
        "Summarize this GitHub project README for a technical audience in 4–6 sentences. "
        "Focus on what the project does, its key features, and why it's useful.\n\n"
        + trimmed
    )
    pitch_prompt = (
        "Write a compelling elevator pitch for this GitHub project as if you're presenting it to a team or investor. "
        "Keep it around 80–100 words and highlight its problem-solving aspect and value.\n\n"
        + trimmed
    )
    demo_prompt = (
        "Write a short 4-step demo script to show how this GitHub project works. "
        "Use clear instructions and include what result the user will see.\n\n"
        + trimmed
    )
    tagline_prompt = (
        "Write a catchy one-line tagline that captures the core value or vibe of this GitHub project:\n\n"
        + trimmed
    )

    summary = query_huggingface(summary_prompt, max_length=200, min_length=80)
    elevator_pitch = query_huggingface(pitch_prompt, max_length=150, min_length=80)
    demo_script = query_huggingface(demo_prompt, max_length=120, min_length=60)
    tagline = query_huggingface(tagline_prompt, max_length=25, min_length=8)

    return jsonify({
        "summary": summary,
        "elevator_pitch": elevator_pitch,
        "demo_script": demo_script,
        "tagline": tagline
    })

@app.route("/ping")
def ping():
    return "pong"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))