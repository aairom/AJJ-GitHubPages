# Asnières Jujitsu — Site Web Jekyll

🇬🇧 [Read in English](README.md)

[![Déploiement Jekyll → GitHub Pages](https://github.com/aairom/AJJ-GitHubPages/actions/workflows/jekyll.yml/badge.svg)](https://github.com/aairom/AJJ-GitHubPages/actions/workflows/jekyll.yml)

Site statique du club **Asnières Ju-Jitsu** (Asnières-sur-Seine, France), construit avec [Jekyll](https://jekyllrb.com/) et déployé sur [GitHub Pages](https://pages.github.com/) gratuitement.

> **Site en ligne :** https://aairom.github.io/AJJ-GitHubPages/

---

## Table des matières

1. [Démarrage rapide (local)](#démarrage-rapide-local)
2. [Prérequis](#prérequis)
3. [Installation](#installation)
4. [Exécution en local](#exécution-en-local)
5. [Déploiement sur GitHub Pages](#déploiement-sur-github-pages)
6. [Structure du projet](#structure-du-projet)
7. [Aide-mémoire pour l'édition du contenu](#aide-mémoire-pour-lédition-du-contenu)
8. [Flux de mise à jour](#flux-de-mise-à-jour)
9. [Nom de domaine personnalisé (optionnel)](#nom-de-domaine-personnalisé-optionnel)
10. [Intégration du formulaire de contact](#intégration-du-formulaire-de-contact)
11. [Licence](#licence)

---

## Démarrage rapide (local)

```bash
# 1 — Cloner le dépôt
git clone https://github.com/aairom/AJJ-GitHubPages.git
cd AJJ-GitHubPages

# 2 — Installer les dépendances (gems Ruby)
bundle install

# 3 — Lancer le serveur local avec rechargement automatique
bundle exec jekyll serve --livereload

# 4 — Ouvrir dans le navigateur
open http://localhost:4000/AJJ-GitHubPages/
```

---

## Prérequis

| Outil   | Version minimale | Remarques                                           |
|---------|------------------|-----------------------------------------------------|
| Ruby    | 3.1              | Recommandé avec [rbenv](https://rbenv.org/) ou [RVM](https://rvm.io/) |
| Bundler | 2.3              | `gem install bundler`                               |
| Jekyll  | 4.3              | Installé via le Gemfile                             |
| Git     | 2.x              | Installation standard                               |

**macOS** — Ruby est préinstallé mais souvent obsolète. Utiliser `rbenv` :

```bash
brew install rbenv
rbenv install 3.1.6
rbenv global 3.1.6
gem install bundler
```

**Linux / WSL** :

```bash
sudo apt-get install ruby-full build-essential zlib1g-dev
gem install bundler
```

---

## Installation

```bash
bundle install
```

Cette commande installe toutes les gems épinglées dans le `Gemfile`, y compris `github-pages`, qui reproduit exactement l'environnement utilisé par GitHub Pages.

---

## Exécution en local

```bash
bundle exec jekyll serve --livereload
```

Options :
- `--livereload` — recharge automatiquement le navigateur à chaque modification de fichier
- `--drafts` — génère également les articles dans `_drafts/`
- `--port 4001` — utilise un port différent (ne pas utiliser le port 5000 sur macOS)

Le site est accessible à **http://localhost:4000/AJJ-GitHubPages/** (ou `http://localhost:4000/` si `baseurl` est vide).

### Génération seule (sans serveur)

```bash
bundle exec jekyll build
```

Le résultat est généré dans `_site/`. Ne pas inclure ce dossier dans les commits — il est exclu par `.gitignore`.

---

## Déploiement sur GitHub Pages

### Recommandé : GitHub Actions (automatique)

Le workflow défini dans [`.github/workflows/jekyll.yml`](.github/workflows/jekyll.yml) compile et déploie le site automatiquement à chaque push sur `main`.

**Configuration initiale (une seule fois) :**

1. Accéder au dépôt sur GitHub → **Settings → Pages**.
2. Dans **Source**, sélectionner **GitHub Actions**.
3. Pousser n'importe quel commit sur `main` — le workflow s'exécute et déploie automatiquement.
4. L'URL du site s'affiche sous Settings → Pages une fois le déploiement effectué.

### Manuel : branche `gh-pages` (alternative)

Pour ceux qui préfèrent l'approche classique par branche :

```bash
bundle exec jekyll build
# Puis pousser le contenu du dossier _site/ vers la branche gh-pages
```

Cette méthode est plus complexe et déconseillée — utiliser de préférence le workflow GitHub Actions.

---

## Structure du projet

```
AJJ-GitHubPages/
├── _config.yml            # Configuration Jekyll (URL, plugins, données du club)
├── Gemfile                # Gems Ruby (github-pages et plugins)
│
├── _layouts/              # Gabarits HTML des pages
│   ├── default.html       # Enveloppe toutes les pages (en-tête + pied de page)
│   ├── page.html          # Pages de contenu secondaires
│   └── post.html          # Article de blog
│
├── _includes/             # Fragments HTML réutilisables
│   ├── head.html          # Balise <head> (méta, liens CSS)
│   ├── header.html        # Barre de navigation
│   ├── footer.html        # Pied de page avec liens sociaux
│   └── scripts.html       # Inclusions JavaScript
│
├── _pages/                # Pages hors blog (Markdown)
│   ├── blog.md            # Liste des articles
│   ├── remise-en-forme.md
│   ├── faq.md
│   ├── quest-ce-que-le-ju-jitsu.md
│   ├── comite-directeur.md
│   └── 5-bonnes-raisons.md
│
├── _posts/                # Articles de blog (AAAA-MM-JJ-slug.md)
│   ├── 2025-09-01-bienvenue-nouveau-site.md
│   ├── 2025-07-15-5-conseils-progresser-jujitsu.md
│   └── 2025-06-20-resultats-tournoi-juin-2025.md
│
├── assets/
│   ├── css/style.css      # Tous les styles (portés depuis le site original)
│   ├── js/main.js         # Navigation, carrousels, formulaires
│   └── images/            # Logo, photos, galerie/
│       └── gallery/       # Photos de la galerie (affichées automatiquement)
│
├── index.html             # Page d'accueil (toutes les sections principales)
│
└── .github/
    └── workflows/
        └── jekyll.yml     # Workflow de compilation et déploiement automatiques
```

---

## Aide-mémoire pour l'édition du contenu

### Ajouter un article de blog

Créer `_posts/AAAA-MM-JJ-mon-slug.md` :

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

### Mettre à jour les tarifs

Modifier les cartes de tarifs directement dans [`index.html`](index.html) — rechercher le bloc commentaire `<!-- Adulte -->`.

### Mettre à jour les horaires

Modifier les cartes d'horaires dans [`index.html`](index.html) — rechercher `<!-- Section Horaires -->`.

### Ajouter des photos à la galerie

Déposer des fichiers `.jpg` / `.png` dans `assets/images/gallery/`. Ils s'affichent automatiquement dans la section galerie de la page d'accueil.

### Mettre à jour la navigation

Modifier [`_includes/header.html`](_includes/header.html).

### Mettre à jour les liens du pied de page / réseaux sociaux

Modifier [`_includes/footer.html`](_includes/footer.html) ou mettre à jour `_config.yml` sous la clé `club:`.

### Activer le formulaire de contact

1. Créer un compte gratuit sur [Formspree](https://formspree.io/).
2. Créer un formulaire et copier l'URL du point d'entrée (`https://formspree.io/f/xxxx`).
3. Dans `index.html`, renseigner `data-action="https://formspree.io/f/xxxx"` sur `#contactForm` et `#newsletterForm`.

---

## 🔄 Flux de mise à jour

Pour les modifications courantes (nouveaux articles, mise à jour des horaires, des tarifs, des photos), le flux de travail est le suivant :

```bash
# 1. Effectuer les modifications en local
# 2. Prévisualiser le résultat
bundle exec jekyll serve --livereload
# Ouvrir http://localhost:4000/AJJ-GitHubPages/

# 3. Indexer toutes les modifications
git add .

# 4. Créer un commit avec un message descriptif
git commit -m "Add post: résultats tournoi octobre 2025"

# 5. Pousser sur main — GitHub Actions recompile et déploie automatiquement
git push origin main
```

GitHub Pages reflète généralement la mise à jour en **60 à 90 secondes**. Le statut du déploiement est visible via le badge en haut de ce fichier ou directement depuis :

> **Onglet Actions → workflow Jekyll** → dernière exécution

### Stratégie de branches

| Branche    | Rôle |
|---|---|
| `main`     | Branche de production — chaque push déclenche un déploiement en ligne |
| `draft/...` | Branches de fonctionnalité ou de contenu optionnelles — à fusionner dans `main` quand prêtes |

Pour les petites modifications (fautes de frappe, ajustements rapides de tarifs), un commit direct sur `main` est acceptable.
Pour les changements plus importants (nouvelle page, refonte de mise en page), utiliser une branche de fonctionnalité et ouvrir une pull request :

```bash
git checkout -b draft/nouvelle-page-equipe
# ... modifier les fichiers ...
git add .
git commit -m "Add équipe page"
git push origin draft/nouvelle-page-equipe
# Puis fusionner via une pull request GitHub → main
```

Ou utiliser le script utilitaire :

```bash
./scripts/deploy.sh "Add post: résultats tournoi octobre 2025"
```

---

## 🌍 Nom de domaine personnalisé (optionnel)

Par défaut, le site est servi à l'adresse `https://aairom.github.io/AJJ-GitHubPages/`. Pour le servir depuis un domaine personnalisé (par ex. `www.asnieresjujitsu.fr`) :

### 1 — Créer le fichier `CNAME`

Créer un fichier nommé `CNAME` à la racine du dépôt, contenant uniquement le nom de domaine :

```
www.asnieresjujitsu.fr
```

> **Important :** l'ajout d'un fichier `CNAME` modifie le comportement de `baseurl`. Mettre à jour `_config.yml` en conséquence :
>
> ```yaml
> url:     "https://www.asnieresjujitsu.fr"
> baseurl: ""
> ```

### 2 — Configurer les enregistrements DNS

Chez votre fournisseur DNS (Cloudflare, OVH, Gandi, etc.), ajouter les enregistrements suivants :

| Type    | Nom  | Valeur |
|---------|------|--------|
| `A`     | `@`  | `185.199.108.153` |
| `A`     | `@`  | `185.199.109.153` |
| `A`     | `@`  | `185.199.110.153` |
| `A`     | `@`  | `185.199.111.153` |
| `CNAME` | `www` | `aairom.github.io` |

> Utiliser des enregistrements `A` pour le domaine apex (`asnieresjujitsu.fr`) et un `CNAME` pour le sous-domaine `www`.

### 3 — Activer dans les paramètres du dépôt GitHub

1. Accéder au dépôt sur GitHub → **Settings → Pages**.
2. Dans **Custom domain**, saisir `www.asnieresjujitsu.fr` et cliquer sur **Save**.
3. Cocher **Enforce HTTPS** une fois le certificat TLS provisionné (généralement en quelques minutes).

La propagation DNS peut prendre jusqu'à 24 à 48 heures. Pour vérifier :

```bash
dig www.asnieresjujitsu.fr +noall +answer
```

---

## 📬 Intégration du formulaire de contact

Le site comprend deux formulaires dans [`index.html`](index.html) : un **formulaire de contact** (`#contactForm`) et un **formulaire d'inscription à la newsletter** (`#newsletterForm`). Les deux utilisent un attribut `data-action=""` comme point d'entrée de soumission — cet attribut est intentionnellement laissé vide dans le dépôt afin qu'aucune soumission réelle ne soit envoyée tant qu'un service tiers n'est pas configuré.

### Service recommandé : Formspree

[Formspree](https://formspree.io/) fournit un point d'entrée de formulaire gratuit, sans serveur, compatible avec les sites statiques GitHub Pages.

**Étapes de configuration :**

1. Créer un compte gratuit sur [formspree.io](https://formspree.io/).
2. Cliquer sur **New Form**, lui donner un nom (ex. *Contact AJJ*) et copier l'URL du point d'entrée générée :
   ```
   https://formspree.io/f/YOUR_FORM_ID
   ```
3. Dans [`index.html`](index.html), renseigner l'attribut `data-action` sur les deux formulaires :

   ```html
   <!-- Contact form -->
   <form id="contactForm" data-action="https://formspree.io/f/YOUR_FORM_ID">

   <!-- Newsletter form -->
   <form id="newsletterForm" class="newsletter-form" data-action="https://formspree.io/f/YOUR_NEWSLETTER_ID">
   ```

4. Le JavaScript dans [`assets/js/main.js`](assets/js/main.js) lit `data-action` au moment de l'exécution et envoie les données du formulaire en JSON via POST. Aucune autre modification du code n'est nécessaire.

### Traitement des soumissions

| Étape | Ce qui se passe |
|---|---|
| L'utilisateur soumet le formulaire | `main.js` lit `data-action` et envoie le JSON au point d'entrée Formspree via POST |
| Formspree reçoit la soumission | Valide la charge utile et la transmet à l'adresse e-mail configurée |
| Vous recevez un e-mail | Formspree envoie le message à `asnieresjujitsu@gmail.com` (configuré dans le tableau de bord Formspree) |
| L'utilisateur voit la confirmation | `main.js` masque le formulaire et affiche un message de succès dans `#newsletterMsg` / en ligne |

### Approche par variable d'environnement (pour CI/CD)

Pour éviter d'écrire en dur l'URL Formspree dans le HTML, il est possible de l'injecter au moment de la compilation via une variable Jekyll. Ajouter le point d'entrée dans `_config.yml` :

```yaml
formspree:
  contact:    "https://formspree.io/f/YOUR_FORM_ID"
  newsletter: "https://formspree.io/f/YOUR_NEWSLETTER_ID"
```

Puis le référencer dans `index.html` :

```html
<form id="contactForm" data-action="{{ site.formspree.contact }}">
<form id="newsletterForm" data-action="{{ site.formspree.newsletter }}">
```

> **Note de sécurité :** les URL des points d'entrée Formspree sont publiques par nature (elles apparaissent dans le HTML rendu). Pour se protéger contre le spam, activer les options reCAPTCHA intégrées ou le champ honeypot depuis le tableau de bord Formspree.

---

## Licence

Licence MIT — voir [LICENSE](LICENSE) pour les détails.

© 2025 Asnières Jujitsu
