# AGENTS.md — netboot.xyz Docs

Guidelines for AI coding agents working in this repository.

## Project Overview

Docusaurus 3 documentation site for [netboot.xyz](https://netboot.xyz). Primary language is
JavaScript/JSX (no TypeScript). Content lives in `docs/` (Markdown) and `blog/`. Custom React
components live in `src/`. Deployment is automatic via GitHub Actions on push to `master`.

## Commands

```bash
# Development
yarn start                   # Local dev server with hot reload (http://localhost:3000)

# Build
yarn build                   # Production build (USE_SIMPLE_CSS_MINIFIER=true is set automatically)
yarn serve                   # Serve the production build locally

# Linting & Formatting
yarn lint                    # ESLint on src/ (.js, .jsx, .ts, .tsx)
yarn lint:fix                # ESLint with auto-fix
yarn format                  # Prettier write on src/ JS/TS/CSS/MD files
yarn format:check            # Prettier check (no write)

# Utilities
yarn clear                   # Clear Docusaurus cache
node scripts/validate-content.js  # Validate docs/ frontmatter, links, images, headings, a11y
```

**There are no tests.** No Jest, Vitest, Playwright, or Cypress. The `validate-content.js` script
is the closest equivalent — run it to check documentation quality.

**Important build note:** `onBrokenLinks` is set to `"throw"` in `docusaurus.config.js`. Any broken
internal link will cause `yarn build` to fail. Always verify links when adding or moving docs.

## Repository Structure

```
docs/           Documentation source (Markdown/MDX) — sidebar is auto-generated
blog/           Blog posts (Markdown)
external/       Auto-downloaded Markdown from upstream repos (do not edit manually)
src/
  components/   Reusable React components
  css/          Global styles (custom.css — Infima variable overrides)
  pages/        Top-level pages (homepage, downloads, feedback-analytics)
  theme/        Swizzled Docusaurus theme components
static/         Static assets (images, favicon)
scripts/        Utility scripts (validate-content.js)
```

## Code Style

### Formatting (Prettier)

Configuration in `.prettierrc`:

- **Single quotes** for strings
- **Semicolons** required
- **Trailing commas** everywhere (ES5+, including function parameters)
- **2-space indentation**, no tabs
- **No spaces inside object braces**: `{foo: 'bar'}` not `{ foo: 'bar' }`
- **No parens** around single arrow function arguments: `x => x` not `(x) => x`
- **Print width**: 80 characters

Note: `.prettierignore` excludes `*.md` files, so Prettier does not format Markdown.

### ESLint

Configuration in `.eslintrc.js`:

- Extends `@docusaurus/eslint-plugin/recommended` and `eslint-config-prettier`
- `react/prop-types` is disabled — PropTypes are optional, not enforced
- `@docusaurus/string-literal-i18n-messages` is disabled
- Only targets `src/**/*.{js,jsx,ts,tsx}`

Run `yarn lint` before committing any `src/` changes.

### Imports

Follow this ordering (consistent across all existing files):

1. React and hooks: `import React, {useState} from 'react';`
2. Third-party packages: `clsx`, `PropTypes`, etc.
3. Docusaurus utilities: `@docusaurus/...`, `@theme/...`
4. Local components (relative paths)
5. CSS modules (always last): `import styles from './Component.module.css';`

No blank lines between import groups is the existing convention.

### Naming Conventions

| Entity | Convention | Example |
|---|---|---|
| React components | PascalCase | `DownloadCard`, `HomepageFeatures` |
| Component files | Match component name | `DownloadCard.js` |
| Multi-file components | PascalCase dir + `index.js` | `DocFeedback/index.js` |
| CSS module files | `<ComponentName>.module.css` | `DownloadCard.module.css` |
| CSS module classes | camelCase | `downloadCard`, `recommendedBadge` |
| Swizzled wrappers | `<Name>Wrapper` | `CodeBlockWrapper` |
| Helper functions | camelCase | `getTextContent`, `calculateAnalytics` |
| Docs files | kebab-case | `quick-start.md`, `common-error-codes.md` |

### React Component Patterns

```js
// Default exports only — no named exports from component files
export default function MyComponent({title, isOpen = false, onClose}) {
  // Props destructured in signature; defaults inline
  const [active, setActive] = useState(false);

  return (
    <div className={clsx(styles.container, {[styles.active]: active})}>
      {title && <h2>{title}</h2>}
    </div>
  );
}
```

- Use `function` declarations for top-level exported components
- Use `const` arrow functions for internal sub-components defined in the same file
- Destructure props in the function signature with inline defaults (not `defaultProps`)
- Conditional class names via `clsx()`
- Conditional rendering via `&&` or ternary
- Local state only via `useState` — no Redux, Zustand, or Context API
- Lazy loading: use `React.lazy()` wrapped in `<Suspense fallback={...}>`

### Async / Error Handling

Use `async/await` with `try/catch`:

```js
async function handleSubmit() {
  try {
    const response = await fetch('/api/endpoint');
    const data = await response.json();
    setResult(data);
  } catch (error) {
    console.error('Failed to submit:', error);
    setError('Something went wrong.');
  }
}
```

### CSS

- Use **CSS Modules** for component-scoped styles (`.module.css`)
- Global styles go in `src/css/custom.css` using Infima CSS variables (`--ifm-*`)
- Dark mode via `[data-theme='dark']` selector
- Avoid inline styles except for truly dynamic values

## Documentation (Markdown)

### Frontmatter

Every doc page should have at minimum:

```yaml
---
title: Page Title
description: One-sentence description for SEO
sidebar_position: 1
---
```

`title` is required. `description` and `sidebar_position` are strongly recommended.
`validate-content.js` will warn if they are missing.

### Markdown Rules (`.markdownlint-cli2.jsonc`)

The following markdownlint rules are disabled — these are intentional:

- MD013 — no line length limit
- MD040 — fenced code blocks without language specifier are allowed
- MD041 — first line need not be an `h1`
- MD034 — bare URLs are allowed

Headings should be properly nested (h1 → h2 → h3) — this is checked by `validate-content.js`.

### Internal Links

Always use root-relative paths for internal doc links (e.g., `/docs/quick-start`). Broken links
cause the build to fail (`onBrokenLinks: 'throw'`).

## Swizzling Docusaurus Components

Swizzled components live in `src/theme/`. When wrapping a Docusaurus component:

1. Import the original using `@theme-original/<ComponentName>`
2. Name your wrapper `<ComponentName>Wrapper`
3. Export the wrapper as the default export

```js
import OriginalComponent from '@theme-original/ComponentName';

export default function ComponentNameWrapper(props) {
  return <OriginalComponent {...props} />;
}
```

## Deployment

- Production branch: `master`
- Merge to `master` triggers GitHub Actions: installs, builds, syncs to AWS S3, invalidates CloudFront
- Add `[skip ci]` to a commit message to skip the deploy workflow
- External docs in `external/` are re-downloaded from upstream repos on every deploy — do not edit those files directly

## External / Generated Files

Do not manually edit files in `external/`. They are overwritten on every CI deploy from upstream
repositories (`netbootxyz/netboot.xyz` and `netbootxyz/build-pipelines`).
