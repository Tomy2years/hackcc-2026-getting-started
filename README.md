# HackCC 2026 Getting Started

A minimal, clean React + Vite starter for HackCC hackathon teams, featuring the default React app and a built-in **Team Git Skill** to prevent merge conflicts.

## 🚀 Quickstart

### 1. Clone this repository
```bash
git clone https://github.com/Tomy2years/hackcc-2026-getting-started.git
cd hackcc-2026-getting-started
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 🤝 Team Git Workflow (Never Break `main`)

This repository comes pre-loaded with the **`team-git-flow`** skill in `.agent/skills/team-git-flow/SKILL.md` (and `skills/team-git-flow/SKILL.md`). 

If you are using an AI coding assistant (like Antigravity or Cursor), it will automatically use this skill to guide you through safe Git actions. If you are using the terminal manually, follow these four rules:

1. **Always work on a feature branch:**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/my-feature-name
   ```

2. **Sync teammate changes without losing work:**
   ```bash
   git stash
   git pull origin main
   git stash pop
   ```

3. **Stage and commit your changes:**
   ```bash
   git add .
   git commit -m "feat: describe what you built"
   git push -u origin feature/my-feature-name
   ```

4. **Open a Pull Request on GitHub** for your team to review and merge into `main`.

---

## 🚢 Free 1-Click Deployment

Deploy your live project to **Vercel** or **Netlify**:
1. Push your repository to your own GitHub account.
2. Sign in to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) using your GitHub account.
3. Select your repository and click **Deploy**.
