# Deploying to vasharma05.com (GitHub Pages + custom domain)

This app is built as a **static export** and is set up to be published at **vasharma05.com** via GitHub Pages.

## 1. One-time GitHub Pages setup

1. In your repo, go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Under **Custom domain**, enter **vasharma05.com** and save.
4. If GitHub shows a **DNS check** or **Recommended CNAME**, you’ll use that in the next step.

## 2. DNS at your domain registrar

Point **vasharma05.com** to GitHub Pages using one of these:

**Option A – CNAME (recommended)**  
At your DNS provider (e.g. Cloudflare, Namecheap, Google Domains), add:

| Type  | Name  | Value                    |
|-------|--------|---------------------------|
| CNAME | `@` or blank (root) | `<username>.github.io` |

- If the provider doesn’t allow CNAME on the root (`@`), use **Option B** (A records) or use `www.vasharma05.com` as the CNAME and set that as the custom domain in GitHub.

**Option B – A records (for root domain)**  
Add these A records for the root domain:

| Type | Name | Value        |
|------|------|--------------|
| A    | @    | 185.199.108.153 |
| A    | @    | 185.199.109.153 |
| A    | @    | 185.199.110.153 |
| A    | @    | 185.199.111.153 |

(These are GitHub’s documented IPs; they can change—check [GitHub’s Pages docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages) if needed.)

**Optional – www redirect**  
To have `www.vasharma05.com` work or redirect to `vasharma05.com`:

| Type  | Name | Value                    |
|-------|------|---------------------------|
| CNAME | www  | `<username>.github.io`    |

Then in **Settings → Pages → Custom domain**, you can add `www.vasharma05.com` and choose “Redirect to the apex domain” (or use only the apex).

## 3. Enforce HTTPS (recommended)

After DNS has propagated:

1. In **Settings → Pages**, ensure **Enforce HTTPS** is checked.
2. It may take a few minutes to a few hours for the certificate to be ready.

## 4. Deploy the site

- Every push to **main** runs the workflow in `.github/workflows/deploy.yml`: it runs `npm run build` (no base path) and deploys the `out/` folder to GitHub Pages.
- Your site will be available at **https://vasharma05.com** once DNS and GitHub Pages are set.

## 5. Local build (no base path)

```bash
npm ci
npm run build
```

Static files are in `out/`. Serve locally with:

```bash
npx serve out
```

---

**Note:** The workflow is configured with **no** `NEXT_PUBLIC_BASE_PATH`, so the app is built for the root. That is correct for vasharma05.com. If you later want to use the same repo as a project site (e.g. `username.github.io/portfolio`), you’d need to set `NEXT_PUBLIC_BASE_PATH` in the workflow and use a different branch or repo for the custom domain.
