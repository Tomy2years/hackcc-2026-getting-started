# HackCC React Starter

A clean, minimal React + Vite starter for HackCC teams.

## Quickstart

### 1. Install dependencies
```bash
npm install
```

### 2. Start the local dev server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```

---

## Git Workflow for Teams

To avoid merge conflicts during the hackathon:

1. **Never commit directly to `main`:**
   ```bash
   git checkout -b feature/my-new-feature
   ```

2. **Pull updates from your teammates:**
   ```bash
   git pull origin main
   ```

3. **Stage and commit your changes:**
   ```bash
   git add .
   git commit -m "Add my new feature"
   git push -u origin feature/my-new-feature
   ```

4. **Open a Pull Request on GitHub** so your teammates can review and merge into `main`.

---

## Deployment

Deploy your project for free on **Vercel** or **Netlify**:
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) with GitHub.
3. Import your repository and click **Deploy**.
