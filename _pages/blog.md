---
layout: default
title: "Blog"
description: "Articles, conseils et actualités du club Asnières Jujitsu — Jujitsu traditionnel, remise en forme, résultats de compétitions."
permalink: /blog/
---

<section class="section blog-list" aria-labelledby="titre-blog-liste">
  <div class="container">
    <h2 class="section-title" id="titre-blog-liste">Blog</h2>

    {% if site.posts.size > 0 %}
    <div class="blog-grid">
      {% for post in site.posts %}
      <article class="blog-card">
        {% if post.featured_image %}
        <img src="{{ post.featured_image | relative_url }}" alt="{{ post.title }}" class="blog-card-img" loading="lazy">
        {% else %}
        <div class="blog-card-img-placeholder" aria-hidden="true">
          <i class="fas fa-feather-alt"></i>
        </div>
        {% endif %}
        <div class="blog-card-body">
          <div class="blog-card-date">
            <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%-d %B %Y" }}</time>
          </div>
          {% if post.categories.size > 0 %}
          <div class="blog-card-cats">
            {% for cat in post.categories %}
            <span class="blog-cat">{{ cat }}</span>
            {% endfor %}
          </div>
          {% endif %}
          <h2>{{ post.title }}</h2>
          <p>{{ post.excerpt | strip_html | truncate: 160 }}</p>
          <a href="{{ post.url | relative_url }}" class="blog-card-link">Lire l'article →</a>
        </div>
      </article>
      {% endfor %}
    </div>

    {% if paginator %}
    <nav class="pagination" aria-label="Navigation entre les pages du blog">
      {% if paginator.previous_page %}
        <a href="{{ paginator.previous_page_path | relative_url }}" rel="prev" aria-label="Page précédente">‹</a>
      {% else %}
        <span class="disabled" aria-disabled="true">‹</span>
      {% endif %}

      {% for page in (1..paginator.total_pages) %}
        {% if page == paginator.page %}
          <span class="current" aria-current="page">{{ page }}</span>
        {% elsif page == 1 %}
          <a href="{{ '/blog/' | relative_url }}">{{ page }}</a>
        {% else %}
          <a href="{{ site.paginate_path | replace: ':num', page | relative_url }}">{{ page }}</a>
        {% endif %}
      {% endfor %}

      {% if paginator.next_page %}
        <a href="{{ paginator.next_page_path | relative_url }}" rel="next" aria-label="Page suivante">›</a>
      {% else %}
        <span class="disabled" aria-disabled="true">›</span>
      {% endif %}
    </nav>
    {% endif %}

    {% else %}
    <div class="empty-state">
      <i class="fas fa-feather-alt" aria-hidden="true"></i>
      <p>Les premiers articles arrivent bientôt !</p>
      <p style="margin-top:1rem;font-size:0.85rem;color:var(--gray);">
        Pour créer un article, ajoutez un fichier Markdown dans le dossier <code>_posts/</code>.
      </p>
    </div>
    {% endif %}
  </div>
</section>
