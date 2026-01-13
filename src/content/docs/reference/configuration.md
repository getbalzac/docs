---
title: Configuration
---

Configure your Balzac project using a `balzac.toml` file.

## Basic Configuration

Create a `balzac.toml` file in your project root:

```toml
[global]
site_name = "My Site"
author = "Your Name"
```

## Configuration Options

### Directory Structure

```toml
output_directory = "./dist"
pages_directory = "./pages"
layouts_directory = "./layouts"
partials_directory = "./partials"
assets_directory = "./assets"
content_directory = "./content"
```

### Global Data

Data available in all templates:

```toml
[global]
site_name = "My Site"
site_url = "https://example.com"
author = "Your Name"
```

Access in templates:
```handlebars
<h1>{{site_name}}</h1>
<p>By {{author}}</p>
```

### Hooks

Configure build hooks:

```toml
[hooks]
render_init_before = "echo 'Preparing renderer'"
render_init_after = "echo 'Renderer ready'"
build_before = "pnpm build"
render_before = "echo 'Starting page generation'"
render_after = "echo 'Pages generated'"
build_after = "rsync -av dist/ production/"
```

See [Hooks Reference](/reference/hooks/) for details.

### Bundler Integration

Enable Vite bundler for JavaScript/CSS:

```toml
[bundler.vite]
enabled = true
manifest_path = "dist/.vite/manifest.json"
```

When enabled, use the `{{vite_url}}` helper in templates:
```handlebars
<script src='{{vite_url "main.js"}}'></script>
```

## Complete Example

```toml
[global]
site_name = "My Awesome Site"
site_url = "https://example.com"
author = "John Doe"
description = "A blog about Rust and web development"

[hooks]
build_before = "pnpm build"

[bundler.vite]
enabled = true
manifest_path = "dist/.vite/manifest.json"
```

## Default Values

All configuration options have sensible defaults:

| Option | Default |
|--------|---------|
| `output_directory` | `./dist` |
| `pages_directory` | `./pages` |
| `layouts_directory` | `./layouts` |
| `partials_directory` | `./partials` |
| `assets_directory` | `./assets` |
| `content_directory` | `./content` |
| `global` | `null` |
| `hooks` | `null` |
| `bundler.vite.enabled` | `false` |
| `bundler.vite.manifest_path` | `dist/.vite/manifest.json` |

## Environment Variables

Balzac does not currently support environment variables in configuration. Use hooks to inject environment-specific data if needed.
