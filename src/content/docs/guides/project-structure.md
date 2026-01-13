---
title: Project Structure
---

Understand Balzac's directory structure and default configuration.

## Default Structure

A typical Balzac project looks like this:

```
my-site/
├── balzac.toml          # Configuration file
├── dist/                # Generated output (created by balzac)
├── pages/               # Handlebars templates for pages
│   ├── index.hbs
│   └── posts/
│       └── details.hbs
├── partials/            # Handlebars partials (optional)
│   └── header.hbs
├── layouts/             # Handlebars layouts (optional)
│   └── main.hbs
├── assets/              # Static files (optional)
│   ├── style.css
│   └── logo.svg
└── content/             # Markdown content (optional)
    └── posts/
        ├── first-post.md
        └── second-post.md
```

## Required Directories

### pages/

The only required directory. Contains Handlebars templates that become your static pages.

**pages/index.hbs:**
```handlebars
<!DOCTYPE html>
<html>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
```

Output: `dist/index.html`

### dist/

Created automatically by Balzac. Contains the generated static site. Do not manually edit this directory.

## Optional Directories

### content/

Store markdown content for collections. Each subdirectory becomes a collection.

```
content/
├── posts/
│   ├── hello-world.md
│   └── about-me.md
└── docs/
    ├── getting-started.md
    └── advanced-topics.md
```

Each markdown file needs a corresponding template in `pages/<collection>/details.hbs`.

### partials/

Reusable template snippets that can be included in other templates.

**partials/header.hbs:**
```handlebars
<header>
  <h1>{{site_name}}</h1>
</header>
```

Use in templates:
```handlebars
{{> header}}
```

### layouts/

Reusable page layouts that wrap content.

**layouts/main.hbs:**
```handlebars
<!DOCTYPE html>
<html>
  <head>
    <title>{{title}}</title>
  </head>
  <body>
    {{> header}}
    {{{body}}}
    {{> footer}}
  </body>
</html>
```

### assets/

Static files copied directly to the output directory.

```
assets/
├── style.css       → dist/assets/style.css
├── logo.svg        → dist/assets/logo.svg
└── favicon.ico     → dist/assets/favicon.ico
```

Access in HTML:
```html
<link rel="stylesheet" href="/assets/style.css">
```

## Configuration File

### balzac.toml

The main configuration file in your project root.

```toml
[global]
site_name = "My Site"

[hooks]
build_before = "pnpm build"

[bundler.vite]
enabled = true
manifest_path = "dist/.vite/manifest.json"
```

See [Configuration Reference](/reference/configuration/) for all options.

## File Naming Conventions

### Pages

Handlebars files in `pages/`:

- `index.hbs` → `dist/index.html`
- `about.hbs` → `dist/about.html`
- `contact.hbs` → `dist/contact.html`

### Collections

Markdown files in `content/<collection>/`:

- `content/posts/hello-world.md` → `dist/posts/hello-world.html`
- `content/posts/my-first-post.md` → `dist/posts/my-first-post.html`

### Templates

Collection templates must be named `details.hbs`:

- `pages/posts/details.hbs` - Template for the `posts` collection
- `pages/docs/details.hbs` - Template for the `docs` collection

## Custom Directory Structure

You can customize directory names in `balzac.toml`:

```toml
output_directory = "./build"
pages_directory = "./templates"
layouts_directory = "./src/layouts"
partials_directory = "./src/partials"
assets_directory = "./static"
content_directory = "./markdown"
```

## Minimal Project

The smallest possible Balzac project:

```
minimal/
├── balzac.toml
└── pages/
    └── index.hbs
```

**balzac.toml:**
```toml
# Empty configuration uses all defaults
```

**pages/index.hbs:**
```handlebars
<h1>Hello, World!</h1>
```

## Example: Blog Site Structure

```
blog/
├── balzac.toml
├── pages/
│   ├── index.hbs              # Home page with post list
│   ├── about.hbs              # About page
│   └── posts/
│       └── details.hbs        # Individual post template
├── partials/
│   ├── header.hbs
│   ├── footer.hbs
│   └── post-card.hbs
├── layouts/
│   └── default.hbs
├── assets/
│   ├── style.css
│   └── logo.svg
└── content/
    └── posts/
        ├── first-post.md
        └── second-post.md
```

## Example: Documentation Site Structure

```
docs/
├── balzac.toml
├── pages/
│   ├── index.hbs              # Landing page
│   └── docs/
│       └── details.hbs        # Doc page template
├── partials/
│   ├── sidebar.hbs
│   ├── header.hbs
│   └── footer.hbs
├── assets/
│   ├── theme.css
│   └── logo.svg
└── content/
    └── docs/
        ├── getting-started.md
        ├── installation.md
        └── configuration.md
```

## Best Practices

1. **Organize by purpose** - Group files logically (pages, assets, content)
2. **Use consistent naming** - lowercase with hyphens for files
3. **Keep it simple** - Start with minimal structure, add as needed
4. **Separate concerns** - Templates in `pages/`, content in `content/`, assets in `assets/`
5. **Use partials** - Reuse common elements (header, footer, navigation)
