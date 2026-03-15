# Deploying to GitHub Pages (project site at `/repo_name`)

The app is built **with** a base path so it works at **https://username.github.io/REPO_NAME/** (e.g. `https://vasharma05.github.io/Portfolio/`).

## 1. One-time GitHub setup

1. In your repo, go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.

## 2. Deploy

- Every push to **main** runs `.github/workflows/deploy.yml`: it builds with `NEXT_PUBLIC_BASE_PATH=/REPO_NAME` and deploys the `out/` folder.
- Your site is at **https://\<username>.github.io/\<repo-name>/** (trailing slash).

## 3. Local build (with base path)

To test the same paths as GitHub Pages:

```bash
npm ci
NEXT_PUBLIC_BASE_PATH=/Portfolio npm run build
npx serve out
```

Replace `Portfolio` with your repo name if different.

## 4. Custom domain (optional)

To use a custom domain (e.g. vasharma05.com), add it under **Settings → Pages → Custom domain** and configure DNS. The site will still be built with the repo base path; for root at a custom domain you’d need a separate build without base path (see earlier DEPLOY notes if you have them).

## 5. “Ask” section (Gemini 2.0 Flash)

The **Ask about my experience** section calls `POST /api/ask`, which uses **Gemini 2.0 Flash** and `content.json` as context. This is a **server** route: it does **not** run on the static GitHub Pages build.

- **Local:** Run `next dev` or `next start` (not a static export). Set `GEMINI_API_KEY` in `.env.local`.
- **Hosted:** Deploy to **Vercel** (or any Node server) so `/api/ask` is available. Set `GEMINI_API_KEY` in the host’s environment variables. For a static-only deploy (e.g. GitHub Pages), the Ask UI will appear but the request will fail unless you point it at a separate backend that implements the same API.
