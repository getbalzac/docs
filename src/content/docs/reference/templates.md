---
title: Templates
---

Learn to use Handlebars templates to create dynamic pages.

## Handlebars Basics

Balzac uses Handlebars templating. Templates use `{{variable}}` for variables and `{{#helper}}...{{/helper}}` for helpers.

### Variables

Output variable values:

```handlebars
<h1>{{site_name}}</h1>
<p>{{author}}</p>
```

HTML-escaped by default. Use triple braces for raw HTML:

```handlebars
<div class="content">
  {{{content}}}
</div>
```

### Conditionals

```handlebars
{{#if is_published}}
  <span>Published</span>
{{else}}
  <span>Draft</span>
{{/if}}
```

### Loops

```handlebars
<ul>
  {{#each tags}}
    <li>{{this}}</li>
  {{/each}}
</ul>
```

## Template Variables

### Global Variables

Variables from your `balzac.toml` `[global]` section:

```toml
[global]
site_name = "My Site"
author = "John Doe"
```

Use anywhere:
```handlebars
<h1>{{site_name}}</h1>
<p>By {{author}}</p>
```

### Collection Variables

When rendering collection items:

```handlebars
<h1>{{fm.title}}</h1>
<p>{{fm.description}}</p>
<div class="content">
  {{{content}}}
</div>
```

## Partials

Reusable template components.

### Creating Partials

Create files in `partials/` directory:

**partials/header.hbs:**
```handlebars
<header>
  <a href="/">{{site_name}}</a>
  <nav>
    <a href="/about.html">About</a>
    <a href="/contact.html">Contact</a>
  </nav>
</header>
```

**partials/footer.hbs:**
```handlebars
<footer>
  <p>&copy; 2024 {{site_name}}</p>
</footer>
```

### Using Partials

Include partials with `{{> partial-name}}`:

```handlebars
<!DOCTYPE html>
<html>
  <body>
    {{> header}}
    <main>
      <h1>{{title}}</h1>
    </main>
    {{> footer}}
  </body>
</html>
```

### Passing Data to Partials

```handlebars
{{> post-card title=fm.title date=fm.date}}
```

**partials/post-card.hbs:**
```handlebars
<article>
  <h2>{{title}}</h2>
  <time>{{date}}</time>
</article>
```

## Layouts

Reusable page layouts.

### Creating Layouts

**layouts/default.hbs:**
```handlebars
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>{{title}}</title>
    <link rel="stylesheet" href="/assets/style.css">
  </head>
  <body>
    {{> header}}
    <main>
      {{{body}}}
    </main>
    {{> footer}}
  </body>
</html>
```

### Using Layouts

You can use partials to implement layouts:

**pages/index.hbs:**
```handlebars
{{> header}}
<main>
  <h1>Welcome to {{site_name}}</h1>
</main>
{{> footer}}
```

Or create a layout partial with slots:

**layouts/main.hbs:**
```handlebars
<!DOCTYPE html>
<html>
  <body>
    {{> header}}
    {{{yield}}}
    {{> footer}}
  </body>
</html>
```

**pages/index.hbs:**
```handlebars
{{> main}}
  {{#*inline "yield"}}
    <h1>Welcome to {{site_name}}</h1>
  {{/inline}}
{{/main}}
```

## Built-in Helpers

### vite_url

When Vite bundler is enabled, resolve asset URLs:

```handlebars
<script src='{{vite_url "main.js"}}'></script>
<link rel="stylesheet" href='{{vite_url "style.css"}}'>
```

Requires Vite bundler configuration:

```toml
[bundler.vite]
enabled = true
manifest_path = "dist/.vite/manifest.json"
```

## Custom Helpers

Create custom helpers by registering them in the renderer. This requires using Balzac as a library rather than the CLI.

See [Configuration](/reference/configuration/#bundler-integration) for more details.

## Example: Blog Post Template

**pages/posts/details.hbs:**
```handlebars
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="description" content="{{fm.description}}">
    <title>{{fm.title}} - {{site_name}}</title>
    <link rel="stylesheet" href="/assets/style.css">
  </head>
  <body>
    {{> header}}

    <article class="post">
      <header class="post-header">
        <h1>{{fm.title}}</h1>
        <div class="meta">
          <time>{{fm.date}}</time>
          {{#if fm.author}}
            <span>By {{fm.author}}</span>
          {{/if}}
        </div>
        {{#if fm.tags}}
          <div class="tags">
            {{#each fm.tags}}
              <span class="tag">{{this}}</span>
            {{/each}}
          </div>
        {{/if}}
      </header>

      <div class="content">
        {{{content}}}
      </div>

      <footer class="post-footer">
        <a href="/index.html">← Back to posts</a>
      </footer>
    </article>

    {{> footer}}
  </body>
</html>
```

## Example: Homepage with Post List

**pages/index.hbs:**
```handlebars
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>{{site_name}}</title>
    <link rel="stylesheet" href="/assets/style.css">
  </head>
  <body>
    {{> header}}

    <main>
      <section class="hero">
        <h1>Welcome to {{site_name}}</h1>
        <p>{{description}}</p>
      </section>

      <section class="posts">
        <h2>Latest Posts</h2>
        <!-- Manual post listing - or generate with a hook -->
        <ul>
          <li>
            <a href="/posts/hello-world.html">Hello World</a>
            <span class="date">2024-01-15</span>
          </li>
          <li>
            <a href="/posts/getting-started.html">Getting Started</a>
            <span class="date">2024-01-10</span>
          </li>
        </ul>
      </section>
    </main>

    {{> footer}}
  </body>
</html>
```

## Best Practices

1. **Use partials** - Reuse common elements (header, footer, navigation)
2. **Separate concerns** - Keep templates focused on presentation
3. **Escape user input** - Use `{{variable}}` by default, only use `{{{variable}}}` for trusted HTML
4. **Use conditionals** - Handle missing data gracefully
5. **Keep templates simple** - Complex logic belongs in preprocessing scripts or hooks
6. **Organize by purpose** - Group related partials and layouts
