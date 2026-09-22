source "https://rubygems.org"

# ---------------------------------------------------------------------------
# Option A (recommended for GitHub Pages CI): use the github-pages meta-gem
# This pins all dependencies to the exact versions used by GitHub Pages.
# Uncomment the line below and comment out Option B when deploying.
# ---------------------------------------------------------------------------
# gem "github-pages", group: :jekyll_plugins

# ---------------------------------------------------------------------------
# Option B (recommended for local development on Ruby ≥ 3.4 / 4.x):
# Use standalone Jekyll 4 with the required plugins directly.
# ---------------------------------------------------------------------------
gem "jekyll", "~> 4.3"

# Liquid 4.0.4+ removes the use of String#tainted? which was dropped in Ruby 3.2
gem "liquid", "~> 4.0.4"

# Ruby ≥ 3.4 dropped csv from the default gems — required by Jekyll 3/4
gem "csv"
gem "base64"
gem "bigdecimal"

group :jekyll_plugins do
  gem "jekyll-feed",     "~> 0.17"
  gem "jekyll-sitemap",  "~> 1.4"
  gem "jekyll-seo-tag",  "~> 2.8"
  gem "jekyll-paginate", "~> 1.1"
end

# webrick is no longer bundled in Ruby 3+
gem "webrick", "~> 1.8"

# Windows and JRuby fix
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
