# Asnières Jujitsu — Site Web Jekyll

[![Déploiement Jekyll → GitHub Pages](https://github.com/aairom/AJJ-GitHubPages/actions/workflows/jekyll.yml/badge.svg)](https://github.com/aairom/AJJ-GitHubPages/actions/workflows/jekyll.yml)

Static website of the **Asnières Ju-Jitsu** club (Asnières-sur-Seine, France), built with [Jekyll](https://jekyllrb.com/) and deployed on [GitHub Pages](https://pages.github.com/) at zero cost.

> **Live site:** https://aairom.github.io/AJJ-GitHubPages/

---

## Table of Contents

1. [Quick Start (Local)](#quick-start-local)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running Locally](#running-locally)
5. [Deploying to GitHub Pages](#deploying-to-github-pages)
6. [Project Structure](#project-structure)
7. [Content Editing Cheat Sheet](#content-editing-cheat-sheet)
8. [Update Workflow](#update-workflow)
9. [Custom Domain (Optional)](#custom-domain-optional)
10. [Contact Form Integration](#contact-form-integration)
11. [Licence](#licence)

---

## Quick Start (Local)

```bash
# 1 — Clone the repository
git clone https://github.com/aairom/AJJ-GitHubPages.git
cd AJJ-GitHubPages

# 2 — Install dependencies (Ruby gems)
bundle install

# 3 — Serve locally with live-reload
bundle exec jekyll serve --livereload

# 4 — Open in your browser
open http://localhost:4000/AJJ-GitHubPages/
```

---

## Prerequisites

| Tool    | Minimum version | Notes                                     |
|---------|-----------------|-------------------------------------------|
| Ruby    | 3.1             | Recommend [rbenv](https://rbenv.org/) or [RVM](https://rvm.io/) |
| Bundler | 2.3             | `gem install bundler`                     |
| Jekyll  | 4.3             | Installed via Gemfile                     |
| Git     | 2.x             | Standard installation                     |

**macOS** — Ruby is pre-installed but often outdated. Use `rbenv`:

```bash
brew install rbenv
rbenv install 3.1.6
rbenv global 3.1.6
gem install bundler
```

**Linux / WSL**:

```bash
sudo apt-get install ruby-full build-essential zlib1g-dev
gem install bundler
```

---

## Installation

```bash
bundle install
```

This installs all gems pinned in the `Gemfile`, including `github-pages`, which exactly mirrors the version set used by GitHub Pages.

---

## Running Locally

```bash
bundle exec jekyll serve --livereload
```

Options:
- `--livereload` — automatically refreshes the browser on file changes
- `--drafts` — also renders posts in `_drafts/`
- `--port 4001` — use a different port (do not use 5000 on macOS)

The site is available at **http://localhost:4000/AJJ-GitHubPages/** (or `http://localhost:4000/` if `baseurl` is empty).

### Build only (no server)

```bash
bundle exec jekyll build
```

Output is generated in `_site/`. Do not commit this folder — it is excluded by `.gitignore`.

---

## Deploying to GitHub Pages

### Recommended: GitHub Actions (automatic)

The workflow at [`.github/workflows/jekyll.yml`](.github/workflows/jekyll.yml) builds and deploys the site automatically on every push to `main`.

**One-time setup:**

1. Go to your repository on GitHub → **Settings → Pages**.
2. Under **Source**, select **GitHub Actions**.
3. Push any commit to `main` — the workflow will run and deploy automatically.
4. The site URL will be shown under Settings → Pages once deployed.

### Manual: `gh-pages` branch (alternative)

If you prefer the classic branch approach:

```bash
bundle exec jekyll build
# Then push the _site/ folder content to gh-pages branch
```

This is more complex and not recommended — use the GitHub Actions workflow instead.

---

## Project Structure

```
AJJ-GitHubPages/
├── _config.yml            # Jekyll configuration (URL, plugins, club data)
├── Gemfile                # Ruby gems (github-pages and plugins)
│
├── _layouts/              # HTML page shells
│   ├── default.html       # Wraps all pages (header + footer)
│   ├── page.html          # Secondary content pages
│   └── post.html          # Blog article
│
├── _includes/             # Reusable HTML partials
│   ├── head.html          # <head> tag (meta, CSS links)
│   ├── header.html        # Navigation bar
│   ├── footer.html        # Footer with social links
│   └── scripts.html       # JavaScript includes
│
├── _pages/                # Non-post pages (Markdown)
│   ├── blog.md            # Blog list
│   ├── remise-en-forme.md
│   ├── faq.md
│   ├── quest-ce-que-le-ju-jitsu.md
│   ├── comite-directeur.md
│   └── 5-bonnes-raisons.md
│
├── _posts/                # Blog articles (YYYY-MM-DD-slug.md)
│   ├── 2025-09-01-bienvenue-nouveau-site.md
│   ├── 2025-07-15-5-conseils-progresser-jujitsu.md
│   └── 2025-06-20-resultats-tournoi-juin-2025.md
│
├── assets/
│   ├── css/style.css      # All styles (ported from original site)
│   ├── js/main.js         # Navigation, carousels, forms
│   └── images/            # Logo, photos, gallery/
│       └── gallery/       # Gallery images (auto-displayed)
│
├── index.html             # Home page (all main sections)
│
└── .github/
    └── workflows/
        └── jekyll.yml     # Auto-build & deploy workflow
```

---

## Content Editing Cheat Sheet

### Add a blog post

Create `_posts/YYYY-MM-DD-my-slug.md`:

```markdown
---
layout: post
title: "Mon titre en français"
date: 2025-10-01 10:00:00 +0200
categories: [blog]
author: "Bureau AJJ"
excerpt: "Courte description visible dans les listes."
featured_image: /assets/images/my-image.jpg   # optional
---

Contenu de l'article en Markdown...
```

### Update pricing

Edit the pricing cards directly in [`index.html`](index.html) — search for the `<!-- Adulte -->` comment block.

### Update schedule

Edit the schedule cards in [`index.html`](index.html) — search for `<!-- Section Horaires -->`.

### Add gallery photos

Drop `.jpg` / `.png` files into `assets/images/gallery/`. They appear automatically on the home page gallery section.

### Update navigation

Edit [`_includes/header.html`](_includes/header.html).

### Update footer links / social

Edit [`_includes/footer.html`](_includes/footer.html) or update `_config.yml` under the `club:` key.

### Enable the contact form

1. Create a free account on [Formspree](https://formspree.io/).
2. Create a form and copy the endpoint URL (`https://formspree.io/f/xxxx`).
3. In `index.html`, set `data-action="https://formspree.io/f/xxxx"` on `#contactForm` and `#newsletterForm`.

---

## 🔄 Update Workflow

For day-to-day content changes (new blog posts, schedule updates, pricing, photos), the workflow is:

```bash
# 1. Make your edits locally
# 2. Preview the result
bundle exec jekyll serve --livereload
# Open http://localhost:4000/AJJ-GitHubPages/

# 3. Stage all changes
git add .

# 4. Commit with a descriptive message
git commit -m "Add post: résultats tournoi octobre 2025"

# 5. Push to main — GitHub Actions rebuilds and deploys automatically
git push origin main
```

GitHub Pages typically reflects the update within **60–90 seconds**. You can monitor the build status via the badge at the top of this README or directly at:

> **Actions tab → Jekyll workflow** → latest run

### Branch strategy

| Branch | Purpose |
|---|---|
| `main` | Production branch — every push triggers a live deployment |
| `draft/...` | Optional feature or content branches — merge to `main` when ready |

For minor edits (typos, quick pricing changes) committing directly to `main` is fine.
For larger changes (new page, layout redesign) use a feature branch and open a pull request:

```bash
git checkout -b draft/nouvelle-page-equipe
# ... edit files ...
git add .
git commit -m "Add équipe page"
git push origin draft/nouvelle-page-equipe
# Then merge via GitHub pull request → main
```

Or use the helper script:

```bash
./scripts/deploy.sh "Add post: résultats tournoi octobre 2025"
```

---

## 🌍 Custom Domain (Optional)

By default the site is served at `https://aairom.github.io/AJJ-GitHubPages/`. To serve it from a custom domain (e.g. `www.asnieresjujitsu.fr`):

### 1 — Create the `CNAME` file

Create a file named `CNAME` in the repository root containing only your domain:

```
www.asnieresjujitsu.fr
```

> **Important:** Adding a `CNAME` file changes the `baseurl` behaviour. Update `_config.yml` accordingly:
>
> ```yaml
> url:     "https://www.asnieresjujitsu.fr"
> baseurl: ""
> ```

### 2 — Configure DNS records

At your DNS provider (Cloudflare, OVH, Gandi, etc.), add the following records:

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `CNAME` | `www` | `aairom.github.io` |

> Use `A` records for the apex domain (`asnieresjujitsu.fr`) and a `CNAME` for the `www` subdomain.

### 3 — Enable in GitHub repository settings

1. Go to your repository on GitHub → **Settings → Pages**.
2. Under **Custom domain**, enter `www.asnieresjujitsu.fr` and click **Save**.
3. Check **Enforce HTTPS** once the TLS certificate has been provisioned (usually a few minutes).

DNS propagation can take up to 24–48 hours. You can verify propagation with:

```bash
dig www.asnieresjujitsu.fr +noall +answer
```

---

## 📬 Contact Form Integration

The site includes two forms in [`index.html`](index.html): a **contact form** (`#contactForm`) and a **newsletter sign-up form** (`#newsletterForm`). Both use a `data-action=""` attribute as the submission endpoint — this is intentionally left blank in the repository so no real submissions are sent until you configure a backend.

### Recommended service: Formspree

[Formspree](https://formspree.io/) provides a free, no-backend form endpoint compatible with static GitHub Pages sites.

**Setup steps:**

1. Create a free account at [formspree.io](https://formspree.io/).
2. Click **New Form**, give it a name (e.g. *Contact AJJ*), and copy the generated endpoint URL:
   ```
   https://formspree.io/f/YOUR_FORM_ID
   ```
3. In [`index.html`](index.html), set the `data-action` attribute on both forms:

   ```html
   <!-- Contact form -->
   <form id="contactForm" data-action="https://formspree.io/f/YOUR_FORM_ID">

   <!-- Newsletter form -->
   <form id="newsletterForm" class="newsletter-form" data-action="https://formspree.io/f/YOUR_NEWSLETTER_ID">
   ```

4. The JavaScript in [`assets/js/main.js`](assets/js/main.js) reads `data-action` at runtime and POSTs the form data as JSON. No further code changes are needed.

### How submissions are handled

| Step | What happens |
|---|---|
| User submits the form | `main.js` reads `data-action`, POSTs JSON to the Formspree endpoint |
| Formspree receives it | Validates the payload and forwards it to the configured email address |
| You receive an email | Formspree sends the message to `asnieresjujitsu@gmail.com` (configured in your Formspree dashboard) |
| User sees confirmation | `main.js` hides the form and displays a success message in `#newsletterMsg` / inline |

### Environment variable approach (for CI/CD)

If you prefer not to hardcode the Formspree URL in the HTML, you can inject it at build time via a Jekyll variable. Add the endpoint to `_config.yml`:

```yaml
formspree:
  contact:    "https://formspree.io/f/YOUR_FORM_ID"
  newsletter: "https://formspree.io/f/YOUR_NEWSLETTER_ID"
```

Then reference it in `index.html`:

```html
<form id="contactForm" data-action="{{ site.formspree.contact }}">
<form id="newsletterForm" data-action="{{ site.formspree.newsletter }}">
```

> **Security note:** Formspree endpoint URLs are public by nature (they appear in the rendered HTML). Protect against spam by enabling Formspree's built-in reCAPTCHA or honeypot options in your Formspree dashboard.

---

## Licence

MIT License — see [LICENSE](LICENSE) for details.

© 2025 Asnières Jujitsu
