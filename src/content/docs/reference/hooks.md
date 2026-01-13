---
title: Hooks
---

Customize your build process with hooks that run at specific phases.

## What are Hooks?

Hooks allow you to run shell commands at various points during the build process. They're perfect for:

- Running preprocessing scripts
- Building frontend assets
- Running tests
- Deploying to production
- Generating content

## Available Hooks

Hooks execute in this order during a build:

1. **render_init_before** - Before the renderer is initialized
2. **render_init_after** - After the renderer is initialized
3. **build_before** - Before the dist folder is created
4. **render_before** - Before rendering pages and collections
5. **render_after** - After rendering, before assets are copied
6. **build_after** - After all build steps are complete

## Configuration

Configure hooks in the `[hooks]` section of your `balzac.toml`:

```toml
[hooks]
render_init_before = "echo 'Starting renderer init'"
render_init_after = "echo 'Renderer ready'"
build_before = "pnpm build"
render_before = "echo 'Starting page generation'"
render_after = "echo 'Pages generated'"
build_after = "rsync -av dist/ production/"
```

## Use Cases

### Build Frontend Assets

```toml
[hooks]
build_before = "pnpm build"
```

Run a build process (like Vite, Webpack, or Tailwind) before Balzac renders pages.

### Generate Content

```toml
[hooks]
render_before = "python scripts/generate-posts.py"
```

Generate markdown files programmatically before rendering.

### Deploy to Production

```toml
[hooks]
build_after = "rsync -av dist/ user@server:/var/www/html/"
```

Automatically deploy after a successful build.

### Run Tests

```toml
[hooks]
build_before = "pnpm test"
```

Run tests before building to catch issues early.

### Clear Cache

```toml
[hooks]
render_init_before = "rm -rf .cache/"
```

Clear cache directories before starting.

## Hook Behavior

- Hooks execute in the project root directory
- Hooks that fail (non-zero exit) stop the entire build
- Execution time is logged for each hook
- Full shell command syntax is supported
- Hooks can chain multiple commands with `&&`

## Examples

### Multiple Commands

Chain commands with `&&`:

```toml
[hooks]
build_before = "pnpm lint && pnpm test && pnpm build"
```

### Conditional Hooks

Use shell conditionals:

```toml
[hooks]
build_after = "if [ \"$CI\" = \"true\" ]; then ./deploy.sh; fi"
```

### Environment Variables

```toml
[hooks]
build_after = "rsync -av dist/ $DEPLOY_HOST:$DEPLOY_PATH/"
```

## Troubleshooting

### Hook Fails

If a hook fails, the build stops with an error. Check the hook output for details.

```bash
balzac build
# Error: Hook 'build_before' failed with exit code 1
```

Fix the issue in your script or remove the hook.

### Permission Issues

Ensure hook scripts have execute permissions:

```bash
chmod +x scripts/my-script.sh
```

### Path Issues

Hooks run in the project root. Use relative paths:

```toml
[hooks]
render_before = "./scripts/generate.sh"
```

Not:

```toml
[hooks]
render_before = "/absolute/path/to/script.sh"  # Avoid absolute paths
```

## Best Practices

1. **Keep hooks simple** - Complex scripts should be separate files
2. **Fail fast** - Use `set -e` in bash scripts to exit on errors
3. **Log output** - Add echo statements for debugging
4. **Use appropriate hooks** - Choose the right phase for your task
5. **Test locally** - Verify hooks work before relying on them

## Example: Complete Build Pipeline

```toml
[hooks]
render_init_before = "echo '=== Starting Build ===' && rm -rf .cache"
render_init_after = "echo 'Cache cleared'"
build_before = "pnpm lint && pnpm test && pnpm build"
render_before = "python scripts/generate-data.py"
render_after = "echo '=== Pages Generated ==='"
build_after = "if [ \"$DEPLOY\" = \"true\" ]; then ./deploy.sh; fi"
```

This example:
- Clears cache before starting
- Lints, tests, and builds frontend assets
- Generates data before rendering
- Deploys if `DEPLOY=true` is set
