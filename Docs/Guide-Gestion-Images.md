# Guide de gestion des images — Asnières Jujitsu Jekyll Site

> **Public cible :** responsable du site, non-développeur ou développeur débutant.  
> **Objectif :** comprendre exactement où placer les images, comment les référencer, et pourquoi le fonctionnement diffère de l'ancien site Node.js/SQLite.

---

## Table des matières

1. [Architecture des dossiers — où vont les images ?](#1-architecture-des-dossiers)
2. [La règle fondamentale : Git = Site en ligne](#2-la-règle-fondamentale--git--site-en-ligne)
3. [L'ancien dossier `uploads/` (ajj-clone) : incompatible avec Jekyll](#3-lancien-dossier-uploads--ajj-clone)
4. [Comment référencer une image selon l'endroit du site](#4-comment-référencer-une-image-selon-lendroit-du-site)
5. [Conventions de nommage et formats recommandés](#5-conventions-de-nommage-et-formats-recommandés)
6. [Exemples concrets pas à pas](#6-exemples-concrets-pas-à-pas)
7. [Récapitulatif rapide](#7-récapitulatif-rapide)

---

## 1. Architecture des dossiers

### Structure actuelle du projet

```
AJJ-GitHubPages/
├── assets/
│   ├── images/                  ← TOUS les fichiers image du site
│   │   ├── favicon.png          ← Logo utilisé comme favicon
│   │   ├── club-photo.svg       ← Illustration section "Le Club"
│   │   ├── placeholder-news.svg ← Image par défaut pour les actualités
│   │   ├── og-default.png       ← Image Open Graph (partage réseaux sociaux)
│   │   └── gallery/             ← Photos de la galerie (chargement automatique)
│   │       ├── cours-jujitsu-01.jpg
│   │       └── tournoi-2025.jpg
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── _posts/                      ← Articles de blog (Markdown)
├── _pages/                      ← Pages secondaires (Markdown)
├── _layouts/                    ← Gabarits HTML
├── _includes/                   ← Fragments HTML réutilisables
└── _config.yml                  ← Configuration globale
```

### Règle unique à retenir

> **Toute image doit se trouver dans `assets/images/` (ou un sous-dossier).**

Jekyll copie le contenu de `assets/` tel quel dans le site généré (`_site/`).  
GitHub Pages sert ensuite ce dossier `_site/` au visiteur.  
Si une image n'est pas dans `assets/images/`, elle n'existera pas sur le site en ligne.

### Sous-dossiers conseillés

| Sous-dossier | Contenu |
|---|---|
| `assets/images/` | Images générales, logo, placeholder |
| `assets/images/gallery/` | Photos de la galerie (chargement automatique) |
| `assets/images/blog/` | Images d'en-tête des articles de blog |
| `assets/images/equipe/` | Photos des membres du comité directeur |
| `assets/images/pages/` | Images des pages secondaires (remise en forme, FAQ…) |

---

## 2. La règle fondamentale : Git = Site en ligne

### Ancien fonctionnement (ajj-clone — Node.js + SQLite)

```
Utilisateur → Formulaire web → Serveur Node.js → Disque dur du serveur
                                                 → Base SQLite (chemin enregistré)
                                                 → Dossier uploads/
```

L'image était **stockée sur le serveur** et servie dynamiquement.  
Elle n'avait pas besoin d'être dans Git.

### Nouveau fonctionnement (Jekyll + GitHub Pages)

```
Vous → Copiez l'image dans assets/images/ → git add → git commit → git push
                                                                    → GitHub Actions construit le site
                                                                    → Image disponible en ligne
```

Il n'y a **aucun serveur**, aucune base de données, aucun upload dynamique.  
**Une image qui n'est pas dans Git n'apparaîtra jamais sur le site en ligne.**

### Conséquence pratique

| Action | Résultat |
|---|---|
| Copier une image dans `assets/images/` mais ne pas faire `git push` | Image visible en local, **invisible en ligne** |
| Faire `git push` sans avoir copié l'image dans `assets/images/` | Lien cassé partout |
| Copier l'image + `git add . && git commit && git push` | ✅ Image visible en ligne après ~60 secondes |

---

## 3. L'ancien dossier `uploads/` (ajj-clone)

### Ce que contient ce dossier

```
/Users/alainairom/Devs/ajj-clone/uploads/
├── 00722011-7bd9-4b58-8c93-03470c40010f.png
├── 5157ffa6-cd60-4a02-ae79-6aac14a6b36f.png
├── 56c7d0cd-1126-4c3d-abe5-ba9963a4d6ee.png
├── af210d69-ecd1-4e33-aac9-118ef4081ecc.png
├── c2cb6412-17c2-428e-a0de-b48b8809f852.png
├── c87b91eb-9b8b-4ab8-a808-a2288ae2f420.png
└── thumbnails/
    └── thumb_*.png
```

Ces fichiers ont des **noms UUID** générés automatiquement par l'ancienne application.  
Ils ne sont référencés nulle part dans le projet Jekyll actuel.

### Migration : comment récupérer ces images

1. **Identifiez** quelles images correspondent à quoi en les ouvrant une par une.
2. **Renommez-les** avec des noms significatifs (voir conventions section 5).
3. **Copiez-les** dans `assets/images/` ou un sous-dossier approprié.
4. **Référencez-les** dans vos fichiers Markdown ou HTML (voir section 4).
5. **Committez** avec `git add . && git commit -m "Ajout images galerie" && git push`.

### Commande de migration (exemple)

```bash
# Depuis le terminal, à la racine du projet Jekyll
cp /Users/alainairom/Devs/ajj-clone/uploads/00722011-7bd9-4b58-8c93-03470c40010f.png \
   assets/images/gallery/cours-jujitsu-01.jpg

cp /Users/alainairom/Devs/ajj-clone/uploads/5157ffa6-cd60-4a02-ae79-6aac14a6b36f.png \
   assets/images/gallery/entrainement-samedi.jpg
```

---

## 4. Comment référencer une image selon l'endroit du site

### Règle de chemin absolue

Toujours utiliser le filtre `relative_url` dans les templates Jekyll :

```liquid
{{ '/assets/images/mon-image.jpg' | relative_url }}
```

Ce filtre ajoute automatiquement le `baseurl` (`/AJJ-GitHubPages`) devant le chemin,  
ce qui est indispensable pour que les liens fonctionnent sur GitHub Pages.

> ⚠️ **Ne jamais écrire** `/assets/images/mon-image.jpg` directement sans `relative_url`  
> dans un fichier de layout ou d'include — le lien sera cassé sur le site en ligne.

---

### 4.1 — Dans le front matter d'un article de blog

Le champ `featured_image` est lu par `_layouts/post.html` et affiché en haut de l'article.  
Il est aussi utilisé pour l'image Open Graph (partage sur Facebook, Twitter…).

**Syntaxe dans le fichier `_posts/YYYY-MM-DD-mon-article.md` :**

```yaml
---
layout: post
title: "Mon article"
featured_image: /assets/images/blog/mon-image.jpg
---
```

> Le chemin commence par `/assets/` **sans** `relative_url` dans le front matter.  
> Le template `_layouts/post.html` et `_includes/head.html` appliquent `relative_url`  
> automatiquement lors de la génération.

---

### 4.2 — Dans le corps d'un article (Markdown)

Syntaxe Markdown standard avec le filtre Liquid pour le chemin :

```markdown
![Description de l'image]({{ '/assets/images/blog/mon-image.jpg' | relative_url }})
```

Ou, plus simplement, avec un chemin absolu depuis la racine du site  
(Jekyll résout automatiquement le baseurl dans les fichiers Markdown) :

```markdown
![Cours de Jujitsu au dojo d'Asnières](/AJJ-GitHubPages/assets/images/blog/cours-01.jpg)
```

La première syntaxe (avec `relative_url`) est **recommandée** car elle s'adapte  
automatiquement si le `baseurl` change.

---

### 4.3 — Dans une page secondaire (`_pages/*.md`)

Même syntaxe que dans les articles. Dans le front matter, le champ est aussi `featured_image` :

```yaml
---
layout: page
title: "Remise en forme"
featured_image: /assets/images/pages/remise-en-forme.jpg
---
```

Dans le corps de la page en Markdown :

```markdown
![Séance de remise en forme]({{ '/assets/images/pages/remise-en-forme.jpg' | relative_url }})
```

---

### 4.4 — Dans un layout HTML (`_layouts/`)

Dans les fichiers `.html` des layouts, utiliser systématiquement `relative_url` :

```html
<!-- Dans _layouts/post.html — déjà présent -->
{% if page.featured_image %}
<img src="{{ page.featured_image | relative_url }}"
     alt="{{ page.title }}"
     class="post-featured-img">
{% endif %}
```

Pour une image **fixe** intégrée dans un layout :

```html
<img src="{{ '/assets/images/logo-ajj.png' | relative_url }}" alt="Logo AJJ">
```

---

### 4.5 — Dans un include HTML (`_includes/`)

Identique aux layouts :

```html
<!-- Dans _includes/header.html -->
<img src="{{ '/assets/images/cropped-AJJ_Original-2024_vectorise.png' | relative_url }}"
     alt="Logo Asnières Jujitsu"
     width="50" height="50">
```

---

### 4.6 — Dans `_config.yml` (paramètres globaux)

Pour définir une image utilisée partout sur le site (logo, image OG par défaut) :

```yaml
# Dans _config.yml
club:
  logo: /assets/images/cropped-AJJ_Original-2024_vectorise.png
  og_image: /assets/images/og-default.png
```

Puis dans un template :

```html
<img src="{{ site.club.logo | relative_url }}" alt="Logo {{ site.club.name }}">
```

---

### 4.7 — Dans un fichier de données `_data/`

Pour des contenus structurés comme une liste de membres du comité ou une galerie manuelle,  
créer un fichier YAML dans `_data/` :

**Créer `_data/equipe.yml` :**

```yaml
- nom: "Jean Dupont"
  role: "Président"
  grade: "Ceinture noire 3ème dan"
  photo: /assets/images/equipe/jean-dupont.jpg

- nom: "Marie Martin"
  role: "Secrétaire"
  grade: "Ceinture noire 1er dan"
  photo: /assets/images/equipe/marie-martin.jpg
```

**Puis dans `_pages/comite-directeur.md` ou un layout :**

```html
{% for membre in site.data.equipe %}
<div class="membre-card">
  <img src="{{ membre.photo | relative_url }}"
       alt="Photo de {{ membre.nom }}"
       width="120" height="120">
  <h3>{{ membre.nom }}</h3>
  <p>{{ membre.role }} — {{ membre.grade }}</p>
</div>
{% endfor %}
```

---

### 4.8 — Galerie automatique (`assets/images/gallery/`)

Le JavaScript dans `assets/js/main.js` charge **automatiquement** toutes les images  
présentes dans `assets/images/gallery/` via un appel au fichier `_data/gallery.yml`  
(ou à défaut par convention de nommage).

**Pour ajouter une photo à la galerie :**

1. Copiez le fichier dans `assets/images/gallery/`.
2. Committez et poussez — c'est tout.

Aucune modification de code n'est nécessaire.

---

## 5. Conventions de nommage et formats recommandés

### Nommage des fichiers

| ✅ Recommandé | ❌ À éviter |
|---|---|
| `cours-jujitsu-enfants.jpg` | `Cours Jujitsu Enfants.jpg` |
| `tournoi-juin-2025.jpg` | `IMG_20250620_142301.jpg` |
| `jean-dupont-president.jpg` | `00722011-7bd9-4b58.png` |
| `galerie-dojo-2024.webp` | `image (1).png` |

**Règles :**
- Tout en **minuscules**
- Tirets `-` entre les mots (pas d'espaces, pas d'underscores)
- Pas d'accents ni de caractères spéciaux
- Nom descriptif et court

### Formats de fichier

| Format | Usage recommandé | Taille type |
|---|---|---|
| **JPEG / `.jpg`** | Photos, images avec dégradés | 50–200 Ko |
| **PNG** | Logo, images avec transparence | 20–100 Ko |
| **WebP** | Toutes images modernes (meilleure compression) | 30–120 Ko |
| **SVG** | Illustrations vectorielles, icônes | < 50 Ko |

### Dimensions recommandées

| Usage | Largeur max recommandée |
|---|---|
| Image d'en-tête d'article (`featured_image`) | 1200 × 630 px |
| Photo de membre du comité | 400 × 400 px (carré) |
| Image Open Graph (`og-default.png`) | 1200 × 630 px |
| Photos de galerie | 1000 × 750 px |
| Logo | 200 × 200 px |

### Optimisation avant upload

Utilisez un outil gratuit pour réduire la taille des images avant de les ajouter au projet :

- **En ligne :** [squoosh.app](https://squoosh.app) (Google, gratuit, sans compte)
- **En ligne :** [tinypng.com](https://tinypng.com) (PNG et JPEG)
- **Mac :** Aperçu → Exporter → réduire la qualité

**Règle :** Une image pour le web ne devrait pas dépasser **300 Ko**.  
Les images lourdes ralentissent le site et pénalisent le référencement.

---

## 6. Exemples concrets pas à pas

### Exemple 1 — Image d'en-tête d'un article de blog

**Scénario :** Vous écrivez un article sur les résultats du championnat de novembre 2025  
et vous voulez afficher une photo prise pendant la compétition.

#### Étape 1 — Préparer l'image

- Fichier source : `IMG_20251115_143022.jpg` (photo prise avec votre téléphone)
- Redimensionner à 1200 × 630 px avec Squoosh ou Aperçu
- Renommer : `championnat-novembre-2025.jpg`

#### Étape 2 — Placer l'image dans le projet

```bash
# Depuis le terminal, à la racine du projet
cp ~/Downloads/championnat-novembre-2025.jpg assets/images/blog/championnat-novembre-2025.jpg
```

Structure résultante :
```
assets/images/blog/championnat-novembre-2025.jpg   ← nouveau fichier
```

#### Étape 3 — Créer l'article avec l'image en front matter

Créer `_posts/2025-11-15-championnat-novembre-2025.md` :

```markdown
---
layout: post
title: "Championnat d'Île-de-France — novembre 2025"
date: 2025-11-15 20:00:00 +0200
categories: [competition, actualites]
author: "Bureau AJJ"
excerpt: "Nos pratiquants ont brillé lors du championnat régional. Retour sur cette journée mémorable."
featured_image: /assets/images/blog/championnat-novembre-2025.jpg
---

Quelle journée exceptionnelle ! Nos judokas ont démontré un niveau technique remarquable...

## Résultats

- **Catégorie -66 kg :** 1ère place — Pierre Martin
- **Catégorie -73 kg :** 2ème place — Sophie Dubois

![Remise des médailles]({{ '/assets/images/blog/championnat-novembre-2025.jpg' | relative_url }})
```

#### Étape 4 — Publier

```bash
git add assets/images/blog/championnat-novembre-2025.jpg
git add _posts/2025-11-15-championnat-novembre-2025.md
git commit -m "Article : Championnat novembre 2025 avec photo"
git push
```

L'image apparaît en haut de l'article (~60 secondes après le push) et est aussi utilisée  
comme image de prévisualisation lors du partage sur les réseaux sociaux.

---

### Exemple 2 — Photo d'un membre du comité directeur

**Scénario :** Vous souhaitez afficher les photos des membres du bureau  
sur la page `/comite-directeur/`.

#### Étape 1 — Préparer les photos

- Redimensionner chaque photo à 400 × 400 px (carré, idéalement recadré sur le visage)
- Renommer : `jean-dupont-president.jpg`, `marie-martin-secretaire.jpg`, etc.

#### Étape 2 — Placer les images

```bash
mkdir -p assets/images/equipe
cp ~/Downloads/jean-dupont-president.jpg  assets/images/equipe/
cp ~/Downloads/marie-martin-secretaire.jpg assets/images/equipe/
```

#### Étape 3 — Créer le fichier de données `_data/equipe.yml`

```bash
mkdir -p _data
```

Créer `_data/equipe.yml` :

```yaml
- nom: "Jean Dupont"
  role: "Président"
  grade: "Ceinture noire 3ème dan"
  photo: /assets/images/equipe/jean-dupont-president.jpg
  bio: "Jean pratique le Jujitsu depuis 1998 et dirige le club depuis 2015."

- nom: "Marie Martin"
  role: "Secrétaire"
  grade: "Ceinture noire 1er dan"
  photo: /assets/images/equipe/marie-martin-secretaire.jpg
  bio: "Marie assure la coordination administrative et la communication du club."
```

#### Étape 4 — Mettre à jour `_pages/comite-directeur.md`

Remplacer le contenu de la section par :

```markdown
---
layout: page
title: "Notre Comité Directeur"
description: "Découvrez les membres du bureau et du comité directeur du club Asnières Jujitsu."
permalink: /comite-directeur/
---

<div class="club-text">

  <p>Le club Asnières Jujitsu est géré par un bureau élu composé de bénévoles passionnés.</p>

  <div class="equipe-grid">
    {% for membre in site.data.equipe %}
    <div class="membre-card">
      <img src="{{ membre.photo | relative_url }}"
           alt="Photo de {{ membre.nom }}"
           width="120" height="120"
           style="border-radius:50%;object-fit:cover;margin-bottom:0.75rem;">
      <h3>{{ membre.nom }}</h3>
      <p><strong>{{ membre.role }}</strong></p>
      <p>{{ membre.grade }}</p>
      <p style="font-size:0.9rem;color:var(--gray);">{{ membre.bio }}</p>
    </div>
    {% endfor %}
  </div>

</div>
```

#### Étape 5 — Publier

```bash
git add assets/images/equipe/
git add _data/equipe.yml
git add _pages/comite-directeur.md
git commit -m "Comité directeur : ajout photos et données membres"
git push
```

---

### Exemple 3 — Photos de la galerie sur la page d'accueil

**Scénario :** Vous voulez ajouter 3 nouvelles photos à la galerie  
qui s'affiche sur la page d'accueil dans la section « Galerie Photos ».

#### Étape 1 — Préparer les photos

- Redimensionner à 1000 × 750 px
- Renommer : `dojo-cours-mardi-01.jpg`, `stage-technique-2025.jpg`, `remise-ceintures-2025.jpg`

#### Étape 2 — Placer dans le dossier gallery

```bash
cp ~/Downloads/dojo-cours-mardi-01.jpg   assets/images/gallery/
cp ~/Downloads/stage-technique-2025.jpg  assets/images/gallery/
cp ~/Downloads/remise-ceintures-2025.jpg assets/images/gallery/
```

#### Étape 3 — C'est tout !

La galerie se charge automatiquement. Aucune modification de code n'est nécessaire.

```bash
git add assets/images/gallery/
git commit -m "Galerie : ajout 3 nouvelles photos 2025"
git push
```

Les photos apparaissent dans la galerie de la page d'accueil après le déploiement.

> **Note :** Si vous souhaitez contrôler l'ordre d'affichage ou ajouter des légendes,  
> créez `_data/gallery.yml` avec une liste ordonnée (voir section 4.7 pour le modèle).

---

## 7. Récapitulatif rapide

### Checklist avant chaque ajout d'image

```
[ ] L'image est redimensionnée (max 1200px de large, max 300 Ko)
[ ] L'image est nommée en minuscules avec des tirets (ex: mon-image.jpg)
[ ] L'image est copiée dans assets/images/ (ou sous-dossier approprié)
[ ] Le front matter ou le Markdown référence correctement le chemin
[ ] git add, git commit, git push ont été exécutés
[ ] Le déploiement GitHub Actions est passé au vert (onglet Actions)
```

### Chemins de référence selon le type de fichier

| Type de fichier | Syntaxe du chemin |
|---|---|
| Front matter YAML | `featured_image: /assets/images/blog/mon-image.jpg` |
| Markdown | `![Alt]({{ '/assets/images/mon-image.jpg' \| relative_url }})` |
| HTML dans layout/include | `src="{{ '/assets/images/mon-image.jpg' \| relative_url }}"` |
| Fichier `_data/*.yml` | `photo: /assets/images/equipe/photo.jpg` |
| `_config.yml` | `logo: /assets/images/logo.png` |

### Structure de dossiers recommandée

```
assets/images/
├── favicon.png                    ← logo/favicon (déjà présent)
├── og-default.png                 ← image partage réseaux sociaux
├── club-photo.svg                 ← illustration section Le Club
├── blog/
│   ├── championnat-2025.jpg
│   └── stage-automne-2025.jpg
├── equipe/
│   ├── jean-dupont-president.jpg
│   └── marie-martin-secretaire.jpg
├── pages/
│   └── remise-en-forme-dojo.jpg
└── gallery/
    ├── cours-mardi-01.jpg
    ├── tournoi-juin-2025.jpg
    └── remise-ceintures-2025.jpg
```

---

> **Questions ?** Consultez aussi [`Quickstart.md`](Quickstart.md) pour les commandes Git  
> et [`DOCUMENTATION.md`](../DOCUMENTATION.md) pour l'architecture complète du projet.
