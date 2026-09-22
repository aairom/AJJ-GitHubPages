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
8. [Licence](#licence)

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

## Licence

MIT License — see [LICENSE](LICENSE) for details.

© 2025 Asnières Jujitsu
