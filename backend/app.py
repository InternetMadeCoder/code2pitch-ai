import os
import requests
from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load summarization pipeline once at startup
summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

GITHUB_API_BASE = "https://api.github.com/repos"

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

def summarize_text(text, max_len=120, min_len=40):
    try:
        text = text[:1000]  # HuggingFace model token limit workaround
        result = summarizer(text, max_length=max_len, min_length=min_len, do_sample=False)
        return result[0]["summary_text"]
    except Exception as e:
        print("Error summarizing:", e)
        return "Summary could not be generated."

def generate_tagline(readme):
    try:
        prompt = (
            "Generate a catchy one-line tagline for the following project:\n\n"
            + readme[:1000]  # Truncate to stay safe
        )
        result = summarizer(prompt, max_length=25, min_length=8, do_sample=False)
        return result[0]["summary_text"]
    except Exception as e:
        print("Error generating tagline:", e)
        return "Tagline could not be generated."

def generate_extras(summary):
    elevator = f"This project is designed to {summary.lower()} It helps developers solve a real problem efficiently."
    demo = (
        "1. Clone the repository\n"
        "2. Install dependencies\n"
        "3. Run the main script\n"
        f"4. Observe how it {summary.lower()}"
    )
    return elevator, demo

@app.route("/generate-pitch", methods=["POST"])
def generate_pitch():
    data = request.get_json()
    repo_link = data.get("repo_link")

    if not repo_link:
        return jsonify({"error": "Missing repo_link in request"}), 400

    readme = fetch_readme(repo_link)
    if not readme:
        return jsonify({"error": "Could not fetch README. Check repo link."}), 404

    summary = summarize_text(readme)
    elevator, demo_script = generate_extras(summary)
    tagline = generate_tagline(readme)

    return jsonify({
        "summary": summary,
        "elevator_pitch": elevator,
        "demo_script": demo_script,
        "tagline": tagline
    })

if __name__ == "__main__":
    app.run(debug=True)
