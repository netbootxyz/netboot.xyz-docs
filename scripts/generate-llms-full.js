#!/usr/bin/env node
//
// Generates static/llms-full.txt — the full text of the documentation in one
// file, for AI/LLM ingestion (the expanded companion to the curated llms.txt).
//
// Runs automatically before `yarn build` (package.json "prebuild"). The output
// is git-ignored and regenerated each build, so it can never drift from docs.

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://netboot.xyz';
const DOCS_BASE = '/docs';
const DOCS_DIR = path.join(__dirname, '..', 'docs');
const OUT_FILE = path.join(__dirname, '..', 'static', 'llms-full.txt');

const SITE_TITLE = 'netboot.xyz';
const SITE_SUMMARY =
  'netboot.xyz lets you PXE boot various operating system installers and ' +
  'utilities from a single tool over the network using iPXE. Boot Linux, BSD, ' +
  'Windows, and dozens of live CDs from one lightweight menu — no physical ' +
  'media required.';

// Recursively collect .md / .mdx files under a directory.
function collectDocs(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectDocs(full));
    } else if (/\.mdx?$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

// Minimal YAML-ish frontmatter parser (key: value, one level deep).
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return {data: {}, body: raw};
  const data = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim().replace(/^['"]|['"]$/g, '');
  }
  return {data, body: raw.slice(match[0].length)};
}

// Map a docs file path + frontmatter to its public URL.
function toUrl(relPath, data) {
  if (data.slug) {
    const slug = data.slug.startsWith('/') ? data.slug : `/${data.slug}`;
    return SITE_URL + DOCS_BASE + (slug === '/' ? '' : slug);
  }
  const clean = relPath
    .replace(/\.mdx?$/, '')
    .replace(/\/index$/, '')
    .replace(/^index$/, '');
  return SITE_URL + DOCS_BASE + (clean ? `/${clean}` : '');
}

// Remove HTML comments, looping until stable so overlapping/reconstructed
// markers (e.g. `<!--<!---->-->`) can't survive a single pass.
function stripHtmlComments(text) {
  let out = text;
  let prev;
  do {
    prev = out;
    out = out.replace(/<!--[\s\S]*?-->/g, '');
  } while (out !== prev);
  return out;
}

// Strip MDX noise so the LLM sees clean prose + markdown.
function cleanBody(body) {
  return stripHtmlComments(body)
    .split('\n')
    .filter(line => !/^\s*(import|export)\s/.test(line)) // MDX import/export
    .filter(line => !/^\s*<\/?[A-Za-z][\w.]*[\s/>]/.test(line)) // standalone JSX/HTML tag lines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function firstHeading(body) {
  const m = body.match(/^#{1,2}\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

function main() {
  const files = collectDocs(DOCS_DIR);

  const pages = files
    .map(file => {
      const raw = fs.readFileSync(file, 'utf8');
      const {data, body} = parseFrontmatter(raw);
      const relPath = path.relative(DOCS_DIR, file).split(path.sep).join('/');
      const cleaned = cleanBody(body);
      const title = data.title || firstHeading(cleaned) || relPath;
      return {title, url: toUrl(relPath, data), body: cleaned, relPath};
    })
    // Introduction first (the overview), then grouped by path so related docs
    // (booting/*, docker/*, kb/*) stay together.
    .sort((a, b) => {
      const rank = p => (p === 'introduction.md' ? 0 : 1);
      return (
        rank(a.relPath) - rank(b.relPath) || a.relPath.localeCompare(b.relPath)
      );
    });

  const header = `# ${SITE_TITLE} — Full Documentation\n\n> ${SITE_SUMMARY}\n\nThis file concatenates the full text of the netboot.xyz documentation for AI/LLM use. The curated index is at ${SITE_URL}/llms.txt.\n`;

  const sections = pages.map(
    p => `---\n\n# ${p.title}\n\nSource: ${p.url}\n\n${p.body}`,
  );

  fs.mkdirSync(path.dirname(OUT_FILE), {recursive: true});
  fs.writeFileSync(OUT_FILE, `${header}\n${sections.join('\n\n')}\n`);
  console.log(
    `[llms-full] wrote ${pages.length} pages to static/llms-full.txt`,
  );
}

main();
