---
title: Collections
---

Organize your content with collections for blog posts, documentation, and more.

## What are Collections?

Collections allow you to group related content files (like blog posts) and render them with a shared template. Each collection becomes a directory in your output site.

## Creating a Collection

### Step 1: Create Content Directory

Create a directory in your `content/` folder:

```bash
mkdir -p content/posts
```

### Step 2: Add Content Files

Add markdown files to your collection:

**content/posts/my-first-post.md:**
```markdown
---
title: "My First Post"
date: 2024-01-15
tags: ["rust", "balzac"]
---

# Getting Started

Welcome to **Balzac**! Here's some code:

```rust
fn main() {
    println!("Hello, world!");
}
```
```

### Step 3: Create Details Template

Create a template file in your `pages/` directory with the same name as your collection:

```bash
mkdir -p pages/posts
```

**pages/posts/details.hbs:**
```handlebars
<!DOCTYPE html>
<html>
  <head>
    <title>{{fm.title}}</title>
  </head>
  <body>
    <article>
      <h1>{{fm.title}}</h1>
      <time>{{fm.date}}</time>
      <div class="tags">
        {{#each fm.tags}}
          <span>{{this}}</span>
        {{/each}}
      </div>
      <div class="content">
        {{{content}}}
      </div>
    </article>
  </body>
</html>
```

### Step 4: Build

```bash
balzac build
```

Your posts will be generated in `dist/posts/` with HTML filenames matching your markdown files.

## Frontmatter

All frontmatter in your markdown files is available in templates under the `fm` namespace:

```markdown
---
title: "Post Title"
date: 2024-01-15
tags: ["tag1", "tag2"]
custom_field: "Custom value"
---
```

Access in templates:
```handlebars
<h1>{{fm.title}}</h1>
<p>Date: {{fm.date}}</p>
{{#each fm.tags}}
  <span>{{this}}</span>
{{/each}}
<p>{{fm.custom_field}}</p>
```

## Multiple Collections

You can have multiple collections:

```bash
content/
├── posts/
│   ├── post-one.md
│   └── post-two.md
├── docs/
│   ├── getting-started.md
│   └── advanced-usage.md
└── projects/
    └── project-alpha.md
```

Each collection needs its own details template:

```bash
pages/
├── posts/
│   └── details.hbs
├── docs/
│   └── details.hbs
└── projects/
    └── details.hbs
```

## Template Variables

When rendering collection items, the following variables are available:

- `content` - The rendered HTML content from your markdown
- `fm` - The frontmatter data object
- Global variables from your configuration

## Collection Output

Each markdown file generates an HTML file:

```
content/posts/hello-world.md → dist/posts/hello-world.html
content/posts/about-me.md  → dist/posts/about-me.html
```

## Best Practices

1. **Use descriptive slugs**: Create markdown files with URL-friendly names
2. **Consistent frontmatter**: Use the same fields across items in a collection
3. **Organize logically**: Group related content in the same collection
4. **Use layouts**: Create reusable templates in the `layouts/` directory

## Example: Blog with Post Listing

**pages/index.hbs:**
```handlebars
<!DOCTYPE html>
<html>
  <body>
    <h1>My Blog</h1>
    <!-- You'll need to manually list posts or use a hook to generate a listing -->
    <ul>
      <li><a href="/posts/hello-world.html">Hello World</a></li>
      <li><a href="/posts/about-me.html">About Me</a></li>
    </ul>
  </body>
</html>
```

**pages/posts/details.hbs:**
```handlebars
<!DOCTYPE html>
<html>
  <body>
    <article>
      <h1>{{fm.title}}</h1>
      <div class="meta">
        <span>{{fm.date}}</span>
        <span>Tags: {{#each fm.tags}}{{this}}, {{/each}}</span>
      </div>
      <div class="content">
        {{{content}}}
      </div>
      <a href="/index.html">← Back to posts</a>
    </article>
  </body>
</html>
```
