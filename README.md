# 🚀 Code2Pitch – Turn GitHub Repos into Pitch Decks

> Helping developers pitch their projects like pros.

![Next.js](https://img.shields.io/badge/Frontend-Next.js-blue?logo=next.js)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?logo=typescript)
![Python](https://img.shields.io/badge/Backend-Python-yellow?logo=python)
![Flask](https://img.shields.io/badge/API-Flask-000000?logo=flask)


---

## 🧠 Problem

Developers often struggle to articulate the value of their projects to investors, mentors, or during hackathons. Even great code can go unnoticed without the right pitch.

---

## ✨ Solution

**Code2Pitch** turns any GitHub repository into:

- 📣 A clear **elevator pitch**
- 🎥 A scripted **demo walkthrough**
- 📝 A concise **project summary**  
&nbsp;  
Just enter a GitHub repo URL and get a polished pitch in seconds!

---

## 🌟 Features

- 🔗 Paste GitHub repo → get instant pitch
- 🤖 AI-generated pitch, summary & demo script
- 📜 Downloadable pitch decks
- 🌐 Shareable summaries
- 🧠 Language & code-aware summaries using AI

---

## 🔍 Demo

https://code2pitch-ai.vercel.app/

![demo](./assets/code2pitch-demo.gif)

---

## 📁 Project Structure

```
code2pitch/
├── frontend/ # Next.js + TypeScript frontend
│ ├── components/ # Reusable UI components
│ │ └── PitchCard.tsx # Pitch display component
│ ├── pages/ # Next.js routes
│ │ ├── index.tsx # Home page with form
│ │ └── result.tsx # Result display
│ ├── public/ # Static assets (logo, favicons)
│ ├── styles/ # Tailwind/global CSS
│ ├── utils/ # Frontend helpers
│ └── tsconfig.json
│
├── backend/ # Python backend (FastAPI)
│ ├── app/
│ │ ├── main.py # Entry point for FastAPI
│ │ ├── services/
│ │ │ └── pitch_generator.py # Core logic for pitch generation
│ │ ├── models/
│ │ │ └── schemas.py # Pydantic models for requests/responses
│ │ └── utils/
│ │ └── github_parser.py # GitHub README/code parser
│ └── requirements.txt
│
├── .env # Environment variables (API keys etc.)
├── README.md
└── LICENSE
```

---

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/code2pitch.git
   cd code2pitch
   ```

2. **Set up Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Runs the app at http://localhost:3000

3. **Set Up Backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # For Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```
   Backend runs at http://localhost:8000

4. **Open your browser**
   Navigate to
   `http://localhost:3000`

---

### 📡 API Overview

| Method | Endpoint          | Description                             |
| ------ | ----------------- | --------------------------------------- |
| POST   | `/generate-pitch` | Generates pitch content from GitHub URL |
| GET    | `/health`         | Checks backend status                   |

Sample POST /generate-pitch body:
```
{
  "repo_url": "https://github.com/username/project"
}
```

---
### 🧰 Tech Stack
Frontend: Next.js, TypeScript, Tailwind CSS

Backend: FastAPI (Python)

AI: OpenAI/Gemini, LangChain (LLM APIs)

Parsing: GitHub API, Markdown parsing, optional AST tools

Deployment: Vercel (frontend), Render (backend)

---
### 🛣️ Roadmap

- [x] Basic pitch generation from GitHub repo
- [x] Responsive frontend interface
- [ ] PDF export of generated pitch
- [ ] Shareable pitch page with unique link
- [ ] AI voice/audio pitch generation
- [ ] Browser extension for one-click repo pitching

---
### 🤝 Contributing
Contributions welcome!
Please open an issue or submit a PR.
```
# Quick steps
1. Fork the repo
2. Create a new branch (`git checkout -b feature/new-feature`)
3. Make your changes
4. Commit and push
5. Open a pull request
```

---

### “Your code deserves the spotlight. Let Code2Pitch be your voice.”
