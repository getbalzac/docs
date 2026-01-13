---
title: Getting Started
---

Get up and running with Balzac in minutes.

## What is Balzac?

Balzac is a fast, memory-safe static site generator built with Rust. It features:

- **Handlebars templating** - Logic-less, familiar templates
- **Content collections** - Organize Markdown content easily
- **Fast builds** - Rust-powered performance
- **Simple configuration** - Minimal setup, maximum flexibility
- **Build hooks** - Customize the build process
- **Vite integration** - Modern asset bundling support

## Installation

Install Balzac using Cargo:

```bash
cargo install balzac
```

## Quick Start

Create a simple site in 4 steps:

### 1. Create Project

```bash
mkdir my-site
cd my-site
```

### 2. Add Configuration

**balzac.toml:**
```toml
[global]
site_name = "My Site"
```

### 3. Create Page

**pages/index.hbs:**
```handlebars
<!DOCTYPE html>
<html>
  <body>
    <h1>{{site_name}}</h1>
    <p>Hello, Balzac!</p>
  </body>
</html>
```

### 4. Build

```bash
balzac build
```

Your site is ready in `dist/`!

## Next Steps

- Learn about [project structure](/guides/project-structure/)
- Explore [collections](/reference/collections/) for blog posts
- Configure your [balzac.toml](/reference/configuration/)
- Use [hooks](/reference/hooks/) to customize builds
- Master [templates](/reference/templates/) with Handlebars

## Why Balzac?

### Memory Safe

Built in Rust for guaranteed memory safety. No null pointer exceptions, no data races, no crashes.

### Fast

Rust performance means lightning-fast builds, even for large sites.

### Simple

Minimal configuration, sensible defaults, and familiar Handlebars templates make it easy to get started.

### Flexible

Build hooks, custom helpers, and Vite integration give you the power to create exactly what you need.

### Production Ready

Used in production sites with stable releases and active development.
