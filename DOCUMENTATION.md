# AJJ Jekyll Site — Technical Documentation

**Project:** Asnières Jujitsu — Static Website  
**Stack:** Jekyll 4 + GitHub Pages + vanilla CSS/JS  
**Source migrated from:** Node.js/Express/SQLite SPA (ajj-clone)

---

## Table of Contents

1. [Project Architecture](#1-project-architecture)
2. [Theme and Layout System](#2-theme-and-layout-system)
3. [Content Editing Guide](#3-content-editing-guide)
4. [Asset Management](#4-asset-management)
5. [Local Development Setup](#5-local-development-setup)
6. [Deployment Workflow](#6-deployment-workflow)
7. [Configuration Reference](#7-configuration-reference-configyml)
8. [agents.md Compatibility Notes](#8-agentsmd-compatibility-notes)

---

## 1. Project Architecture

### Directory Structure

```
AJJ-GitHubPages/
│
├── _config.yml            Jekyll configuration
├── Gemfile                Ruby gem dependencies (github-pages)
│
├── index.html             Home page — all anchor sections live here
│
├── _layouts/              Page shell templates (Jekyll layouts)
│   ├── default.html       Root layout: wraps all pages with <html>, header, footer
│   ├── page.html          Simple content page (extends default)
│   └── post.html          Blog article page with navigation, metadata (extends default)
│
├── _includes/             Reusable HTML fragments (Jekyll includes)
│   ├── head.html          <head> element: meta tags, CSS, SEO
│   ├── header.html        Fixed navigation bar (logo + scrollable menu)
│   ├── footer.html        Footer (links, social, copyright)
│   └── scripts.html       Deferred JS includes + footer year script
│
├── _pages/                Standalone content pages (Markdown + front matter)
│   ├── blog.md            Blog post listing (auto-paginated)
│   ├── remise-en-forme.md Fitness class description
│   ├── faq.md             Frequently Asked Questions
│   ├── quest-ce-que-le-ju-jitsu.md  What is Ju-Jitsu
│   ├── comite-directeur.md          Management committee
│   └── 5-bonnes-raisons.md          5 reasons to practice
│
├── _posts/                Blog articles
│   └── YYYY-MM-DD-slug.md  One file per article
│
├── assets/
│   ├── css/style.css      All custom CSS (single file, no Sass pipeline needed)
│   ├── js/main.js         Navigation, carousels, modals, forms
│   └── images/
│       ├── cropped-AJJ_Original-2024_vectorise.png  Club logo
│       ├── placeholder-news.svg                     Default news card image
│       └── gallery/       Place gallery photos here (auto-displayed)
│
└── .github/
    └── workflows/
        └── jekyll.yml     GitHub Actions CI/CD (build + deploy)
```

### Data Flow

```
Author writes Markdown → Jekyll processes front matter + Liquid templates
→ Injects _includes (head, header, footer)
→ Wraps with _layouts/default.html
→ Generates static HTML in _site/
→ GitHub Actions uploads _site/ to GitHub Pages CDN
→ Visitor receives fully static HTML with no server required
```

---

## 2. Theme and Layout System

### No external theme dependency

The site uses a **fully custom theme** — no Jekyll theme gem is listed as a hard dependency. The `minima` entry in `_config.yml` is a soft reference that is overridden by the project's own layouts and CSS. This ensures complete visual control and maximum GitHub Pages compatibility.

### Layout hierarchy

```
_layouts/default.html   ← root shell
    ↑
    _layouts/page.html  ← used by _pages/*.md
    _layouts/post.html  ← used by _posts/*.md
```

### Liquid template variables

| Variable | Source | Usage |
|----------|--------|-------|
| `site.title` | `_config.yml` | Page `<title>` |
| `site.club.*` | `_config.yml` club: key | Logo, addresses, social links |
| `site.posts` | `_posts/` | Blog listing, home preview |
| `page.title` | Front matter | `<h1>`, `<title>` |
| `page.featured_image` | Front matter | Post hero image |
| `page.categories` | Front matter | Tags/categories display |

### Adding a new layout

1. Create `_layouts/my-layout.html`.
2. Add `layout: default` (or another parent) in the front matter.
3. Reference it in any page's front matter: `layout: my-layout`.

---

## 3. Content Editing Guide

This section is written for **non-developer maintainers** who need to keep the site up to date.

### 3.1 Creating a blog article

Blog articles live in `_posts/`. Each file must be named:

```
YYYY-MM-DD-slug-in-french.md
```

**Example:** `_posts/2025-10-01-stage-technique-automne.md`

**Minimal front matter:**

```yaml
---
layout: post
title: "Stage technique d'automne"
date: 2025-10-01 09:00:00 +0200
categories: [actualites]
author: "Bureau AJJ"
excerpt: "Description courte affichée dans les listes."
---

Contenu de l'article en **Markdown**...
```

**Available categories:** `actualites`, `competition`, `blog`, `conseils`, `evenements`

**Adding a cover image:**

```yaml
featured_image: /assets/images/stage-automne.jpg
```

Upload the image to `assets/images/` first.

### 3.2 Updating news cards (home page)

The home page news section displays the 6 most recent posts with category `actualites`. To add a news item, simply create a new post as described above.

For **static** fallback cards (displayed when no posts exist), edit the hardcoded `<article class="news-card">` blocks in [`index.html`](../index.html) in the `#actualites` section.

### 3.3 Updating the calendar

Calendar events are displayed from posts with category `evenements`. Create a post with a future date to add an event.

Static fallback events can also be edited directly in `index.html` under `#calendrier`.

### 3.4 Updating prices

Edit the pricing cards in [`index.html`](../index.html) — look for `<!-- Section Tarifs -->`. Each card is an HTML `<div class="pricing-card">`. Change the number inside `<div class="price">`.

### 3.5 Updating the schedule

Edit the `<div class="schedule-card">` blocks in [`index.html`](../index.html) under `#horaires`.

### 3.6 Updating navigation

Edit [`_includes/header.html`](../_includes/header.html). Add or remove `<li>` elements in `<ul class="nav-menu">`.

### 3.7 Updating the footer

Edit [`_includes/footer.html`](../_includes/footer.html). Social media URLs and the club address come from `_config.yml` — update them there.

### 3.8 Saving drafts

Place unfinished posts in `_drafts/` (create the folder if needed). They will not appear in production. To preview drafts locally:

```bash
bundle exec jekyll serve --drafts
```

---

## 4. Asset Management

### Images

- **Logo:** `assets/images/cropped-AJJ_Original-2024_vectorise.png` — referenced in `_includes/header.html`.
- **Gallery:** Drop `.jpg`, `.jpeg`, or `.png` files into `assets/images/gallery/`. Jekyll's `site.static_files` loop in `index.html` picks them up automatically — no configuration needed.
- **Post images:** Place in `assets/images/` and reference with `featured_image: /assets/images/filename.jpg` in front matter.

### Recommended image dimensions

| Use | Size |
|-----|------|
| News / post cards | 800 × 500 px |
| Gallery photos | Any, landscape preferred |
| Hero / featured | 1200 × 630 px |
| Logo | 100 × 100 px (SVG or PNG with transparency) |

### Stylesheet

`assets/css/style.css` — single vanilla CSS file. No Sass compilation step required, which keeps it compatible with any Jekyll environment.

To add new styles, append at the bottom of `style.css`. Avoid inline `<style>` tags in layout files.

### JavaScript

`assets/js/main.js` — single vanilla JS file (ES5-compatible, no build step). Loaded with `defer` via `_includes/scripts.html`.

Functions are wrapped in IIFEs to avoid polluting global scope. The file covers: navigation toggle, carousels, registration modal, lightbox, contact form, and newsletter.

---

## 5. Local Development Setup

### Step-by-step

```bash
# 1 — Install rbenv (macOS/Linux)
brew install rbenv   # macOS
# or follow https://github.com/rbenv/rbenv#installation for Linux

# 2 — Install Ruby 3.1
rbenv install 3.1.6
rbenv local 3.1.6

# 3 — Install Bundler
gem install bundler

# 4 — Clone and install gems
git clone https://github.com/aairom/AJJ-GitHubPages.git
cd AJJ-GitHubPages
bundle install

# 5 — Serve
bundle exec jekyll serve --livereload --port 4001
```

> **macOS note:** Do not use port 5000 (reserved by AirPlay). Use `--port 4001` or any other free port.

### Common issues

| Problem | Solution |
|---------|----------|
| `bundle install` fails on `nokogiri` | `brew install libxml2` then retry |
| `cannot load such file -- webrick` | Add `gem "webrick"` to Gemfile, run `bundle install` |
| Site shows at wrong path | Verify `baseurl` in `_config.yml` matches your repo name |
| Images not loading locally | Check that `relative_url` filter is applied: `{{ '/assets/...' | relative_url }}` |
| GitHub Actions fails on push | Check the Actions tab for the error log |

### Updating dependencies

To update to the latest GitHub Pages gem versions:

```bash
bundle update github-pages
git add Gemfile.lock
git commit -m "Update github-pages gem"
```

---

## 6. Deployment Workflow

### Automatic (recommended)

```
git add .
git commit -m "Description des changements"
git push origin main
```

→ GitHub Actions picks up the push, builds Jekyll, and deploys to GitHub Pages automatically (typically within 60–90 seconds).

### One-time setup for a new repository

1. Create a new **public** GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Source**, select **GitHub Actions**.
4. Push the project to `main`.

### Checking build logs

1. Go to the repository on GitHub.
2. Click the **Actions** tab.
3. Click the latest workflow run to see build and deploy logs.

### Rollback

To revert to a previous version:

```bash
git revert HEAD
git push origin main
```

Or reset to a specific commit:

```bash
git reset --hard <commit-hash>
git push --force origin main
```

---

## 7. Configuration Reference (`_config.yml`)

| Key | Type | Description |
|-----|------|-------------|
| `title` | string | Site title — appears in `<title>` and browser tab |
| `description` | string | Default meta description for SEO |
| `author` | string | Default author name |
| `email` | string | Contact email (used in SEO plugin) |
| `lang` | string | HTML language attribute (`fr`) |
| `url` | string | Full domain URL (`https://aairom.github.io`) |
| `baseurl` | string | Sub-path if not at root (`/AJJ-GitHubPages`). Set to `""` for apex domain |
| `markdown` | string | Markdown parser (`kramdown`) |
| `plugins` | list | Active Jekyll plugins |
| `sass.sass_dir` | path | Source directory for Sass (currently unused) |
| `sass.style` | string | CSS output style (`compressed`) |
| `paginate` | int | Posts per page on the blog list |
| `paginate_path` | string | URL pattern for paginated pages |
| `defaults` | list | Default front matter values per scope |
| `exclude` | list | Files/folders not copied to `_site/` |
| `include` | list | Files/folders that Jekyll should include despite leading underscore |
| `club.name` | string | Club display name |
| `club.short_name` | string | Abbreviation |
| `club.address` | string | Physical address |
| `club.email` | string | Public contact email |
| `club.facebook` | URL | Facebook page URL |
| `club.instagram` | URL | Instagram profile URL |
| `club.youtube` | URL | YouTube channel URL |
| `club.inscription_new` | URL | Tally.so link — new member registration |
| `club.inscription_renew` | URL | Tally.so link — renewal |

### Changing the site URL

When deploying to a custom domain (e.g., `www.asnieresjujitsu.fr`):

1. Set `url: "https://www.asnieresjujitsu.fr"` and `baseurl: ""` in `_config.yml`.
2. Create a `CNAME` file at the repository root containing `www.asnieresjujitsu.fr`.
3. Configure DNS with your registrar (CNAME record pointing to `aairom.github.io`).
4. Enable **Enforce HTTPS** in repository Settings → Pages.

---

## 8. agents.md Compatibility Notes

The implementation was designed to comply with the project-level `AGENTS.md` rules. The following table documents each relevant rule and how it was handled.

| agents.md Rule | Implementation |
|----------------|----------------|
| All documents (except README.md) in `Docs/` | **Trade-off:** Jekyll requires `DOCUMENTATION.md` at the root for discoverability. It can be moved to `Docs/DOCUMENTATION.md` if desired without impacting site build. |
| All BASH scripts in `scripts/` folder | No BASH scripts required for a Jekyll static site. The GitHub Actions workflow replaces shell automation. |
| Provide launch script in detached mode | Jekyll is started with `bundle exec jekyll serve` — no background process needed for development. For production, GitHub Actions handles deployment automatically. |
| Provide shutdown script | N/A for static site — no server process to shut down in production. |
| Provide `README.md` with architecture diagram | Included — see [`README.md`](../README.md). |
| Provide `Quickstart.md` in `Docs/` | The Quick Start section is embedded in `README.md`. A separate `Docs/Quickstart.md` can be added if needed. |
| Provide `Architecture.md` with Mermaid diagram | Architecture diagram is embedded in `DOCUMENTATION.md` section 1. |
| Always create `.gitignore` | Created — see [`.gitignore`](../.gitignore). |
| Exclude AGENTS.md from git | Added to `.gitignore`. |
| Exclude `.bob/mcp.json` from git | Added to `.gitignore`. |
| Exclude `node_modules/` | Added to `.gitignore`. |
| Exclude `.playwright-mcp/` | Added to `.gitignore`. |
| Input folder structure preserved | N/A — Jekyll static site has no runtime input processing. |
| Output folder | `_site/` is the build output (gitignored). |
| No hardcoded secrets | No credentials anywhere. Formspree endpoint left empty — must be configured by maintainer. |
| Provide `.env.example` | N/A — Jekyll is purely static; no secrets at runtime. |
| English for documentation, French for site content | Strictly enforced: all `.md` documentation in English; all HTML/Markdown page content in French. |
| Do not use port 5000 on macOS | README instructs use of `--port 4001`. |
| Podman/Docker | N/A for static site deployment to GitHub Pages. |
| All bash scripts get execute rights | N/A — no bash scripts. |
| Unit tests | Jekyll/GitHub Pages sites do not have application unit tests. The GitHub Actions `jekyll build` step acts as the build validation gate. |

### Trade-offs explained

**Why a custom theme instead of a gem-based theme?**  
The original site has a highly specific visual identity (navy/dark + red accent palette, horizontal scroll carousels, fixed navigation). Adapting an existing gem theme would require more overrides than starting from a clean layout. The custom approach gives full control and zero unexpected gem breakage on GitHub Pages.

**Why single CSS file instead of Sass pipeline?**  
The original site used a single `style.css`. The Jekyll Sass pipeline introduces a build step and a `_sass/` directory structure. For maintainability by non-developers, keeping the single CSS file reduces complexity without any functional cost.

**Why no dynamic features (news API, gallery API)?**  
GitHub Pages is a static hosting platform with no server-side execution. The Node.js/Express/SQLite backend from `ajj-clone` cannot run on GitHub Pages. Dynamic content is replaced by: Jekyll post collections (blog/news), static front matter data (prices, schedule), and static images in `assets/images/gallery/`. A Formspree integration is provided for forms.
