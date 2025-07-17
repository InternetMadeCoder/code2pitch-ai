import os
import re
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

from flask_cors import CORS
CORS(app, origins=[
    "https://code2pitch-ai.vercel.app",
    "http://localhost:4000",
    "http://localhost:3000"
])

HUGGINGFACE_API_TOKEN = os.getenv("HF_API_KEY")
HUGGINGFACE_MODEL = "facebook/bart-large-cnn"
HF_API_URL = f"https://api-inference.huggingface.co/models/{HUGGINGFACE_MODEL}"
HEADERS = {"Authorization": f"Bearer {HUGGINGFACE_API_TOKEN}"}

GITHUB_API_BASE = "https://api.github.com/repos"
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

def fetch_readme(github_url):
    try:
        parts = github_url.strip("/").split("/")
        owner, repo = parts[-2], parts[-1]
        api_url = f"{GITHUB_API_BASE}/{owner}/{repo}/readme"
        headers = {"Accept": "application/vnd.github.v3.raw"}
        if GITHUB_TOKEN:
            headers["Authorization"] = f"Bearer {GITHUB_TOKEN}"
        res = requests.get(api_url, headers=headers)
        print("📦 GitHub API:", res.status_code, api_url)
        return res.text if res.status_code == 200 else None
    except Exception as e:
        print("❌ Error fetching README:", e)
        return None

def clean_readme(text):
    text = re.sub(r"```.*?```", "", text, flags=re.DOTALL) 
    text = re.sub(r"!\[.*?\]\(.*?\)", "", text) 
    text = re.sub(r"\[(.*?)\]\((.*?)\)", r"\1", text) 
    text = re.sub(r"#.*", "", text) 
    text = re.sub(r"\n{2,}", "\n", text)
    return text.strip()[:2000]

def query_huggingface(prompt, max_length=180, min_length=60):
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
            print("🤖 HF Error:", response.status_code, response.text)
            return "AI response failed."
    except Exception as e:
        print("🤖 HF exception:", e)
        return "AI response failed."

@app.route("/generate-pitch", methods=["POST"])
def generate_pitch():
    try:
        data = request.get_json()
        repo_link = data.get("repo_link")
        if not repo_link:
            return jsonify({"error": "Missing repo_link"}), 400

        readme = fetch_readme(repo_link)
        if not readme:
            return jsonify({"error": "Could not fetch README."}), 404

        cleaned = clean_readme(readme)

        summary = query_huggingface(cleaned, max_length=220, min_length=80)

        elevator_pitch = (
            f"This project aims to solve problems by: {summary}"
        )
        demo_script = (
            "1. Clone the repo\n"
            "2. Follow the installation instructions in the README\n"
            "3. Run the example script or demo app\n"
            "4. Observe the outputs or results as described"
        )
        tagline = summary.split(".")[0].strip()  

        return jsonify({
            "summary": summary,
            "elevator_pitch": elevator_pitch,
            "demo_script": demo_script,
            "tagline": tagline
        })

    except Exception as e:
        print("generate-pitch route error:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/ping")
def ping():
    return "pong"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))