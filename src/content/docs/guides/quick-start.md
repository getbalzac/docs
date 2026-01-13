---
title: Quick Start
---

Create a simple static site in just a few steps.

## Step 1: Initialize Project

Create a new directory for your project:

```bash
mkdir my-site
cd my-site
```

## Step 2: Create Configuration

Create a `balzac.toml` file in your project root:

```toml
# Optional configuration - using defaults
[global]
site_name = "My Site"
```

## Step 3: Create Your First Page

Create the `pages` directory and add an `index.hbs` file:

```bash
mkdir -p pages
```

**pages/index.hbs:**
```handlebars
<!DOCTYPE html>
<html>
  <head>
    <title>{{site_name}}</title>
  </head>
  <body>
    <h1>Welcome to {{site_name}}</h1>
    <p>Hello, Balzac!</p>
  </body>
</html>
```

## Step 4: Build Your Site

Run Balzac to generate your site:

```bash
balzac build
```

Your site will be built in the `dist/` directory.

## Step 5: View Your Site

Open the generated HTML file in your browser:

```bash
open dist/index.html
```

Or use a local server:

```bash
python3 -m http.server --directory dist 8000
```

Then visit http://localhost:8000

## What's Next?

- Learn about [collections](/reference/collections/) to manage blog posts
- Configure your [balzac.toml](/reference/configuration/) for more control
- Use [hooks](/reference/hooks/) to customize the build process
- Explore [templates](/reference/templates/) for advanced features
