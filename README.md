# ⚡ HackCC Ultimate React + Vite Hackathon Starter Template

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built for HackCC](https://img.shields.io/badge/Hackathon-HackCC%20Online-cyan.svg)](#)

A zero-friction, production-grade starter template designed specifically for **HackCC** and California Community College hackathons. 

Stop losing the first 4 hours of your hackathon debugging Node versions, CSS setups, or team Git merge conflicts. **Build fast, collaborate safely, and ship your MVP before the buzzer.**

---

## ✨ Features Included Out of the Box

- ⚡ **React 19 + TypeScript + Vite 8**: Sub-second Hot Module Replacement (HMR) and ultra-fast production builds.
- 🎨 **Tailwind CSS v4**: Beautiful modern utility styling with dark-mode aesthetic.
- 🛡️ **HackCC Git Guard (`npm run check:secrets`)**: Built-in scanner that automatically catches accidentally committed API keys (OpenAI, Gemini, AWS) and `.env` files before they hit public GitHub.
- 🤝 **Team Git Rescue Modal**: In-app emergency cheat sheet with 1-click copy commands for stashing, branching, and resolving merge conflicts.
- ⏱️ **Live Hackathon Submission Countdown**: Keeps your team aware of the remaining time until the Devpost deadline.
- 🤖 **Interactive AI Feature Sandbox**: Pre-wired API caller with instant mock responses (so your demo never breaks during judging) and live Gemini/OpenAI toggle.
- 📝 **Devpost Pitch Generator**: Built-in form that formats your problem statement, solution, and tech stack into Markdown for your final submission.
- ☁️ **GitHub Codespaces Ready**: Teammates on Chromebooks or slow laptops can launch a full cloud dev environment in the browser in 15 seconds.
- 🚀 **1-Click Continuous Deployment**: Pre-configured for instant hosting on Vercel or Netlify.

---

## 🚀 5-Minute Team Quickstart

### Step 1: Create Your Team Repo (One teammate only)
1. Click the green **"Use this template"** button at the top of this GitHub repository and choose **"Create a new repository"**.
2. Name your repo (e.g. `hackcc-2026-yourteamname`) and set it to **Public**.
3. Go to **Settings > Collaborators** and invite your teammates.

### Step 2: Clone and Start Coding (All teammates)
```bash
# 1. Clone your new repository
git clone https://github.com/YOUR_TEAM/YOUR_REPO.git
cd YOUR_REPO

# 2. Install dependencies
npm install

# 3. Create your local .env file (optional)
cp .env.example .env

# 4. Start the local development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

> 💡 **No local Node.js or stuck on Windows/Chromebook?**
> Click the **Open in GitHub Codespaces** button above to code directly in your browser with zero installs!

---

## 🛡️ The 4 Git Rules for Winning Hackathon Teams

Online hackathons are lost when teams push directly to `main` at 2:00 AM and overwrite each other's code. Follow these four simple rules:

### 1. Never code directly on `main`
Always create a branch for your feature:
```bash
git checkout main
git pull origin main
git checkout -b feature/login-screen
```

### 2. Check for secrets before committing
Never commit `.env` or paste raw API keys into code:
```bash
npm run check:secrets
```

### 3. Commit and open a Pull Request
```bash
git add .
git commit -m "feat: implement user dashboard"
git push -u origin feature/login-screen
```
Go to your GitHub repo, click **"Compare & pull request"**, fill out the pre-populated PR checklist, and have a teammate review and merge it.

### 4. How to safely pull teammate's changes without losing work
```bash
git stash
git pull origin main
git stash pop
```

---

## 📂 Project Architecture

```text
├── .devcontainer/        # 1-click cloud development setup for GitHub Codespaces
├── .github/
│   ├── workflows/ci.yml  # GitHub Actions: automated build & secret check on every PR
│   └── pull_request_template.md # Team pre-merge safety checklist
├── scripts/
│   └── check-secrets.js  # HackCC Git Guard script
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Nav bar with Git guide trigger & status pill
│   │   ├── CountdownTimer.tsx   # Live countdown clock to hackathon deadline
│   │   ├── GitGuideModal.tsx    # Interactive in-app Git cheat sheet
│   │   ├── AiPlayground.tsx     # Working demo sandbox with mock & live AI
│   │   └── PitchCard.tsx        # Devpost pitch generator & markdown exporter
│   ├── services/
│   │   └── api.ts               # Resilient AI API caller (Gemini / OpenAI fallback)
│   ├── types/
│   │   └── index.ts             # Shared TypeScript types
│   ├── App.tsx                  # Main cockpit & hackathon roadmap
│   ├── index.css                # Tailwind CSS v4 entry
│   └── main.tsx                 # React entry point
├── .env.example                 # Safe environment variable documentation
├── vite.config.ts               # Vite + Tailwind v4 config
└── package.json
```

---

## 🏆 HackCC Devpost Submission Checklist

Before submitting at the deadline:
- [ ] **Working Deployment Link**: Add your live Vercel/Netlify URL to Devpost.
- [ ] **Public GitHub Link**: Ensure your repo is set to Public so judges can see your code.
- [ ] **2–3 Minute Demo Video**: Record a video walkthrough (using Loom or YouTube) showing:
  1. The problem your community college peers face.
  2. A live, working walkthrough of your app features.
  3. The tech stack and challenges your team overcame.
- [ ] **Fill Out Pitch Card**: Use the built-in Pitch Card in the app to copy & paste your project description directly into Devpost.

---

## 📜 License
MIT License. Built for community college hackers across California.
