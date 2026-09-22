# Quickstart — Asnières Jujitsu Jekyll Site

> **Everything you need to see the site in a browser right now, and to put it live on the internet for free.**

---

## Part 1 — See it in your browser right now (30 seconds)

All prerequisites (Ruby 4.0, Bundler, Jekyll 4.3) are **already installed** on this machine and all gems are already downloaded.

Open a terminal and run:

```bash
cd /Users/alainairom/Devs/AJJ-GitHubPages
bundle exec jekyll serve --livereload --port 4001
```

Then open your browser at:

```
http://localhost:4001/AJJ-GitHubPages/
```

The site is live. Every time you save a file, the browser refreshes automatically.

**To stop the server:** press `Ctrl + C` in the terminal.

---

## Part 2 — Put it live on the internet for free (GitHub Pages)

This publishes the site at a real public URL like `https://aairom.github.io/AJJ-GitHubPages/`  
at **zero cost**, with automatic re-deployment every time you push a change.

### Step 1 — Create the GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `AJJ-GitHubPages`
3. Visibility: **Public** (required for free GitHub Pages)
4. Do **not** initialise with a README
5. Click **Create repository**

### Step 2 — Enable GitHub Pages with GitHub Actions

1. In the new repository, go to **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Click **Save**

### Step 3 — Push the project

```bash
cd /Users/alainairom/Devs/AJJ-GitHubPages

# Initialise git (only needed once)
git init
git remote add origin https://github.com/aairom/AJJ-GitHubPages.git

# Stage and commit everything
git add .
git commit -m "Initial Jekyll site — Asnières Jujitsu"

# Push to GitHub
git push -u origin main
```

### Step 4 — Watch the deploy

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. You will see a workflow called **"Déploiement Jekyll → GitHub Pages"** running
4. It takes about 60–90 seconds
5. When it shows a green ✓, your site is live at:

```
https://aairom.github.io/AJJ-GitHubPages/
```

**Every future push to `main` automatically redeploys the site.**

---

## Part 3 — Update the site after going live

### Change text, prices, schedule

Open the relevant file in any text editor:

| What to change | File to edit |
|----------------|-------------|
| Hero text, prices, schedule, contact | `index.html` |
| Navigation bar items | `_includes/header.html` |
| Footer links, social URLs | `_config.yml` (under `club:`) |
| FAQ content | `_pages/faq.md` |
| Remise en forme page | `_pages/remise-en-forme.md` |

After saving, push to GitHub and it redeploys automatically:

```bash
git add .
git commit -m "Mise à jour des tarifs"
git push
```

### Add a blog article

Create a new file in `_posts/` named `YYYY-MM-DD-my-slug.md`:

```markdown
---
layout: post
title: "Mon article en français"
date: 2025-10-15 10:00:00 +0200
categories: [actualites]
author: "Bureau AJJ"
excerpt: "Courte description affichée dans les listes."
---

Contenu de l'article en **Markdown**.
```

Push to GitHub — the article appears on the blog immediately.

### Add photos to the gallery

Drop `.jpg` or `.png` files into `assets/images/gallery/`.  
They appear automatically in the gallery section on the home page — no code changes needed.

### Change the site URL / baseurl

If you push to a repository named something other than `AJJ-GitHubPages`,  
open `_config.yml` and update:

```yaml
url: "https://aairom.github.io"
baseurl: "/your-repo-name"   # ← change this
```

---

## Part 4 — Enable the contact form (optional)

By default the contact form shows an alert message but does not actually send emails (GitHub Pages is static — no server). To enable real email sending:

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form — copy the endpoint URL, e.g. `https://formspree.io/f/abcxyz`
3. In `index.html`, find `#contactForm` and set its `data-action` attribute:
   ```html
   <form id="contactForm" data-action="https://formspree.io/f/abcxyz">
   ```
4. Do the same for `#newsletterForm`
5. Push to GitHub

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Port 4001 is already in use | Use `--port 4002` or any free port |
| `bundle exec jekyll serve` says gems missing | Run `bundle install` first |
| Site loads but CSS/images are broken | Check that `baseurl` in `_config.yml` matches your repo name |
| GitHub Actions fails | Go to **Actions** tab → click the failed run → read the error log |
| Changes not showing after push | Wait 60–90 s; hard-refresh the browser (`Cmd+Shift+R`) |
