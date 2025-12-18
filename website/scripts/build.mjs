import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const repoRoot = path.resolve(ROOT);
const distDir = path.join(repoRoot, "website", "dist");

const repoName = process.env.REPO_NAME || "purity-design-system";
const basePath = process.env.BASE_PATH || `/${repoName}/`;
const storybookPath = `${basePath.replace(/\/$/, "")}/storybook/`;

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function readUtf8(p) {
  return fs.readFileSync(p, "utf8");
}

function listStoryFiles() {
  const componentsDir = path.join(repoRoot, "design-system", "src", "components");
  const out = [];

  /** @param {string} dir */
  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(full);
      else if (/\.stories\.(ts|tsx)$/.test(ent.name)) out.push(full);
    }
  }

  walk(componentsDir);
  return out;
}

function extractTitle(fileContent) {
  // Matches either: title: "designsystem/Button" or title: 'designsystem/Button'
  const m = fileContent.match(/\btitle\s*:\s*(["'`])([^"'`]+)\1/);
  return m?.[2] || null;
}

function storyIdFromTitle(title) {
  // Storybook docs IDs: <kebab(title)>--docs
  // e.g. designsystem/Button => designsystem-button--docs
  const base = title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\//g, "-")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `${base}--docs`;
}

function componentSlug(name) {
  // Convert component name to URL-friendly slug
  // e.g. "AlertDialog" => "alert-dialog"
  return name
    .trim()
    .toLowerCase()
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Insert dash before capital letters
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildComponentIndex() {
  const storyFiles = listStoryFiles();
  const titles = new Set();

  for (const f of storyFiles) {
    const content = readUtf8(f);
    const title = extractTitle(content);
    if (title) titles.add(title);
  }

  const items = [...titles]
    // Exclude internal docs-only sections from the marketing index.
    .filter((t) => !t.toLowerCase().startsWith("foundations/"))
    .map((t) => {
      const parts = t.split("/").filter(Boolean);
      const name = parts[parts.length - 1] || t;
      const id = storyIdFromTitle(t);
      const slug = componentSlug(name);
      const href = `${storybookPath}?path=/docs/${id}`;
      const detailHref = `${basePath}components/${slug}/`;
      const category = parts[0] || "Other";
      return { title: t, name, id, href, detailHref, slug, category };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return items;
}

function groupComponentsByCategory(components) {
  // Group components alphabetically by first letter
  const grouped = {};

  for (const comp of components) {
    const firstLetter = comp.name.charAt(0).toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(comp);
  }

  // Sort each group alphabetically
  for (const letter in grouped) {
    grouped[letter].sort((a, b) => a.name.localeCompare(b.name));
  }

  return grouped;
}

function parseAtomicDesign() {
  const atomicPath = path.join(repoRoot, "design-system", "docs", "atomic-design.md");
  if (!fs.existsSync(atomicPath)) return null;

  const out = {
    Atoms: [],
    Molecules: [],
    Organisms: [],
    Templates: [],
    Pages: [],
  };

  let section = null;
  for (const raw of readUtf8(atomicPath).split(/\r?\n/)) {
    const line = raw.trim();
    const h = line.match(/^##\s+(Atoms|Molecules|Organisms|Templates|Pages)\s*$/);
    if (h) {
      section = h[1];
      continue;
    }
    if (!section) continue;

    // Matches lines like: - `Component` or - `Lookup` (also exports ...)
    const m = line.match(/^- `([^`]+)`/);
    if (m) out[section].push(m[1]);
  }

  return out;
}

function hrefForComponentName(name) {
  const atomic = parseAtomicDesign();
  const bucket =
    atomic &&
    (Object.keys(atomic).find((k) => (atomic[k] || []).includes(name)) || null);

  // Story titles are now organized by Atomic Design buckets.
  const title = `${bucket || "Organisms"}/${name}`;
  const id = storyIdFromTitle(title);
  return `${storybookPath}?path=/docs/${id}`;
}

// Centralized header navigation - used across all pages
function renderHeader() {
  return `
  <header>
    <div class="wrap nav">
      <div class="brand">
        <a href="${basePath}" class="brand-icon" aria-label="Home">
          <!-- Lucide-style water droplet -->
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3.5C9 7 6 10.5 6 14a6 6 0 0 0 12 0c0-3.5-3-7-6-10.5Z"></path>
          </svg>
        </a>
      </div>
      <div class="nav-main">
        <nav class="navlinks" aria-label="Primary">
          <a href="${basePath}components/">Components</a>
          <a href="${basePath}changelog/">Changelog</a>
        </nav>
        <div class="nav-search">
          <!-- Lucide Search icon -->
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="6"></circle>
            <path d="m16 16 4 4"></path>
          </svg>
          <input id="navSearchInput" type="search" placeholder="Search components…" autocomplete="off" />
          <kbd aria-hidden="true">⌘K</kbd>
        </div>
      </div>
      <div class="actions">
        <div class="tooltip-wrapper">
          <button type="button" class="modeToggle" id="modeToggleButton" aria-label="Toggle color mode">
            <!-- Lucide Sun icon -->
            <svg class="icon-sun" aria-hidden="true" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364-1.414 1.414M6.05 17.95 4.636 19.364M17.95 17.95l1.414 1.414M6.05 6.05 4.636 4.636"></path>
            </svg>
            <!-- Lucide Moon icon -->
            <svg class="icon-moon" aria-hidden="true" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <span id="modeToggleLabel">Light</span>
          </button>
          <div class="tooltip-bubble" role="tooltip">
            Toggle light/dark mode
          </div>
        </div>
        <a
          target="_blank"
          rel="noreferrer"
          class="btn primary"
          href="https://github.com/gagan-malik/purity-design-system/issues"
          style="display: none; height: 31px; padding: 6px 12px; font-size: 13px; gap: 6px; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
          Request a component
        </a>
        <div class="themeSelect" id="themeSelectRoot">
          <div class="tooltip-wrapper">
            <button
              class="btn theme-btn"
              id="theme-selector"
              type="button"
              role="combobox"
              aria-controls="themeMenu"
              aria-expanded="false"
              aria-autocomplete="none"
              aria-haspopup="listbox"
            >
              Theme: <span id="themeValue">Neutral</span>
            </button>
            <div class="tooltip-bubble" role="tooltip">
              Select accent color
            </div>
          </div>
          <div class="themeMenu" id="themeMenu" role="listbox" aria-label="Theme">
            <button type="button" class="themeItem" role="option" data-color="neutral" aria-selected="true">
              <span style="display:inline-flex; align-items:center; gap:10px;"><span class="swatch"></span>Neutral</span>
              <span aria-hidden="true">✓</span>
            </button>
            <button type="button" class="themeItem" role="option" data-color="blue" aria-selected="false">
              <span style="display:inline-flex; align-items:center; gap:10px;"><span class="swatch"></span>Blue</span>
              <span aria-hidden="true"></span>
            </button>
            <button type="button" class="themeItem" role="option" data-color="emerald" aria-selected="false">
              <span style="display:inline-flex; align-items:center; gap:10px;"><span class="swatch"></span>Emerald</span>
              <span aria-hidden="true"></span>
            </button>
            <button type="button" class="themeItem" role="option" data-color="rose" aria-selected="false">
              <span style="display:inline-flex; align-items:center; gap:10px;"><span class="swatch"></span>Rose</span>
              <span aria-hidden="true"></span>
            </button>
            <button type="button" class="themeItem" role="option" data-color="amber" aria-selected="false">
              <span style="display:inline-flex; align-items:center; gap:10px;"><span class="swatch"></span>Amber</span>
              <span aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>`;
}

function renderHTML(components, page = "home") {
  const updated = new Date().toISOString();
  const defaultPreview =
    components.find((c) => c.name.toLowerCase() === "themeshowcase") ||
    components.find((c) => c.name.toLowerCase() === "button") ||
    components[0];
  const defaultPreviewHref = defaultPreview?.href || storybookPath;

  // shadcn/ui-inspired styling: neutral palette, grid background, crisp type.
  return `<!doctype html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="light dark" />
  <title>Purity Design System</title>
  <meta name="description" content="A theme-aware React design system with Storybook documentation." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
  <style>
    :root {
      --background: 0 0% 100%;
      --foreground: 240 10% 3.9%;
      --muted: 240 4.8% 95.9%;
      --muted-foreground: 240 3.8% 46.1%;
      --card: 0 0% 100%;
      --border: 240 5.9% 90%;
      --ring: 240 5% 64.9%;
      --primary: 240 5.9% 10%;
      --primary-foreground: 0 0% 98%;
      --accent: 240 4.8% 95.9%;
      --accent-foreground: 240 5.9% 10%;
      --destructive: 0 84.2% 60.2%;
      --destructive-foreground: 0 0% 98%;

      --radius: 18px;
      --density: 1;
      --spacing-scale: 1;
      --font-scale: 1;
      --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      --sans: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
    }
    /* Accent “themes” (like shadcn: Theme: Neutral/Blue/…).
       These only adjust accent tokens (primary + ring) to avoid breaking layout colors. */
    :root[data-color="neutral"] {
      --primary: 240 5.9% 10%;
      --ring: 240 5% 64.9%;
    }
    :root[data-color="blue"] {
      --primary: 221 83% 53%;
      --ring: 221 83% 53%;
    }
    :root[data-color="emerald"] {
      --primary: 142 71% 45%;
      --ring: 142 71% 45%;
    }
    :root[data-color="rose"] {
      --primary: 346 77% 50%;
      --ring: 346 77% 50%;
    }
    :root[data-color="amber"] {
      --primary: 45 93% 47%;
      --ring: 45 93% 47%;
    }
    :root[data-radius="sm"] { --radius: 10px; }
    :root[data-radius="md"] { --radius: 12px; }
    :root[data-radius="lg"] { --radius: 16px; }
    :root[data-density="compact"] { --density: 0.88; }
    :root[data-density="comfortable"] { --density: 1; }
    * { box-sizing: border-box; }
    html, body { height: 100%; }
    body {
      margin: 0;
      font-family: var(--sans);
      color: hsl(var(--foreground));
      background: hsl(var(--background));
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }
    a { color: inherit; text-decoration: none; }
    a:hover { text-decoration: none; }

    .wrap { max-width: 1120px; margin: 0 auto; padding: 0 20px; }

    /* subtle grid, like shadcn/ui */
    .bg-grid {}
    .fade-top {}

    /* Dark mode tokens (used when data-theme="dark" is set) */
    :root[data-theme="dark"],
    html[data-theme="dark"] {
      --background: 240 10% 3.9%;
      --foreground: 0 0% 98%;
      --muted: 240 3.7% 15.9%;
      --muted-foreground: 240 5% 64.9%;
      --card: 240 10% 3.9%;
      --border: 240 3.7% 15.9%;
      --ring: 240 4.9% 83.9%;
      --primary: 0 0% 98%;
      --primary-foreground: 240 5.9% 10%;
      --accent: 240 3.7% 15.9%;
      --accent-foreground: 0 0% 98%;
      --destructive: 0 62.8% 30.6%;
      --destructive-foreground: 0 0% 98%;
    }

    header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 20;
      backdrop-filter: blur(12px);
      background: color-mix(in oklab, hsl(var(--background)) 85%, transparent);
      border-bottom: 1px solid hsl(var(--border));
    }
    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      height: 56px;
    }
    .brand { display: flex; align-items: center; gap: 10px; font-weight: 600; }
    .brand-icon {
      width: 24px;
      height: 24px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 30% 20%, #e0f2fe, #38bdf8);
      box-shadow: 0 4px 12px rgba(56, 189, 248, 0.35);
      color: #0f172a;
      text-decoration: none;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .brand-icon:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(56, 189, 248, 0.45);
    }
    .brand-icon svg {
      width: 14px;
      height: 14px;
      stroke: currentColor;
      stroke-width: 1.8;
      fill: none;
    }
    .brand-name { font-family: var(--mono); font-size: 14px; }
    .navlinks { display: flex; gap: 14px; align-items: center; color: hsl(var(--muted-foreground)); font-size: 14px; }
    .navlinks a { padding: 6px 8px; border-radius: 10px; }
    .navlinks a:hover { background: hsl(var(--muted)); color: hsl(var(--foreground)); }

    .nav-main {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-left: 20px;
    }

    .nav-search {
      width: 280px;
      max-width: 280px;
      display: flex;
      align-items: center;
      gap: 6px;
      border-radius: 999px;
      border: 1px solid hsl(var(--border));
      background: hsl(var(--card));
      padding: 6px 10px;
      color: hsl(var(--muted-foreground));
      font-size: 13px;
    }
    .nav-search input {
      flex: 1;
      border: 0;
      outline: none;
      background: transparent;
      color: hsl(var(--foreground));
      font-size: 13px;
    }
    .nav-search input::placeholder {
      color: hsl(var(--muted-foreground));
    }
    .nav-search svg {
      width: 14px;
      height: 14px;
      stroke-width: 1.8;
      stroke: currentColor;
      fill: none;
    }
    .nav-search kbd {
      font-family: var(--mono);
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 999px;
      border: 1px solid hsl(var(--border));
      background: hsl(var(--background));
      color: hsl(var(--muted-foreground));
    }

    .actions { display: flex; gap: 8px; align-items: center; }
    .github-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border-radius: 999px;
      border: 1px solid hsl(var(--border));
      padding: 4px 10px;
      font-size: 12px;
      line-height: 1;
      cursor: pointer;
      background: hsl(var(--card));
      color: hsl(var(--foreground));
      text-decoration: none;
      transition: all 0.15s ease;
    }
    .github-link:hover {
      background: hsl(var(--muted));
      color: hsl(var(--foreground));
    }
    .github-link svg {
      width: 16px;
      height: 16px;
      stroke: currentColor;
      stroke-width: 1.8;
      fill: none;
      display: inline-block;
      pointer-events: none;
    }
    .github-stars {
      font-size: 14px;
      font-weight: 500;
    }
    
    /* shadcn/ui utility classes support */
    .size-4 {
      width: 1rem;
      height: 1rem;
    }
    .bg-accent {
      background-color: hsl(var(--accent));
    }
    .text-accent-foreground {
      color: hsl(var(--accent-foreground));
    }
    .ring-ring\/50 {
      --tw-ring-color: hsl(var(--ring) / 0.5);
    }
    .ring-destructive\/20 {
      --tw-ring-color: hsl(var(--destructive) / 0.2);
    }
    .dark\:ring-destructive\/40 {
      --tw-ring-color: hsl(var(--destructive) / 0.4);
    }
    .border-ring {
      border-color: hsl(var(--ring));
    }
    .border-destructive {
      border-color: hsl(var(--destructive));
    }
    .has-\[>svg\]\:px-2\.5:has(> svg) {
      padding-left: 0.625rem;
      padding-right: 0.625rem;
    }
    html[data-theme="dark"] .dark\:aria-invalid\:ring-destructive\/40 {
      --tw-ring-color: hsl(var(--destructive) / 0.4);
    }
    html[data-theme="dark"] .dark\:hover\:bg-accent\/50:hover {
      background-color: hsl(var(--accent) / 0.5);
    }
    
    .btn {
      border: 1px solid hsl(var(--border));
      background: hsl(var(--background));
      color: hsl(var(--foreground));
      padding: calc(9px * var(--density)) calc(12px * var(--density));
      border-radius: var(--radius);
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 1px 0 rgba(0,0,0,.02);
    }
    .btn.theme-btn {
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 12px;
      gap: 6px;
    }
    .btn.primary {
      border-color: transparent;
      background: hsl(var(--primary));
      color: hsl(var(--primary-foreground));
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }
    .btn.primary:hover {
      background: hsl(var(--primary) / 0.9);
      box-shadow: 0 2px 4px rgba(0,0,0,0.15);
    }
    @media (min-width: 640px) {
      .btn.primary[style*="display: none"] {
        display: flex !important;
      }
    }
    .btn:hover { text-decoration: none; transform: translateY(-1px); transition: transform .12s ease; }

    .modeToggle {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border-radius: 999px;
      border: 1px solid hsl(var(--border));
      padding: 4px 10px;
      font-size: 12px;
      line-height: 1;
      cursor: pointer;
      background: hsl(var(--card));
      color: hsl(var(--foreground));
    }

    .modeToggle svg {
      width: 16px;
      height: 16px;
      stroke: currentColor;
      stroke-width: 1.8;
      fill: none;
      display: inline-block;
    }
    .modeToggle .icon-sun {
      display: inline-block;
    }
    .modeToggle .icon-moon {
      display: none;
    }
    :root[data-theme="dark"] .modeToggle .icon-sun,
    html[data-theme="dark"] .modeToggle .icon-sun {
      display: none !important;
    }
    :root[data-theme="dark"] .modeToggle .icon-moon,
    html[data-theme="dark"] .modeToggle .icon-moon {
      display: inline-block !important;
    }

    .shortcut-pill {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      border-radius: 999px;
      border: 1px solid hsl(var(--border));
      padding: 3px 8px;
      font-size: 11px;
      text-decoration: none;
      color: hsl(var(--foreground));
      background: hsl(var(--card));
    }

    .shortcut-pill kbd {
      font-family: var(--mono);
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 6px;
      border: 1px solid hsl(var(--border));
      background: hsl(var(--background));
    }

    .tooltip-wrapper {
      position: relative;
      display: inline-flex;
    }
    .tooltip-bubble {
      position: absolute;
      top: calc(100% + 6px);
      right: 0;
      padding: 6px 8px;
      border-radius: 8px;
      background: hsl(var(--foreground));
      color: hsl(var(--primary-foreground));
      font-size: 11px;
      white-space: nowrap;
      box-shadow: 0 8px 20px rgba(0,0,0,.18);
      opacity: 0;
      transform: translateY(-4px);
      pointer-events: none;
      transition: opacity .12s ease, transform .12s ease;
      z-index: 40;
    }
    .tooltip-bubble::after {
      content: "";
      position: absolute;
      bottom: 100%;
      right: 10px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent hsl(var(--foreground)) transparent;
    }
    .tooltip-wrapper:hover .tooltip-bubble {
      opacity: 1;
      transform: translateY(0);
    }

    .themeSelect { position: relative; }
    .themeMenu {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      min-width: 220px;
      padding: 6px;
      border: 1px solid hsl(var(--border));
      border-radius: 14px;
      background: hsl(var(--background));
      box-shadow: 0 18px 48px rgba(0,0,0,.14);
      display: none;
    }
    .themeSelect[data-open="true"] .themeMenu { display: block; }
    .themeItem {
      width: 100%;
      border: 0;
      background: transparent;
      color: hsl(var(--foreground));
      text-align: left;
      padding: 10px 10px;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-size: 14px;
    }
    .themeItem:hover { background: hsl(var(--muted)); }
    .themeItem[aria-selected="true"] { background: hsl(var(--muted)); font-weight: 600; }
    .swatch {
      width: 14px;
      height: 14px;
      border-radius: 999px;
      border: 1px solid color-mix(in oklab, hsl(var(--border)) 80%, transparent);
      background: hsl(var(--primary));
      flex: 0 0 auto;
    }

    /* Per-theme accent colors for the swatches */
    .themeItem[data-color="neutral"] .swatch {
      background: #0f172a;
    }
    .themeItem[data-color="blue"] .swatch {
      background: #2563eb;
    }
    .themeItem[data-color="emerald"] .swatch {
      background: #059669;
    }
    .themeItem[data-color="rose"] .swatch {
      background: #e11d48;
    }
    .themeItem[data-color="amber"] .swatch {
      background: #d97706;
    }

    /* Reduced motion */
    :root[data-motion="reduced"] * {
      scroll-behavior: auto !important;
      transition-duration: 0.001ms !important;
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
    }

    .hero {
      padding: 128px 0 36px; /* add top offset for fixed header */
      position: relative;
      z-index: 10;
    }
    .kicker { color: hsl(var(--muted-foreground)); font-size: 13px; font-family: var(--mono); }
    h1 {
      margin: 14px 0 12px;
      font-size: clamp(34px, 4.2vw, 56px);
      line-height: 1.1;
      letter-spacing: -0.04em;
    }
    .lead { max-width: 64ch; color: hsl(var(--muted-foreground)); font-size: 16px; }
    .hero-actions { margin-top: 18px; display: flex; gap: 10px; flex-wrap: wrap; }
    .code {
      margin-top: 18px;
      font-family: var(--mono);
      font-size: 13px;
      background: hsl(var(--muted));
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius);
      padding: 14px;
      overflow: auto;
      color: hsl(var(--foreground));
      white-space: pre;
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1.2fr .8fr;
      gap: 18px;
      margin-top: 28px;
    }
    @media (max-width: 880px) { .hero-grid { grid-template-columns: 1fr; } }

    .card {
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius);
      background: hsl(var(--card));
      box-shadow: 0 1px 0 rgba(0,0,0,.02);
    }
    .card .inner { padding: 16px; }

    .spec {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .spec .pill {
      border: 1px solid var(--border);
      border-radius: 14px;
      background: var(--card2);
      padding: 12px;
    }
    .pill .label { font-size: 12px; color: var(--muted); }
    .pill .value { font-size: 14px; margin-top: 4px; font-family: var(--mono); }

    section { padding: 34px 0; }
    h2 { margin: 0 0 10px; font-size: 20px; letter-spacing: -0.02em; }
    h3 { margin: 0 0 10px; font-size: 16px; letter-spacing: -0.01em; }

    .landing-hero {
      padding-top: 32px;
      padding-bottom: 16px;
    }
    .landing-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 8px;
      border-radius: 999px;
      border: 1px solid hsl(var(--border));
      font-size: 11px;
      color: hsl(var(--muted-foreground));
      background: hsl(var(--card));
      font-family: var(--mono);
    }
    .landing-pill span.dot {
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: #22c55e;
      box-shadow: 0 0 0 4px rgba(34,197,94,.35);
    }
    .landing-title {
      margin: 10px 0 8px;
      font-size: clamp(30px, 3.3vw, 40px);
      letter-spacing: -0.05em;
    }
    .landing-subtitle {
      margin: 0 0 18px;
      color: hsl(var(--muted-foreground));
      max-width: 56ch;
    }
    .landing-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }
    .landing-meta {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      font-size: 12px;
      color: hsl(var(--muted-foreground));
    }
    .landing-meta span.label {
      font-family: var(--mono);
    }
    .landing-card {
      border-radius: var(--radius);
      border: 1px solid hsl(var(--border));
      background: hsl(var(--card));
      padding: 16px;
      box-shadow: 0 10px 30px rgba(15,23,42,.10);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }
    @media (max-width: 960px) { .grid { grid-template-columns: repeat(2, 1fr);} }
    @media (max-width: 640px) { .grid { grid-template-columns: 1fr;} }

    .components-layout {
      display: grid;
      grid-template-columns: 240px 1fr 280px;
      gap: 48px;
      align-items: start;
    }
    .components-content {
      min-width: 0;
      flex: 1;
    }
    .components-content-wrapper {
      width: 100%;
      flex: 1;
    }
    .components-content-inner {
      margin: 0 auto;
      width: 100%;
      max-width: 672px;
      min-width: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 32px;
      padding: 24px 16px;
      color: hsl(var(--foreground));
    }
    .component-header {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .component-header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .component-name {
      font-size: 2.25rem;
      font-weight: 700;
      line-height: 1.2;
      margin: 0;
      color: hsl(var(--foreground));
    }
    @media (min-width: 640px) {
      .component-name {
        font-size: 2.5rem;
      }
    }
    .component-actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .component-action-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 500;
      border: 1px solid hsl(var(--border));
      background: hsl(var(--background));
      color: hsl(var(--foreground));
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .component-action-btn:hover {
      background: hsl(var(--muted));
      border-color: hsl(var(--border) / 0.8);
    }
    .component-action-btn svg {
      stroke-width: 2;
    }
    .dropdown-wrapper {
      position: relative;
      display: inline-block;
    }
    .dropdown-btn {
      position: relative;
    }
    .dropdown-chevron {
      margin-left: 2px;
      stroke-width: 2;
      opacity: 0.6;
    }
    .dropdown-menu {
      position: absolute;
      top: calc(100% + 4px);
      right: 0;
      min-width: 180px;
      background: hsl(var(--popover, var(--card)));
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      padding: 4px;
      z-index: 50;
      display: none;
      flex-direction: column;
      gap: 2px;
      opacity: 0;
      transform: scale(0.95);
      transition: opacity 0.15s ease, transform 0.15s ease;
    }
    .dropdown-wrapper[data-open="true"] .dropdown-menu {
      display: flex;
      opacity: 1;
      transform: scale(1);
    }
    .dropdown-item {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      font-size: 14px;
      font-weight: 400;
      color: hsl(var(--foreground));
      background: transparent;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-align: left;
      width: 100%;
      transition: background 0.15s ease;
    }
    .dropdown-item:hover {
      background: hsl(var(--muted));
    }
    .component-header-nav {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .component-nav-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 500;
      border: 1px solid hsl(var(--border));
      background: hsl(var(--background));
      color: hsl(var(--foreground));
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .component-nav-btn:hover:not(:disabled) {
      background: hsl(var(--muted));
      border-color: hsl(var(--border) / 0.8);
    }
    .component-nav-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .component-nav-btn svg {
      stroke-width: 2;
    }
    .docs-nav {
      position: fixed;
      inset: auto 0 0 0;
      z-index: 50;
      display: flex;
      align-items: center;
      gap: 8px;
      border-top: 1px solid hsl(var(--border) / 0.5);
      padding: 16px 24px;
      background: color-mix(in oklab, hsl(var(--background)) 80%, transparent);
      backdrop-filter: blur(8px);
      isolation: isolate;
    }
    @media (min-width: 640px) {
      .docs-nav {
        position: static;
        z-index: 0;
        border-top: none;
        background: transparent;
        padding: 0;
        padding-top: 6px;
        backdrop-filter: none;
      }
    }
    .docs-nav-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 500;
      border: 1px solid hsl(var(--border));
      background: hsl(var(--background));
      color: hsl(var(--foreground));
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .docs-nav-btn:hover:not(:disabled) {
      background: hsl(var(--muted));
      border-color: hsl(var(--border) / 0.8);
    }
    .docs-nav-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .docs-nav-btn svg {
      stroke-width: 2;
      width: 16px;
      height: 16px;
    }
    .component-description {
      font-size: 1.05rem;
      line-height: 1.6;
      color: hsl(var(--muted-foreground));
      margin: 0;
    }
    @media (min-width: 640px) {
      .component-description {
        font-size: 0.9375rem;
      }
    }
    .component-tabs {
      display: flex;
      gap: 0;
      border-bottom: 1px solid hsl(var(--border));
      margin-top: 8px;
    }
    .component-tab {
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      color: hsl(var(--muted-foreground));
      cursor: pointer;
      transition: all 0.15s ease;
      margin-bottom: -1px;
    }
    .component-tab:hover {
      color: hsl(var(--foreground));
    }
    .component-tab.active {
      color: hsl(var(--foreground));
      border-bottom-color: hsl(var(--foreground));
    }
    @media (min-width: 768px) {
      .components-content-inner {
        padding: 32px 0;
      }
    }
    @media (min-width: 1024px) {
      .components-content-inner {
        padding: 32px 0;
      }
    }
    .components-title {
      font-size: 2.25rem;
      font-weight: 700;
      line-height: 1.2;
      margin: 0;
      color: hsl(var(--foreground));
    }
    @media (min-width: 640px) {
      .components-title {
        font-size: 2.5rem;
      }
    }
    .components-description {
      font-size: 1.05rem;
      line-height: 1.6;
      color: hsl(var(--muted-foreground));
      margin: 0;
    }
    @media (min-width: 640px) {
      .components-description {
        font-size: 0.9375rem;
      }
    }
    .components-search-wrapper {
      margin-top: 8px;
    }
    .components-search {
      width: 100%;
      padding: 10px 14px;
      font-size: 14px;
      border: 1px solid hsl(var(--border));
      background: hsl(var(--background));
      color: hsl(var(--foreground));
      border-radius: var(--radius);
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .components-search:focus {
      outline: none;
      border-color: hsl(var(--ring));
      box-shadow: 0 0 0 2px hsl(var(--ring) / 0.2);
    }
    .components-search::placeholder {
      color: hsl(var(--muted-foreground));
    }
    .components-breadcrumb {
      display: none;
      height: 64px;
      width: 100%;
      max-width: 672px;
      margin: 0 auto;
      align-items: center;
      gap: 8px;
      padding: 0 16px;
    }
    @media (min-width: 640px) {
      .components-breadcrumb {
        display: flex;
      }
    }
    @media (min-width: 768px) {
      .components-breadcrumb {
        padding: 0;
      }
    }
    .components-breadcrumb-inner {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: hsl(var(--muted-foreground));
    }
    .components-breadcrumb-item {
      color: hsl(var(--foreground));
      font-weight: 500;
    }
    .components-breadcrumb-separator {
      color: hsl(var(--muted-foreground));
      opacity: 0.5;
    }
    .components-breadcrumb-current {
      color: hsl(var(--muted-foreground));
    }
    .components-sidebar {
      position: sticky;
      top: 100px;
      max-height: calc(100vh - 120px);
      overflow: hidden;
      width: 240px;
      align-self: flex-start;
      z-index: 10;
    }
    .atomic-sidebar {
      position: sticky;
      top: 100px;
      max-height: calc(100vh - 120px);
      overflow: hidden;
      width: 280px;
    }
    .atomic-sidebar-inner {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 16px;
      background: hsl(var(--card));
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius);
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .atomic-sidebar-inner::-webkit-scrollbar {
      display: none;
    }
    .atomic-sidebar-header {
      padding-bottom: 12px;
      border-bottom: 1px solid hsl(var(--border));
    }
    .atomic-controls {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .atomic-control-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .atomic-label {
      font-size: 12px;
      font-weight: 600;
      color: hsl(var(--foreground));
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .atomic-radio-group {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    .atomic-radio {
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 500;
      border: 1px solid hsl(var(--border));
      background: hsl(var(--background));
      color: hsl(var(--foreground));
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .atomic-radio:hover {
      background: hsl(var(--muted));
      border-color: hsl(var(--border) / 0.8);
    }
    .atomic-radio[aria-pressed="true"],
    .atomic-radio.active {
      background: hsl(var(--primary));
      color: hsl(var(--primary-foreground));
      border-color: hsl(var(--primary));
    }
    .atomic-color-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
    }
    .atomic-color {
      aspect-ratio: 1;
      border: 2px solid hsl(var(--border));
      background: transparent;
      border-radius: 6px;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }
    .atomic-color span {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
    .atomic-color:hover {
      border-color: hsl(var(--primary));
      transform: scale(1.05);
    }
    .atomic-color[aria-pressed="true"],
    .atomic-color.active {
      border-color: hsl(var(--primary));
      box-shadow: 0 0 0 2px hsl(var(--primary) / 0.2);
    }
    .atomic-slider-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .atomic-slider {
      flex: 1;
      height: 6px;
      border-radius: 3px;
      background: hsl(var(--muted));
      outline: none;
      -webkit-appearance: none;
      appearance: none;
    }
    .atomic-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: hsl(var(--primary));
      cursor: pointer;
      border: 2px solid hsl(var(--background));
    }
    .atomic-slider::-moz-range-thumb {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: hsl(var(--primary));
      cursor: pointer;
      border: 2px solid hsl(var(--background));
    }
    .atomic-slider-value {
      font-size: 11px;
      font-family: var(--mono);
      color: hsl(var(--muted-foreground));
      min-width: 40px;
      text-align: right;
    }
    .sidebar-inner {
      display: flex;
      flex-direction: column;
      gap: 2px;
      max-height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 4px 0;
      -ms-overflow-style: none;
      scrollbar-width: none;
      scrollbar-gutter: stable;
    }
    .sidebar-inner::-webkit-scrollbar {
      display: none !important;
      width: 0;
      height: 0;
      background: transparent;
    }
    .sidebar-inner::-webkit-scrollbar-track {
      display: none !important;
      background: transparent;
    }
    .sidebar-inner::-webkit-scrollbar-thumb {
      display: none !important;
      background: transparent;
    }
    .sidebar-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 4px;
    }
    .sidebar-group-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 600;
      color: hsl(var(--muted-foreground));
      background: transparent;
      border: none;
      cursor: pointer;
      border-radius: 6px;
      transition: color 0.15s ease, background 0.15s ease;
      text-align: left;
      width: 100%;
    }
    .sidebar-group-header:hover {
      color: hsl(var(--foreground));
      background: hsl(var(--muted) / 0.5);
    }
    .sidebar-group-title {
      flex: 1;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-size: 11px;
    }
    .sidebar-group-count {
      font-size: 11px;
      font-weight: 500;
      opacity: 0.6;
      font-family: var(--mono);
    }
    .sidebar-group-icon {
      width: 14px;
      height: 14px;
      transition: transform 0.2s ease;
      opacity: 0.5;
    }
    .sidebar-group[data-collapsed="true"] .sidebar-group-icon {
      transform: rotate(-90deg);
    }
    .sidebar-group[data-collapsed="true"] .sidebar-group-content {
      display: none;
    }
    .sidebar-group-content {
      display: flex;
      flex-direction: column;
      gap: 1px;
      padding-left: 4px;
      margin-top: 2px;
    }
    .sidebar-item {
      display: flex;
      align-items: center;
      padding: 6px 12px 6px 20px;
      font-size: 14px;
      color: hsl(var(--foreground));
      text-decoration: none;
      border-radius: 6px;
      transition: background 0.15s ease, color 0.15s ease;
      position: relative;
      cursor: pointer;
      pointer-events: auto;
    }
    .sidebar-item:hover {
      background: hsl(var(--muted));
      color: hsl(var(--foreground));
    }
    .sidebar-item:active {
      background: hsl(var(--muted) / 0.8);
    }
    .sidebar-item.active {
      background: hsl(var(--muted));
      color: hsl(var(--foreground));
      font-weight: 500;
    }
    .component-content {
      margin-top: 24px;
    }
    .component-docs,
    .component-api {
      line-height: 1.7;
    }
    .component-docs h2,
    .component-api h2 {
      margin-top: 32px;
      margin-bottom: 16px;
      font-size: 1.5rem;
      font-weight: 600;
    }
    .component-docs h3,
    .component-api h3 {
      margin-top: 24px;
      margin-bottom: 12px;
      font-size: 1.125rem;
      font-weight: 600;
    }
    .component-docs pre,
    .component-api pre {
      background: hsl(var(--muted));
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius);
      padding: 16px;
      overflow-x: auto;
      font-family: var(--mono);
      font-size: 13px;
      line-height: 1.6;
    }
    .component-docs code,
    .component-api code {
      font-family: var(--mono);
      font-size: 0.9em;
      background: hsl(var(--muted));
      padding: 2px 6px;
      border-radius: 4px;
    }
    .component-docs pre code,
    .component-api pre code {
      background: transparent;
      padding: 0;
    }
    .sidebar-item-text {
      line-height: 1.5;
    }
    @media (max-width: 1400px) {
      .components-layout {
        grid-template-columns: 200px 1fr 240px;
        gap: 32px;
      }
      .components-sidebar {
        width: 200px;
      }
      .atomic-sidebar {
        width: 240px;
      }
    }
    @media (max-width: 1200px) {
      .components-layout {
        grid-template-columns: 200px 1fr;
        gap: 32px;
      }
      .components-sidebar {
        width: 200px;
      }
      .atomic-sidebar {
        display: none;
      }
    }
    @media (max-width: 960px) {
      .components-layout {
        grid-template-columns: 1fr;
        gap: 24px;
      }
      .components-sidebar {
        position: relative;
        top: 0;
        max-height: none;
        width: 100%;
      }
      .sidebar-inner {
        max-height: 600px;
      }
      .atomic-sidebar {
        display: none;
      }
    }

    .comp {
      border: 1px solid hsl(var(--border));
      background: hsl(var(--card));
      border-radius: var(--radius);
      padding: 12px;
      box-shadow: 0 1px 0 rgba(0,0,0,.02);
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 10px;
      text-decoration: none;
      color: inherit;
      transition: background 0.15s ease, border-color 0.15s ease;
    }
    .comp:hover {
      background: hsl(var(--muted));
      border-color: hsl(var(--border) / 0.8);
    }
    .comp .name {
      font-weight: 600;
      font-size: 14px;
      line-height: 1.4;
    }
    .comp .meta {
      color: hsl(var(--muted-foreground));
      font-size: 11px;
      font-family: var(--mono);
      line-height: 1.3;
    }

    .kgrid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
    }
    @media (max-width: 860px) { .kgrid { grid-template-columns: 1fr; } }
    .kcard {
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius);
      background: hsl(var(--card));
      padding: 14px;
      box-shadow: 0 1px 0 rgba(0,0,0,.02);
    }
    .kcard .desc { color: hsl(var(--muted-foreground)); font-size: 13px; margin-top: 6px; }
    .kcard .links { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; }
    .chiplink {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 10px;
      border-radius: 999px;
      border: 1px solid hsl(var(--border));
      background: hsl(var(--background));
      font-size: 13px;
      font-family: var(--mono);
    }
    .chiplink:hover { background: hsl(var(--muted)); }

    .atomic {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
    }
    @media (max-width: 1080px) { .atomic { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 760px) { .atomic { grid-template-columns: 1fr; } }
    .atomic-cards {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
    }
    @media (max-width: 1080px) {
      .atomic-cards {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    @media (max-width: 760px) {
      .atomic-cards {
        grid-template-columns: 1fr;
      }
    }
    .atomic-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
      border: 1px solid hsl(var(--border));
      background: hsl(var(--card));
      border-radius: var(--radius);
      text-align: center;
      transition: all 0.15s ease;
    }
    .atomic-card:hover {
      background: hsl(var(--muted));
      border-color: hsl(var(--border) / 0.8);
      transform: translateY(-2px);
    }
    .atomic-card-label {
      font-size: 14px;
      font-weight: 600;
      color: hsl(var(--foreground));
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .atomic-card-count {
      font-size: 32px;
      font-weight: 700;
      color: hsl(var(--primary));
      line-height: 1;
    }
    .alist {
      margin: 10px 0 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: 8px;
    }
    .alist a { text-decoration: none; }
    .alist a:hover { text-decoration: underline; text-underline-offset: 3px; }

    .search {
      width: 100%;
      max-width: 520px;
      border: 1px solid hsl(var(--border));
      background: hsl(var(--background));
      color: hsl(var(--foreground));
      padding: 10px 12px;
      border-radius: 12px;
      font-size: 14px;
      outline: none;
    }
    .search:focus { box-shadow: 0 0 0 3px color-mix(in oklab, hsl(var(--ring)) 35%, transparent); }

    .preview {
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius);
      background: transparent;
      box-shadow: 0 1px 0 rgba(0,0,0,.02);
      overflow: hidden;
    }
    .previewbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 14px;
      border-bottom: 1px solid hsl(var(--border));
      background: hsl(var(--background));
    }
    .previewbar .left {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
      flex: 1;
    }
    .previewbar .right {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    .select {
      appearance: none;
      border: 1px solid hsl(var(--border));
      background: hsl(var(--background));
      color: hsl(var(--foreground));
      padding: 10px 12px;
      border-radius: 12px;
      font-size: 14px;
      min-width: 240px;
      max-width: 520px;
      width: 100%;
    }
    .seg {
      display: inline-flex;
      border: 1px solid hsl(var(--border));
      background: hsl(var(--muted));
      border-radius: 12px;
      padding: 2px;
      gap: 2px;
    }
    .seg button {
      appearance: none;
      border: 0;
      background: transparent;
      color: hsl(var(--muted-foreground));
      padding: 8px 10px;
      border-radius: 10px;
      font-size: 13px;
      cursor: pointer;
      white-space: nowrap;
    }
    .seg button[aria-pressed="true"] {
      background: hsl(var(--background));
      color: hsl(var(--foreground));
    }
    .previewframe {
      width: 100%;
      height: min(78vh, 720px);
      border: 0;
      background: hsl(var(--background));
    }

    footer {
      padding: 32px 0 48px;
      color: hsl(var(--muted-foreground));
      border-top: 1px solid hsl(var(--border));
      margin-top: 40px;
    }
    .footer-inner {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      font-size: 13px;
    }
    .footer-left {
      max-width: 520px;
    }
    .footer-left a {
      color: hsl(var(--foreground));
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    .footer-social {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .footer-icon {
      width: 24px;
      height: 24px;
      border-radius: 999px;
      border: 1px solid hsl(var(--border));
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: hsl(var(--foreground));
      text-decoration: none;
      background: hsl(var(--card));
    }
    .footer-icon:hover {
      background: hsl(var(--muted));
    }
    .footer-icon svg {
      width: 14px;
      height: 14px;
      stroke-width: 1.6;
      stroke: currentColor;
      fill: none;
    }

    .sr { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
  </style>
</head>
<body>
  ${renderHeader()}

  <main>
    ${page === "home" ? `
    <section id="getting-started">
      <div class="wrap">
        <div class="landing-hero">
          <div>
            <div class="landing-pill">
              <span class="dot"></span>
              <span>View latest updates</span>
            </div>
            <h1 class="landing-title">Build once. Share everywhere.</h1>
            <p class="landing-subtitle">
              Purity is a theme‑aware React design system powered by Storybook and Tailwind. Ship consistent,
              on‑brand experiences across every product surface.
            </p>
            <div class="landing-actions">
              <a class="btn primary" href="${basePath}components/">Browse components</a>
              <a class="btn" href="${storybookPath}">Open Storybook</a>
              <span style="font-size:12px; color:hsl(var(--muted-foreground));">
                No copy‑paste UI kits — real, production‑ready code.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="theme-playground">
      <div class="wrap">
        <h2>Theme playground</h2>
        <p class="lead" style="margin:0 0 14px;">
          Dial in mode, accent, radius, density, and motion. Copy a shareable URL or export theme values.
        </p>

        <div class="card">
          <div class="inner" style="display:flex; flex-direction:column; gap:12px;">
            <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
              <button class="btn primary" type="button">Primary</button>
              <button class="btn" type="button">Secondary</button>
              <button class="btn" type="button" disabled style="opacity:.6; cursor:not-allowed;">Disabled</button>
              <span style="flex:1"></span>
              <button class="btn" id="copyThemeLink" type="button">Copy theme link</button>
            </div>

            <div style="display:grid; grid-template-columns: 1fr; gap:12px;">
              <div>
                <div style="font-family:var(--mono); font-size:12px; color:hsl(var(--muted-foreground)); margin-bottom:6px;">Theme JSON</div>
                <div class="code" style="margin-top:0;"><code id="themeJson"></code></div>
              </div>
              <div>
                <div style="font-family:var(--mono); font-size:12px; color:hsl(var(--muted-foreground)); margin-bottom:6px;">Theme CSS</div>
                <div class="code" style="margin-top:0;"><code id="themeCss"></code></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="ai">
      <div class="wrap">
        <h2>AI components</h2>
        <p class="lead" style="margin:0 0 14px;">
          Curated primitives for agentic UI: chat, tool calls, timelines, approvals, and safety.
        </p>
        <div class="kgrid">
          <div class="kcard">
            <h3>Chat primitives</h3>
            <div class="desc">Message rendering, composition, attachments, citations, streaming and actions.</div>
            <div class="links">
              ${["ChatMessage", "ChatMessageList", "ChatComposer", "AttachmentPicker", "Citation", "MessageActions", "StreamingIndicator", "ErrorBanner"]
                .map((n) => `<a class="chiplink" href="${hrefForComponentName(n)}">${n}</a>`)
                .join("")}
            </div>
          </div>
          <div class="kcard">
            <h3>Agent run surfaces</h3>
            <div class="desc">Tool calls/results, timelines and approvals, model selection, usage and safety.</div>
            <div class="links">
              ${["ToolCallCard", "RunTimeline", "ApprovalCard", "ArtifactPanel", "ConversationList", "ModelSelector", "TokenUsageMeter", "SafetyNotice"]
                .map((n) => `<a class="chiplink" href="${hrefForComponentName(n)}">${n}</a>`)
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </section>

    ` : ``}

    ${page === "components" ? `
    <section id="components" style="padding-top: 80px;">
      <div class="wrap components-layout">
        <div class="components-sidebar">
          <div class="sidebar-inner">
            ${(() => {
              const grouped = groupComponentsByCategory(components);
              // Sort letters alphabetically
              const letters = Object.keys(grouped).sort();
              return letters
                .map(
                  (letter) => `
                <div class="sidebar-group" data-category="${letter.toLowerCase()}">
                  <button class="sidebar-group-header" type="button" aria-expanded="true" data-group="${letter.toLowerCase()}">
                    <span class="sidebar-group-title">${letter}</span>
                    <span class="sidebar-group-count">${grouped[letter].length}</span>
                    <svg class="sidebar-group-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </button>
                  <div class="sidebar-group-content">
                    ${grouped[letter]
                      .map(
                        (c) => `
                      <a class="sidebar-item" href="${c.detailHref}" data-name="${c.name.toLowerCase()}" data-title="${c.title.toLowerCase()}">
                        <span class="sidebar-item-text">${c.name}</span>
                      </a>`
                      )
                      .join("\n")}
                  </div>
                </div>`
                )
                .join("\n");
            })()}
          </div>
        </div>
        <div class="components-content">
          <div class="components-content-wrapper">
            <div class="components-content-inner">
              <div class="docs-nav">
                <button class="docs-nav-btn" type="button" id="docsNavCopy" aria-label="Copy">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copy
                </button>
                <button class="docs-nav-btn" type="button" id="docsNavPage" aria-label="Page">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Page
                </button>
                <button class="docs-nav-btn" type="button" id="docsNavPrev" aria-label="Previous">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  Previous
                </button>
                <button class="docs-nav-btn" type="button" id="docsNavNext" aria-label="Next">
                  Next
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
              <nav class="components-breadcrumb" aria-label="Breadcrumb">
                <div class="components-breadcrumb-inner">
                  <span class="components-breadcrumb-item">Components</span>
                  <span class="components-breadcrumb-separator" aria-hidden="true">/</span>
                  <span class="components-breadcrumb-current" id="breadcrumbCurrent">All</span>
                </div>
              </nav>
              <div class="component-header">
                <div class="component-header-top">
                  <h1 class="component-name" id="componentName">Components</h1>
                  <div class="component-actions">
                    <div class="dropdown-wrapper" id="copyDropdownWrapper">
                      <button class="component-action-btn dropdown-btn" type="button" id="copyComponentBtn" aria-label="Copy component" aria-haspopup="true" aria-expanded="false">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Copy
                        <svg class="dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                      <div class="dropdown-menu" id="copyDropdownMenu" role="menu" aria-orientation="vertical">
                        <button class="dropdown-item" type="button" role="menuitem" data-action="copy">Copy</button>
                        <button class="dropdown-item" type="button" role="menuitem" data-action="markdown">View as Markdown</button>
                        <button class="dropdown-item" type="button" role="menuitem" data-action="v0">Open in v0</button>
                        <button class="dropdown-item" type="button" role="menuitem" data-action="chatgpt">Open in ChatGPT</button>
                        <button class="dropdown-item" type="button" role="menuitem" data-action="claude">Open in Claude</button>
                        <button class="dropdown-item" type="button" role="menuitem" data-action="scira">Open in Scira</button>
                      </div>
                    </div>
                    <div class="dropdown-wrapper" id="pageDropdownWrapper">
                      <button class="component-action-btn dropdown-btn" type="button" id="pageComponentBtn" aria-label="Open in new page" aria-haspopup="true" aria-expanded="false">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Page
                        <svg class="dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                      <div class="dropdown-menu" id="pageDropdownMenu" role="menu" aria-orientation="vertical">
                        <button class="dropdown-item" type="button" role="menuitem" data-action="page">Open in new page</button>
                        <button class="dropdown-item" type="button" role="menuitem" data-action="markdown">View as Markdown</button>
                        <button class="dropdown-item" type="button" role="menuitem" data-action="v0">Open in v0</button>
                        <button class="dropdown-item" type="button" role="menuitem" data-action="chatgpt">Open in ChatGPT</button>
                        <button class="dropdown-item" type="button" role="menuitem" data-action="claude">Open in Claude</button>
                        <button class="dropdown-item" type="button" role="menuitem" data-action="scira">Open in Scira</button>
                      </div>
                    </div>
                  </div>
                </div>
                <p class="component-description" id="componentDescription">
                  Browse and explore all available components. Click a component from the sidebar to view its details.
                </p>
                <div class="component-tabs">
                  <button class="component-tab active" type="button" data-tab="docs">Docs</button>
                  <button class="component-tab" type="button" data-tab="api">API Reference</button>
                </div>
              </div>
              <h1 class="components-title" style="display:none;">Components</h1>
              <p class="components-description" style="display:none;">
                This index is generated from Storybook story titles. Click a component to jump directly to its docs.
              </p>
              <div class="components-search-wrapper">
                <label class="sr" for="componentSearch">Search components</label>
                <input class="components-search" id="componentSearch" type="search" placeholder="Search components…" autocomplete="off" />
              </div>
            </div>
            <div class="component-header-nav">
              <button class="component-nav-btn" type="button" id="prevComponentBtn" aria-label="Previous component">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Previous
              </button>
              <button class="component-nav-btn" type="button" id="nextComponentBtn" aria-label="Next component">
                Next
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="atomic-sidebar">
          <div class="atomic-sidebar-inner">
            <div class="atomic-sidebar-header">
              <h3 style="margin:0; font-size:14px; font-weight:600;">Atomic Variables</h3>
              <p style="margin:4px 0 0; font-size:11px; color:hsl(var(--muted-foreground));">Customize design tokens</p>
            </div>
            <div class="atomic-controls">
              <div class="atomic-control-group">
                <label class="atomic-label">Radius</label>
                <div class="atomic-radio-group">
                  <button class="atomic-radio" data-radius="sm" type="button">SM</button>
                  <button class="atomic-radio" data-radius="md" type="button">MD</button>
                  <button class="atomic-radio" data-radius="lg" type="button">LG</button>
                </div>
              </div>
              <div class="atomic-control-group">
                <label class="atomic-label">Density</label>
                <div class="atomic-radio-group">
                  <button class="atomic-radio" data-density="compact" type="button">Compact</button>
                  <button class="atomic-radio" data-density="comfortable" type="button">Comfortable</button>
                </div>
              </div>
              <div class="atomic-control-group">
                <label class="atomic-label">Accent Color</label>
                <div class="atomic-color-grid">
                  <button class="atomic-color" data-color="neutral" type="button" title="Neutral">
                    <span style="background: hsl(240 5.9% 10%);"></span>
                  </button>
                  <button class="atomic-color" data-color="blue" type="button" title="Blue">
                    <span style="background: hsl(221 83% 53%);"></span>
                  </button>
                  <button class="atomic-color" data-color="emerald" type="button" title="Emerald">
                    <span style="background: hsl(142 71% 45%);"></span>
                  </button>
                  <button class="atomic-color" data-color="rose" type="button" title="Rose">
                    <span style="background: hsl(346 77% 50%);"></span>
                  </button>
                  <button class="atomic-color" data-color="amber" type="button" title="Amber">
                    <span style="background: hsl(45 93% 47%);"></span>
                  </button>
                </div>
              </div>
              <div class="atomic-control-group">
                <label class="atomic-label">Spacing Scale</label>
                <div class="atomic-slider-group">
                  <input type="range" id="spacingScale" min="0.8" max="1.2" step="0.05" value="1" class="atomic-slider" />
                  <span class="atomic-slider-value" id="spacingValue">1.0x</span>
                </div>
              </div>
              <div class="atomic-control-group">
                <label class="atomic-label">Font Size</label>
                <div class="atomic-slider-group">
                  <input type="range" id="fontScale" min="0.9" max="1.1" step="0.05" value="1" class="atomic-slider" />
                  <span class="atomic-slider-value" id="fontValue">1.0x</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>` : ``}
  </main>

  <footer>
    <div class="wrap footer-inner">
      <div class="footer-left">
        <div>© ${new Date().getFullYear()} Purity Design System</div>
        <div style="margin-top:6px;">
          Built by <strong>Gagan Malik</strong>. The source code is available on
          <a href="https://github.com/gagan-malik/purity-design-system" target="_blank" rel="noreferrer">GitHub</a>.
        </div>
        <div style="margin-top:6px; font-family:var(--mono); font-size:12px;">
          Storybook mounted at: ${storybookPath}
        </div>
      </div>
      <div class="footer-social" aria-label="Social links">
        <a class="footer-icon" href="https://www.linkedin.com/in/gaganmalik" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <!-- Lucide LinkedIn -->
          <svg viewBox="0 0 24 24">
            <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-6a6 6 0 0 1 6-6Z"></path>
            <rect x="2" y="9" width="4" height="11"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </a>
        <a class="footer-icon" href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
          <!-- Lucide YouTube -->
          <svg viewBox="0 0 24 24">
            <path d="M2.5 8.5A3.5 3.5 0 0 1 5.96 5h12.08A3.5 3.5 0 0 1 21.5 8.5v7a3.5 3.5 0 0 1-3.46 3.5H5.96A3.5 3.5 0 0 1 2.5 15.5Z"></path>
            <path d="m10 9 5 3-5 3Z"></path>
          </svg>
        </a>
        <a class="footer-icon" href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
          <!-- Lucide X -->
          <svg viewBox="0 0 24 24">
            <path d="M18 2 11 13"></path>
            <path d="M5 2l7 11 5 9"></path>
            <path d="M2 9h7"></path>
            <path d="M15 9h7"></path>
          </svg>
        </a>
        <a class="footer-icon" href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
          <!-- Lucide Instagram -->
          <svg viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="5"></rect>
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M17.5 6.5h.01"></path>
          </svg>
        </a>
      </div>
    </div>
  </footer>

  <!-- Command palette (Cmd/Ctrl+K) -->
  <div id="cmdk" style="display:none;">
    <div id="cmdkOverlay" style="position:fixed; inset:0; background:transparent; z-index:50;"></div>
    <div style="position:fixed; inset:0; z-index:60; display:flex; align-items:flex-start; justify-content:center; padding:72px 16px;">
      <div style="width:min(760px, 100%); border:1px solid hsl(var(--border)); background:hsl(var(--background)); border-radius:var(--radius); box-shadow:0 24px 72px rgba(0,0,0,.24); overflow:hidden;">
        <div style="padding:12px; border-bottom:1px solid hsl(var(--border)); display:flex; gap:10px; align-items:center;">
          <span style="font-family:var(--mono); font-size:12px; color:hsl(var(--muted-foreground));">Search</span>
          <input id="cmdkInput" type="search" placeholder="Type a component name…" autocomplete="off" style="flex:1; border:0; outline:none; font-size:14px; background:transparent; color:hsl(var(--foreground));" />
          <span style="font-family:var(--mono); font-size:12px; color:hsl(var(--muted-foreground));">Esc</span>
        </div>
        <div id="cmdkList" style="max-height:420px; overflow:auto;"></div>
      </div>
    </div>
  </div>

  <script>
    (function () {
      const key = "purity-site-theme"; // stores mode: light|dark|system
      const colorKey = "purity-site-color";
      const radiusKey = "purity-site-radius";
      const densityKey = "purity-site-density";
      const motionKey = "purity-site-motion";
      const root = document.documentElement;
      const modeButtons = Array.from(document.querySelectorAll("[data-mode]"));
      const modeToggleButton = document.getElementById("modeToggleButton");
      const modeToggleLabel = document.getElementById("modeToggleLabel");
      const themeSelectRoot = document.getElementById("themeSelectRoot");
      const themeSelectBtn = document.getElementById("theme-selector");
      const themeMenu = document.getElementById("themeMenu");
      const themeValue = document.getElementById("themeValue");
      const select = document.getElementById("componentSelect");
      const frame = document.getElementById("previewFrame");
      const open = document.getElementById("openInStorybook");
      const previewKey = "purity-preview-theme";
      const previewButtons = Array.from(document.querySelectorAll(".segbtn"));
      const componentSearch = document.getElementById("componentSearch");
      const navSearchInput = document.getElementById("navSearchInput");
      const copyThemeLink = document.getElementById("copyThemeLink");
      const themeJson = document.getElementById("themeJson");
      const themeCss = document.getElementById("themeCss");

      const cmdk = document.getElementById("cmdk");
      const cmdkOverlay = document.getElementById("cmdkOverlay");
      const cmdkInput = document.getElementById("cmdkInput");
      const cmdkList = document.getElementById("cmdkList");
      const githubStars = document.getElementById("githubStars");

      // Fetch GitHub watchers count
      if (githubStars) {
        fetch("https://api.github.com/repos/gagan-malik/purity-design-system")
          .then((response) => response.json())
          .then((data) => {
            if (data.subscribers_count !== undefined) {
              const watchers = data.subscribers_count;
              // Format the number (e.g., 1234 -> "1.2k", 123 -> "123")
              let formatted = watchers.toString();
              if (watchers >= 1000) {
                formatted = (watchers / 1000).toFixed(1).replace(/\.0$/, "") + "k";
              }
              githubStars.textContent = formatted;
            }
          })
          .catch((error) => {
            console.error("Failed to fetch GitHub watchers:", error);
            githubStars.textContent = "—";
          });
      }

      function applyMode(mode) {
        try {
          // mode: light|dark|system
          let effective = mode;
          if (mode === "system" && window.matchMedia) {
            effective = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
          }
          
          // Apply theme attribute to html element
          if (effective === "dark") {
            root.setAttribute("data-theme", "dark");
          } else {
            root.removeAttribute("data-theme");
          }
          
          // Force a reflow to ensure CSS updates
          void root.offsetHeight;
          
          // reflect pressed state
          if (modeButtons && modeButtons.length > 0) {
            modeButtons.forEach((b) => {
              if (b && b.dataset) {
                b.setAttribute("aria-pressed", b.dataset.mode === mode ? "true" : "false");
              }
            });
          }
          
          // Update toggle button label
          if (modeToggleLabel) {
            modeToggleLabel.textContent = effective === "dark" ? "Dark" : "Light";
          }
          
          if (typeof updateThemeOutputs === "function") {
            updateThemeOutputs();
          }
        } catch (error) {
          console.error("Error applying mode:", mode, error);
        }
      }

      function titleForColor(c) {
        switch (c) {
          case "blue": return "Blue";
          case "emerald": return "Emerald";
          case "rose": return "Rose";
          case "amber": return "Amber";
          case "neutral":
          default: return "Neutral";
        }
      }

      function applyColor(color) {
        root.setAttribute("data-color", color);
        if (themeValue) themeValue.textContent = titleForColor(color);
        localStorage.setItem(colorKey, color);
        if (!themeMenu) return;
        themeMenu.querySelectorAll("[data-color]").forEach((el) => {
          const isSelected = el.getAttribute("data-color") === color;
          el.setAttribute("aria-selected", String(isSelected));
          const mark = el.querySelector("span[aria-hidden='true']");
          if (mark) mark.textContent = isSelected ? "✓" : "";
        });
        updateThemeOutputs();
      }

      function setThemeMenuOpen(open) {
        if (!themeSelectRoot || !themeSelectBtn) return;
        themeSelectRoot.setAttribute("data-open", open ? "true" : "false");
        themeSelectBtn.setAttribute("aria-expanded", open ? "true" : "false");
      }

      function isThemeMenuOpen() {
        return themeSelectRoot?.getAttribute("data-open") === "true";
      }

      function applyRadius(r) {
        root.setAttribute("data-radius", r);
        localStorage.setItem(radiusKey, r);
        updateThemeOutputs();
      }

      function applyDensity(d) {
        root.setAttribute("data-density", d);
        localStorage.setItem(densityKey, d);
        updateThemeOutputs();
      }

      function applyMotion(m) {
        root.setAttribute("data-motion", m);
        localStorage.setItem(motionKey, m);
        updateThemeOutputs();
      }

      function readCurrentSettings() {
        return {
          mode: localStorage.getItem(key) || "system",
          color: localStorage.getItem(colorKey) || "neutral",
          radius: localStorage.getItem(radiusKey) || "md",
          density: localStorage.getItem(densityKey) || "comfortable",
          motion: localStorage.getItem(motionKey) || "full",
        };
      }

      function updateThemeOutputs() {
        if (!themeJson && !themeCss) return;
        const s = readCurrentSettings();
        const computed = getComputedStyle(document.documentElement);
        const primary = computed.getPropertyValue("--primary").trim();
        const ring = computed.getPropertyValue("--ring").trim();
        const radius = computed.getPropertyValue("--radius").trim();
        const density = computed.getPropertyValue("--density").trim();

        const json = {
          mode: s.mode,
          accent: s.color,
          radius: s.radius,
          density: s.density,
          motion: s.motion,
          tokens: { primary, ring, radius, density },
        };

        if (themeJson) themeJson.textContent = JSON.stringify(json, null, 2);

        const css = [
          ":root {",
          "  --radius: " + radius + ";",
          "  --density: " + density + ";",
          "}",
          ':root[data-color="' + s.color + '"] {',
          "  --primary: " + primary + ";",
          "  --ring: " + ring + ";",
          "}",
        ].join("\\n");
        if (themeCss) themeCss.textContent = css;
      }

      function copyText(text) {
        if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        return Promise.resolve();
      }

      function themeShareUrl() {
        const s = readCurrentSettings();
        const u = new URL(window.location.href);
        u.searchParams.set("mode", s.mode);
        u.searchParams.set("color", s.color);
        u.searchParams.set("radius", s.radius);
        u.searchParams.set("density", s.density);
        u.searchParams.set("motion", s.motion);
        return u.toString();
      }

      function withGlobals(href, previewTheme) {
        try {
          const url = new URL(href, window.location.origin);
          const s = readCurrentSettings();
          // Storybook expects globals like: globals=theme:dark;accent:blue;radius:md;density:comfortable;motion:full
          url.searchParams.set(
            "globals",
            "theme:" +
              previewTheme +
              ";accent:" +
              s.color +
              ";radius:" +
              s.radius +
              ";density:" +
              s.density +
              ";motion:" +
              s.motion
          );
          return url.toString();
        } catch {
          // Fallback: best-effort append
          const sep = href.includes("?") ? "&" : "?";
          const s = readCurrentSettings();
          return (
            href +
            sep +
            "globals=theme:" +
            previewTheme +
            ";accent:" +
            s.color +
            ";radius:" +
            s.radius +
            ";density:" +
            s.density +
            ";motion:" +
            s.motion
          );
        }
      }

      function setPreviewTheme(next) {
        localStorage.setItem(previewKey, next);
        previewButtons.forEach((b) => {
          b.setAttribute("aria-pressed", b.dataset.previewTheme === next ? "true" : "false");
        });
        // refresh current preview url
        const href = select?.value || "${defaultPreviewHref}";
        const themed = withGlobals(href, next);
        if (frame) frame.src = themed;
        if (open) open.href = themed;
      }

      // URL params (shareable)
      const url = new URL(window.location.href);
      const qpMode = url.searchParams.get("mode");
      const qpColor = url.searchParams.get("color");
      const qpRadius = url.searchParams.get("radius");
      const qpDensity = url.searchParams.get("density");
      const qpMotion = url.searchParams.get("motion");

      const stored = qpMode || localStorage.getItem(key) || "dark";
      const mode = stored === "dark" || stored === "light" || stored === "system" ? stored : "dark";
      localStorage.setItem(key, mode);
      applyMode(mode);

      // React to system changes when in system mode
      if (mode === "system" && window.matchMedia) {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const onChange = () => applyMode("system");
        mq.addEventListener?.("change", onChange);
      }

      const storedColor = qpColor || localStorage.getItem(colorKey) || "neutral";
      applyColor(storedColor);
      setThemeMenuOpen(false);

      const storedRadius = qpRadius || localStorage.getItem(radiusKey) || "md";
      applyRadius(["sm", "md", "lg"].includes(storedRadius) ? storedRadius : "md");

      const storedDensity = qpDensity || localStorage.getItem(densityKey) || "comfortable";
      applyDensity(storedDensity === "compact" ? "compact" : "comfortable");

      const storedMotion = qpMotion || localStorage.getItem(motionKey) || "full";
      applyMotion(storedMotion === "reduced" ? "reduced" : "full");
      updateThemeOutputs();

      const storedPreview = localStorage.getItem(previewKey);
      if (storedPreview === "light" || storedPreview === "dark" || storedPreview === "system") {
        setPreviewTheme(storedPreview);
      } else {
        setPreviewTheme("system");
      }

      modeButtons.forEach((b) => {
        b.addEventListener("click", () => {
          const next = b.dataset.mode;
          if (!next) return;
          localStorage.setItem(key, next);
          applyMode(next);
        });
      });

      // Mode toggle button handler
      if (modeToggleButton) {
        modeToggleButton.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          // Get current theme state
          const html = document.documentElement;
          const isCurrentlyDark = html.getAttribute("data-theme") === "dark";
          
          // Determine next theme
          const nextTheme = isCurrentlyDark ? "light" : "dark";
          
          // Apply theme directly
          if (nextTheme === "dark") {
            html.setAttribute("data-theme", "dark");
          } else {
            html.removeAttribute("data-theme");
          }
          
          // Update label
          if (modeToggleLabel) {
            modeToggleLabel.textContent = nextTheme === "dark" ? "Dark" : "Light";
          }
          
          // Save to localStorage
          localStorage.setItem(key, nextTheme);
          
          // Sync with Storybook preview if available
          if (typeof setPreviewTheme === "function") {
            setPreviewTheme(nextTheme);
          }
          
          // Update theme outputs if available
          if (typeof updateThemeOutputs === "function") {
            updateThemeOutputs();
          }
        };
      }

      themeSelectBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        setThemeMenuOpen(!isThemeMenuOpen());
      });

      themeSelectBtn?.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setThemeMenuOpen(!isThemeMenuOpen());
        }
        if (e.key === "Escape") {
          setThemeMenuOpen(false);
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setThemeMenuOpen(true);
          const first = themeMenu?.querySelector("[data-color]");
          first?.focus?.();
        }
      });

      themeMenu?.addEventListener("click", (e) => {
        const target = e.target?.closest?.("[data-color]");
        const color = target?.getAttribute?.("data-color");
        if (!color) return;
        applyColor(color);
        setThemeMenuOpen(false);
        themeSelectBtn?.focus?.();
      });

      document.addEventListener("click", (e) => {
        if (!isThemeMenuOpen()) return;
        const inside = themeSelectRoot?.contains?.(e.target);
        if (!inside) setThemeMenuOpen(false);
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isThemeMenuOpen()) setThemeMenuOpen(false);
      });

      copyThemeLink?.addEventListener("click", async () => {
        await copyText(themeShareUrl());
      });

      select?.addEventListener("change", () => {
        const href = select.value;
        const previewTheme = localStorage.getItem(previewKey) || "system";
        const themed = withGlobals(href, previewTheme);
        if (frame) frame.src = themed;
        if (open) open.href = themed;
      });

      previewButtons.forEach((b) => {
        b.addEventListener("click", () => {
          const next = b.dataset.previewTheme;
          if (!next) return;
          setPreviewTheme(next);
        });
      });

      const breadcrumbCurrent = document.getElementById("breadcrumbCurrent");
      const componentNameEl = document.getElementById("componentName");
      const componentDescriptionEl = document.getElementById("componentDescription");
      const copyComponentBtn = document.getElementById("copyComponentBtn");
      const pageComponentBtn = document.getElementById("pageComponentBtn");
      const prevComponentBtn = document.getElementById("prevComponentBtn");
      const nextComponentBtn = document.getElementById("nextComponentBtn");
      const componentTabs = document.querySelectorAll(".component-tab");
      
      let currentComponent = null;
      let allComponents = [];
      let currentTab = "docs"; // Track the currently selected tab
      
      // Initialize component list
      document.querySelectorAll("a.sidebar-item").forEach((item) => {
        const name = item.querySelector(".sidebar-item-text")?.textContent || item.getAttribute("data-name") || "";
        const href = item.getAttribute("href") || "";
        allComponents.push({ name, href, element: item });
      });
      
      function updateBreadcrumb(componentName, tab) {
        if (breadcrumbCurrent) {
          const activeTab = tab || currentTab;
          if (componentName && componentName !== "All") {
            // Show component name and selected tab
            const tabLabel = activeTab === "docs" ? "Docs" : "API Reference";
            breadcrumbCurrent.textContent = componentName + " - " + tabLabel;
          } else {
            // Show just the selected tab when no component is selected
            const tabLabel = activeTab === "docs" ? "Docs" : "API Reference";
            breadcrumbCurrent.textContent = tabLabel;
          }
        }
      }

      function updateComponentHeader(component) {
        currentComponent = component;
        if (component) {
          const name = component.name || "Component";
          const description = "A vertically stacked set of interactive headings that each reveal a section of content.";
          
          if (componentNameEl) {
            componentNameEl.textContent = name;
          }
          if (componentDescriptionEl) {
            componentDescriptionEl.textContent = description;
          }
          updateBreadcrumb(name, currentTab);
          
          // Update navigation buttons
          const currentIndex = allComponents.findIndex(c => c.name === name);
          if (prevComponentBtn) {
            prevComponentBtn.disabled = currentIndex <= 0;
            if (docsNavPrev) {
              docsNavPrev.disabled = currentIndex <= 0;
            }
            if (currentIndex > 0) {
              prevComponentBtn.onclick = () => {
                const prev = allComponents[currentIndex - 1];
                if (prev?.element) prev.element.click();
              };
            }
          }
          if (nextComponentBtn) {
            nextComponentBtn.disabled = currentIndex >= allComponents.length - 1;
            if (docsNavNext) {
              docsNavNext.disabled = currentIndex >= allComponents.length - 1;
            }
            if (currentIndex < allComponents.length - 1) {
              nextComponentBtn.onclick = () => {
                const next = allComponents[currentIndex + 1];
                if (next?.element) next.element.click();
              };
            }
          }
          
          // Action buttons are now handled by dropdown menus
          // The dropdown handlers will use currentComponent
        } else {
          if (componentNameEl) {
            componentNameEl.textContent = "Components";
          }
          if (componentDescriptionEl) {
            componentDescriptionEl.textContent = "Browse and explore all available components. Click a component from the sidebar to view its details.";
          }
          updateBreadcrumb("All", currentTab);
        }
      }

      // Dropdown functionality
      const copyDropdownWrapper = document.getElementById("copyDropdownWrapper");
      const pageDropdownWrapper = document.getElementById("pageDropdownWrapper");
      const copyDropdownMenu = document.getElementById("copyDropdownMenu");
      const pageDropdownMenu = document.getElementById("pageDropdownMenu");

      function setDropdownOpen(wrapper, isOpen) {
        if (wrapper) {
          wrapper.setAttribute("data-open", isOpen ? "true" : "false");
          const btn = wrapper.querySelector(".dropdown-btn");
          if (btn) {
            btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
          }
        }
      }

      function isDropdownOpen(wrapper) {
        return wrapper?.getAttribute("data-open") === "true";
      }

      function closeAllDropdowns() {
        setDropdownOpen(copyDropdownWrapper, false);
        setDropdownOpen(pageDropdownWrapper, false);
      }

      // Copy dropdown
      if (copyComponentBtn) {
        copyComponentBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const isOpen = isDropdownOpen(copyDropdownWrapper);
          closeAllDropdowns();
          if (!isOpen) {
            setDropdownOpen(copyDropdownWrapper, true);
          }
        });
      }

      // Page dropdown
      if (pageComponentBtn) {
        pageComponentBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const isOpen = isDropdownOpen(pageDropdownWrapper);
          closeAllDropdowns();
          if (!isOpen) {
            setDropdownOpen(pageDropdownWrapper, true);
          }
        });
      }

      // Handle dropdown menu item clicks
      function handleDropdownAction(action, component) {
        const name = component?.name || "Component";
        const href = component?.href || "";
        
        switch (action) {
          case "copy":
            if (component) {
              copyText(name);
            }
            break;
          case "page":
            if (href) {
              window.open(href, "_blank");
            }
            break;
          case "markdown":
            // View as Markdown - could open a markdown view or copy markdown
            if (component) {
              const markdown = "# " + name + "\n\n" + (component.description || "Component description");
              copyText(markdown);
            }
            break;
          case "v0":
            // Open in v0 - placeholder URL
            if (component) {
              window.open("https://v0.dev/component/" + encodeURIComponent(name), "_blank");
            }
            break;
          case "chatgpt":
            // Open in ChatGPT - placeholder
            if (component) {
              const prompt = "Show me the code for " + name + " component";
              window.open("https://chat.openai.com/?q=" + encodeURIComponent(prompt), "_blank");
            }
            break;
          case "claude":
            // Open in Claude - placeholder
            if (component) {
              const prompt = "Show me the code for " + name + " component";
              window.open("https://claude.ai/?q=" + encodeURIComponent(prompt), "_blank");
            }
            break;
          case "scira":
            // Open in Scira - placeholder
            if (component) {
              window.open("https://scira.ai/component/" + encodeURIComponent(name), "_blank");
            }
            break;
        }
        closeAllDropdowns();
      }

      // Copy dropdown menu items
      if (copyDropdownMenu) {
        copyDropdownMenu.addEventListener("click", (e) => {
          const item = e.target.closest(".dropdown-item");
          if (item) {
            const action = item.getAttribute("data-action");
            handleDropdownAction(action, currentComponent);
          }
        });
      }

      // Page dropdown menu items
      if (pageDropdownMenu) {
        pageDropdownMenu.addEventListener("click", (e) => {
          const item = e.target.closest(".dropdown-item");
          if (item) {
            const action = item.getAttribute("data-action");
            handleDropdownAction(action, currentComponent);
          }
        });
      }

      // Close dropdowns when clicking outside
      document.addEventListener("click", (e) => {
        if (!copyDropdownWrapper?.contains(e.target) && !pageDropdownWrapper?.contains(e.target)) {
          closeAllDropdowns();
        }
      });

      // Close dropdowns on Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          closeAllDropdowns();
        }
      });

      // Wire up docs-nav buttons to use same functionality
      const docsNavCopy = document.getElementById("docsNavCopy");
      const docsNavPage = document.getElementById("docsNavPage");
      const docsNavPrev = document.getElementById("docsNavPrev");
      const docsNavNext = document.getElementById("docsNavNext");

      if (docsNavCopy && copyComponentBtn) {
        docsNavCopy.addEventListener("click", () => {
          copyComponentBtn.click();
        });
      }
      if (docsNavPage && pageComponentBtn) {
        docsNavPage.addEventListener("click", () => {
          pageComponentBtn.click();
        });
      }
      if (docsNavPrev && prevComponentBtn) {
        docsNavPrev.addEventListener("click", () => {
          prevComponentBtn.click();
        });
      }
      if (docsNavNext && nextComponentBtn) {
        docsNavNext.addEventListener("click", () => {
          nextComponentBtn.click();
        });
      }

      // Tab switching
      componentTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          componentTabs.forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");
          const tabType = tab.getAttribute("data-tab");
          currentTab = tabType || "docs";
          // Update breadcrumb with the new tab
          if (currentComponent) {
            updateBreadcrumb(currentComponent.name, currentTab);
          } else {
            updateBreadcrumb("All", currentTab);
          }
        });
      });

      componentSearch?.addEventListener("input", () => {
        const q = (componentSearch.value || "").trim().toLowerCase();
        const items = Array.from(document.querySelectorAll("a.sidebar-item"));
        for (const el of items) {
          const name = el.getAttribute("data-name") || "";
          const title = el.getAttribute("data-title") || "";
          const show = !q || name.includes(q) || title.includes(q);
          el.style.display = show ? "" : "none";
        }
        // Auto-expand groups that have visible items
        document.querySelectorAll(".sidebar-group").forEach((group) => {
          const visibleItems = group.querySelectorAll("a.sidebar-item[style=''], a.sidebar-item:not([style*='none'])");
          if (visibleItems.length > 0) {
            group.setAttribute("data-collapsed", "false");
            group.querySelector(".sidebar-group-header")?.setAttribute("aria-expanded", "true");
          }
        });
        // Update breadcrumb based on search
        if (q) {
          const visibleItems = Array.from(document.querySelectorAll("a.sidebar-item[style=''], a.sidebar-item:not([style*='none'])"));
          if (visibleItems.length === 1) {
            const item = visibleItems[0];
            const name = item.querySelector(".sidebar-item-text")?.textContent || item.getAttribute("data-name") || "";
            updateBreadcrumb(name, currentTab);
          } else {
            updateBreadcrumb("Search results", currentTab);
          }
        } else {
          updateBreadcrumb("All", currentTab);
        }
      });

      // Update breadcrumb and component header when sidebar items are clicked
      document.querySelectorAll("a.sidebar-item").forEach((item) => {
        item.addEventListener("click", (e) => {
          // Allow Ctrl/Cmd+click to open in new tab, otherwise update UI
          if (e.ctrlKey || e.metaKey) {
            return; // Let default behavior happen (open in new tab)
          }
          
          e.preventDefault();
          e.stopPropagation();
          
          const name = item.querySelector(".sidebar-item-text")?.textContent || item.getAttribute("data-name") || "";
          const href = item.getAttribute("href") || "";
          
          // Try to find component by exact name match first
          let component = allComponents.find(c => c.name === name);
          
          // If not found, try case-insensitive match
          if (!component) {
            component = allComponents.find(c => c.name.toLowerCase() === name.toLowerCase());
          }
          
          if (component) {
            // Update component with href
            component.href = href;
            updateComponentHeader(component);
          } else {
            // Create a temporary component object for display
            const tempComponent = { name: name, href: href, element: item };
            updateComponentHeader(tempComponent);
          }
        });
      });

      // Collapsible sidebar groups
      document.querySelectorAll(".sidebar-group-header").forEach((header) => {
        header.addEventListener("click", () => {
          const group = header.closest(".sidebar-group");
          const isCollapsed = group?.getAttribute("data-collapsed") === "true";
          group?.setAttribute("data-collapsed", isCollapsed ? "false" : "true");
          header.setAttribute("aria-expanded", isCollapsed ? "true" : "false");
        });
      });

      // Atomic variable controls
      const atomicRadiusButtons = Array.from(document.querySelectorAll(".atomic-radio[data-radius]"));
      const atomicDensityButtons = Array.from(document.querySelectorAll(".atomic-radio[data-density]"));
      const atomicColorButtons = Array.from(document.querySelectorAll(".atomic-color[data-color]"));
      const spacingScale = document.getElementById("spacingScale");
      const spacingValue = document.getElementById("spacingValue");
      const fontScale = document.getElementById("fontScale");
      const fontValue = document.getElementById("fontValue");

      // Initialize atomic controls from current settings
      const currentRadius = root.getAttribute("data-radius") || "md";
      atomicRadiusButtons.forEach((btn) => {
        if (btn.getAttribute("data-radius") === currentRadius) {
          btn.setAttribute("aria-pressed", "true");
          btn.classList.add("active");
        }
        btn.addEventListener("click", () => {
          const radius = btn.getAttribute("data-radius");
          applyRadius(radius);
          atomicRadiusButtons.forEach((b) => {
            b.setAttribute("aria-pressed", b === btn ? "true" : "false");
            b.classList.toggle("active", b === btn);
          });
        });
      });

      const currentDensity = root.getAttribute("data-density") || "comfortable";
      atomicDensityButtons.forEach((btn) => {
        if (btn.getAttribute("data-density") === currentDensity) {
          btn.setAttribute("aria-pressed", "true");
          btn.classList.add("active");
        }
        btn.addEventListener("click", () => {
          const density = btn.getAttribute("data-density");
          applyDensity(density);
          atomicDensityButtons.forEach((b) => {
            b.setAttribute("aria-pressed", b === btn ? "true" : "false");
            b.classList.toggle("active", b === btn);
          });
        });
      });

      const currentColor = root.getAttribute("data-color") || "neutral";
      atomicColorButtons.forEach((btn) => {
        if (btn.getAttribute("data-color") === currentColor) {
          btn.setAttribute("aria-pressed", "true");
          btn.classList.add("active");
        }
        btn.addEventListener("click", () => {
          const color = btn.getAttribute("data-color");
          applyColor(color);
          atomicColorButtons.forEach((b) => {
            b.setAttribute("aria-pressed", b === btn ? "true" : "false");
            b.classList.toggle("active", b === btn);
          });
        });
      });

      // Spacing scale
      if (spacingScale && spacingValue) {
        spacingScale.addEventListener("input", (e) => {
          const value = parseFloat(e.target.value);
          spacingValue.textContent = value.toFixed(2) + "x";
          root.style.setProperty("--spacing-scale", value);
          // Apply to spacing utilities if they exist
          document.querySelectorAll("[style*='gap'], [style*='padding'], [style*='margin']").forEach((el) => {
            // This is a simplified approach - in a real system you'd update CSS variables
          });
        });
      }

      // Font scale
      if (fontScale && fontValue) {
        fontScale.addEventListener("input", (e) => {
          const value = parseFloat(e.target.value);
          fontValue.textContent = value.toFixed(2) + "x";
          root.style.setProperty("--font-scale", value);
          root.style.fontSize = "calc(1rem * " + value + ")";
        });
      }

      // Top-nav search: mirrors the components search and can jump to first result.
      navSearchInput?.addEventListener("focus", () => {
        const componentsSection = document.getElementById("components");
        componentsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      function filterComponents(query) {
        const q = (query || "").trim().toLowerCase();
        const items = Array.from(document.querySelectorAll("a.sidebar-item"));
        for (const el of items) {
          const name = el.getAttribute("data-name") || "";
          const title = el.getAttribute("data-title") || "";
          const show = !q || name.includes(q) || title.includes(q);
          el.style.display = show ? "" : "none";
        }
        // Auto-expand groups that have visible items
        document.querySelectorAll(".sidebar-group").forEach((group) => {
          const visibleItems = group.querySelectorAll("a.sidebar-item[style=''], a.sidebar-item:not([style*='none'])");
          if (visibleItems.length > 0) {
            group.setAttribute("data-collapsed", "false");
            group.querySelector(".sidebar-group-header")?.setAttribute("aria-expanded", "true");
          }
        });
        return items.filter((el) => el.style.display !== "none");
      }

      navSearchInput?.addEventListener("input", () => {
        const value = navSearchInput.value || "";
        if (componentSearch) componentSearch.value = value;
        filterComponents(value);
      });

      navSearchInput?.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const value = navSearchInput.value || "";
          const visible = filterComponents(value);
          const first = visible[0];
          if (first) {
            window.location.href = first.getAttribute("href") || "#";
          }
        }
      });

      // Command palette
      function openCmdk() {
        if (!cmdk || !cmdkInput || !cmdkList) return;
        cmdk.style.display = "block";
        cmdkInput.value = "";
        renderCmdk("");
        setTimeout(() => cmdkInput.focus(), 0);
      }
      function closeCmdk() {
        if (!cmdk) return;
        cmdk.style.display = "none";
      }
      function renderCmdk(q) {
        if (!cmdkList) return;
        const query = (q || "").trim().toLowerCase();
        const links = Array.from(document.querySelectorAll("a.sidebar-item, a.comp")).map((el) => ({
          name: el.querySelector(".sidebar-item-text, .name")?.textContent || el.getAttribute("data-name") || "",
          title: el.getAttribute("data-title") || "",
          href: el.getAttribute("href") || "#",
        }));
        const filtered = links
          .filter((l) => !query || l.name.toLowerCase().includes(query) || l.title.toLowerCase().includes(query))
          .slice(0, 40);

        cmdkList.innerHTML = filtered
          .map(
            (l, i) =>
              '<a href="' +
              l.href +
              '" data-idx="' +
              i +
              '" style="display:flex; justify-content:space-between; gap:12px; padding:10px 12px; border-bottom:1px solid hsl(var(--border)); text-decoration:none;">' +
              '<div>' +
              '<div style="font-weight:600;">' +
              l.name +
              "</div>" +
              '<div style="font-size:12px; color:hsl(var(--muted-foreground));">' +
              l.title +
              "</div>" +
              "</div>" +
              '<div style="font-family:var(--mono); font-size:12px; color:hsl(var(--muted-foreground));">↵</div>' +
              "</a>"
          )
          .join("");
      }

      document.addEventListener("keydown", (e) => {
        const isK = e.key.toLowerCase() === "k";
        if ((e.metaKey || e.ctrlKey) && isK) {
          e.preventDefault();
          openCmdk();
        }
        if (e.key === "Escape" && cmdk?.style.display === "block") {
          e.preventDefault();
          closeCmdk();
        }
      });
      cmdkOverlay?.addEventListener("click", closeCmdk);
      cmdkInput?.addEventListener("input", () => renderCmdk(cmdkInput.value));
    })();
  </script>
</body>
</html>`;
}

function renderComponentDetail(component, allComponents) {
  const updated = new Date().toISOString();
  const grouped = groupComponentsByCategory(allComponents);
  
  // Sort all components alphabetically for navigation
  const sortedComponents = [...allComponents].sort((a, b) => a.name.localeCompare(b.name));

  // Find previous and next components
  const currentIndex = sortedComponents.findIndex(c => c.slug === component.slug);
  const prevComponent = currentIndex > 0 ? sortedComponents[currentIndex - 1] : null;
  const nextComponent = currentIndex < sortedComponents.length - 1 ? sortedComponents[currentIndex + 1] : null;

  return `<!doctype html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="light dark" />
  <title>${component.name} - Purity Design System</title>
  <meta name="description" content="${component.name} component documentation in Purity Design System." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
  <style>
    /* CSS will be replaced during build */
  </style>
</head>
<body>
  ${renderHeader()}

  <main>
    <section id="components" style="padding-top: 80px;">
      <div class="wrap components-layout">
        <div class="components-sidebar">
          <div class="sidebar-inner">
            ${(() => {
              // Sort letters alphabetically
              const letters = Object.keys(grouped).sort();
              return letters
                .map(
                  (letter) => `
                <div class="sidebar-group" data-category="${letter.toLowerCase()}">
                  <button class="sidebar-group-header" aria-expanded="true" data-collapsed="false">
                    <span>${letter}</span>
                    <span class="sidebar-group-count">${grouped[letter].length}</span>
                  </button>
                  <div class="sidebar-group-content">
                    ${grouped[letter]
                      .map(
                        (c) => `
                      <a class="sidebar-item ${c.slug === component.slug ? 'active' : ''}" href="${c.detailHref}" data-name="${c.name.toLowerCase()}" data-title="${c.title.toLowerCase()}">
                        <span class="sidebar-item-text">${c.name}</span>
                      </a>`
                      )
                      .join("\n")}
                  </div>
                </div>`
                )
                .join("\n");
            })()}
          </div>
        </div>
        <div class="components-content">
          <div class="components-content-wrapper">
            <div class="components-content-inner">
              <nav class="components-breadcrumb" aria-label="Breadcrumb">
                <div class="components-breadcrumb-inner">
                  <a href="${basePath}components/" class="components-breadcrumb-item">Components</a>
                  <span class="components-breadcrumb-separator" aria-hidden="true">/</span>
                  <span class="components-breadcrumb-current" id="breadcrumbCurrent">${component.name}</span>
                </div>
              </nav>
              
              <div class="component-header">
                <div class="component-header-top">
                  <h1 class="component-name" id="componentName">${component.name}</h1>
                  <div class="component-actions">
                    <div class="tooltip-wrapper">
                      <button class="component-action-btn" id="copyComponentBtn" aria-label="Copy component code">
                        Copy
                      </button>
                      <div class="tooltip-bubble" role="tooltip">Copy component code</div>
                    </div>
                    <div class="tooltip-wrapper">
                      <a href="${component.href}" target="_blank" class="component-action-btn" id="pageComponentBtn" aria-label="Open in Storybook">
                        Page
                      </a>
                      <div class="tooltip-bubble" role="tooltip">Open in Storybook</div>
                    </div>
                  </div>
                </div>
                <p class="component-description" id="componentDescription">
                  ${component.name} component from the Purity Design System. View full documentation and examples in Storybook.
                </p>
                <div class="component-tabs">
                  <button class="component-tab active" data-tab="docs">Docs</button>
                  <button class="component-tab" data-tab="api">API Reference</button>
                </div>
              </div>

              <div class="component-content">
                <div class="component-docs" id="componentDocs">
                  <h2>Overview</h2>
                  <p>The ${component.name} component is part of the ${component.category} category in the Purity Design System.</p>
                  
                  <h3>Usage</h3>
                  <p>To use this component in your project, install the design system package and import it:</p>
                  <pre><code>import { ${component.name} } from "@purity/design-system";</code></pre>
                  
                  <h3>Documentation</h3>
                  <p>For complete documentation, examples, and API reference, visit the component's Storybook page:</p>
                  <p><a href="${component.href}" target="_blank" class="btn primary">View in Storybook →</a></p>
                </div>
                
                <div class="component-api" id="componentAPI" style="display: none;">
                  <h2>API Reference</h2>
                  <p>Full API documentation is available in Storybook.</p>
                  <p><a href="${component.href}" target="_blank" class="btn primary">View API Reference →</a></p>
                </div>
              </div>
            </div>
            
            <div class="component-header-nav">
              ${prevComponent ? `<a href="${prevComponent.detailHref}" class="component-nav-btn" id="prevComponentBtn" aria-label="Previous component">← ${prevComponent.name}</a>` : '<button class="component-nav-btn" disabled aria-label="Previous component" style="opacity: 0.5; cursor: not-allowed;">← Previous</button>'}
              ${nextComponent ? `<a href="${nextComponent.detailHref}" class="component-nav-btn" id="nextComponentBtn" aria-label="Next component">${nextComponent.name} →</a>` : '<button class="component-nav-btn" disabled aria-label="Next component" style="opacity: 0.5; cursor: not-allowed;">Next →</button>'}
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <script>
    // Include the same JavaScript from the main page
    // (Mode toggle, etc.)
    const root = document.documentElement;
    const modeToggleButton = document.getElementById("modeToggleButton");
    const modeToggleLabel = document.getElementById("modeToggleLabel");
    const githubStars = document.getElementById("githubStars");
    const componentTabs = document.querySelectorAll(".component-tab");

    // Mode toggle
    if (modeToggleButton) {
      modeToggleButton.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        const html = document.documentElement;
        const isCurrentlyDark = html.getAttribute("data-theme") === "dark";
        const nextTheme = isCurrentlyDark ? "light" : "dark";
        if (nextTheme === "dark") {
          html.setAttribute("data-theme", "dark");
        } else {
          html.removeAttribute("data-theme");
        }
        if (modeToggleLabel) {
          modeToggleLabel.textContent = nextTheme === "dark" ? "Dark" : "Light";
        }
        localStorage.setItem("purity-site-mode", nextTheme);
      };
    }

    // GitHub watchers
    if (githubStars) {
      fetch("https://api.github.com/repos/gagan-malik/purity-design-system")
        .then((response) => response.json())
        .then((data) => {
          if (data.subscribers_count !== undefined) {
            const watchers = data.subscribers_count;
            let formatted = watchers.toString();
            if (watchers >= 1000) {
              formatted = (watchers / 1000).toFixed(1).replace(/\\.0$/, "") + "k";
            }
            githubStars.textContent = formatted;
          }
        })
        .catch((error) => {
          console.error("Failed to fetch GitHub watchers:", error);
          githubStars.textContent = "—";
        });
    }

    // Component tabs
    componentTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabName = tab.getAttribute("data-tab");
        componentTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        
        const docs = document.getElementById("componentDocs");
        const api = document.getElementById("componentAPI");
        if (tabName === "docs") {
          docs.style.display = "block";
          api.style.display = "none";
        } else {
          docs.style.display = "none";
          api.style.display = "block";
        }
      });
    });

    // Apply initial theme
    const stored = localStorage.getItem("purity-site-mode") || "dark";
    if (stored === "dark") {
      root.setAttribute("data-theme", "dark");
      if (modeToggleLabel) modeToggleLabel.textContent = "Dark";
    } else {
      root.removeAttribute("data-theme");
      if (modeToggleLabel) modeToggleLabel.textContent = "Light";
    }
  </script>
</body>
</html>`;
}

function renderChangelog() {
  const updated = new Date().toISOString();
  
  // Changelog entries - in a real scenario, this could be read from a CHANGELOG.md file
  const changelogEntries = [
    {
      version: "1.1.0",
      date: "2025-12-18",
      type: "minor",
      changes: [
        { type: "added", text: "Design System Enhancement: Complete Priority 1-4 implementation" },
        { type: "added", text: "Design Specs components: Comprehensive design specifications for Button, Input, Card, Modal, and Select" },
        { type: "added", text: "Usage Guidelines component: Reusable guidelines for when to use/not use components" },
        { type: "added", text: "Pattern documentation: 5 comprehensive pattern stories (LoginForm, DataTable, CommandPalette, Dashboard, MobileNavigation)" },
        { type: "added", text: "Design handoff documentation: Complete guide for designers (design-handoff.md)" },
        { type: "added", text: "Figma-to-code mapping: Component name and variant mapping guide (figma-to-code.md)" },
        { type: "added", text: "Component specs documentation: Detailed specs for 5 key components in docs/component-specs/" },
        { type: "added", text: "Enhanced Storybook navigation: Prioritized Foundations subcategories and improved sorting" },
        { type: "added", text: "Expanded Accessibility documentation: Comprehensive keyboard navigation, focus management, ARIA usage, and contrast requirements" },
        { type: "added", text: "Component Showcase: Visual gallery organized by Atomic Design taxonomy" },
        { type: "added", text: "Figma integration support: Documentation and parameter placeholders for design links" },
        { type: "added", text: "Token reference stories: Complete documentation for Colors, Typography, Spacing, Shadows, Border Radius, and Breakpoints" },
        { type: "added", text: "Design System Overview: Mission, principles, and getting started guide" },
        { type: "added", text: "Request a component button: New header button linking to GitHub Issues" },
        { type: "improved", text: "Storybook organization: Custom sorting with Foundations prioritization" },
        { type: "improved", text: "Component documentation: Added Design Specs and Usage Guidelines to all key components" },
      ]
    },
    {
      version: "1.0.0",
      date: "2025-12-18",
      type: "major",
      changes: [
        { type: "added", text: "Initial release of Purity Design System" },
        { type: "added", text: "166 components with comprehensive documentation" },
        { type: "added", text: "Theme-aware component system with light/dark mode support" },
        { type: "added", text: "Complete Storybook documentation for all components" },
        { type: "added", text: "Component detail pages with navigation and breadcrumbs" },
        { type: "added", text: "New components: Spinner, Kbd, InputGroup, Field, Item, Sidebar, ToggleGroup, NativeSelect" },
        { type: "added", text: "Changelog page with shadcn-style layout" },
        { type: "added", text: "Responsive design system with mobile-first approach" },
        { type: "added", text: "AI agentic UI primitives (ChatMessage, ChatComposer, ToolCallCard, etc.)" },
        { type: "added", text: "Atomic design variables panel (Radius, Density, Accent Color, Spacing, Font Scale)" },
        { type: "added", text: "GitHub Pages deployment with automatic builds" },
        { type: "added", text: "Component search and filtering functionality" },
        { type: "added", text: "Accessible components with ARIA labels and keyboard navigation" },
      ]
    }
  ];

  return `<!doctype html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="light dark" />
  <title>Changelog - Purity Design System</title>
  <meta name="description" content="Changelog for Purity Design System - see what's new and what's changed." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
  <style>
    /* CSS will be replaced during build */
  </style>
</head>
<body>
  ${renderHeader()}

  <main>
    <section id="changelog" style="padding-top: 80px;">
      <div class="wrap components-layout">
        <div class="components-sidebar">
          <div class="sidebar-inner">
            <div class="sidebar-group" data-category="docs">
              <button class="sidebar-group-header" aria-expanded="true" data-collapsed="false">
                <span>DOCUMENTATION</span>
              </button>
              <div class="sidebar-group-content">
                <a class="sidebar-item" href="${basePath}#getting-started">
                  <span class="sidebar-item-text">Get Started</span>
                </a>
                <a class="sidebar-item" href="${basePath}components/">
                  <span class="sidebar-item-text">Components</span>
                </a>
                <a class="sidebar-item active" href="${basePath}changelog/">
                  <span class="sidebar-item-text">Changelog</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="components-content">
          <div class="components-content-wrapper">
            <div class="components-content-inner">
              <nav class="components-breadcrumb" aria-label="Breadcrumb">
                <div class="components-breadcrumb-inner">
                  <a href="${basePath}" class="components-breadcrumb-item">Home</a>
                  <span class="components-breadcrumb-separator" aria-hidden="true">/</span>
                  <span class="components-breadcrumb-current">Changelog</span>
                </div>
              </nav>
              
              <div class="component-header">
                <div class="component-header-top">
                  <h1 class="component-name" id="componentName">Changelog</h1>
                  <div class="component-actions">
                    <div class="tooltip-wrapper">
                      <button class="component-action-btn" id="copyComponentBtn" aria-label="Copy page">
                        Copy
                      </button>
                      <div class="tooltip-bubble" role="tooltip">Copy page</div>
                    </div>
                    <div class="tooltip-wrapper">
                      <a href="https://github.com/gagan-malik/purity-design-system" target="_blank" class="component-action-btn" id="pageComponentBtn" aria-label="View on GitHub">
                        Page
                      </a>
                      <div class="tooltip-bubble" role="tooltip">View on GitHub</div>
                    </div>
                  </div>
                </div>
                <p class="component-description" id="componentDescription">
                  Latest updates and announcements.
                </p>
              </div>

              <div class="docs-nav">
                <button class="docs-nav-btn" id="docsNavCopy" aria-label="Copy">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copy
                </button>
                <a href="https://github.com/gagan-malik/purity-design-system" target="_blank" class="docs-nav-btn" id="docsNavPage" aria-label="Page">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Page
                </a>
                <a href="${basePath}components/" class="docs-nav-btn" id="docsNavPrev" aria-label="Previous">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  Previous
                </a>
                <a href="${basePath}" class="docs-nav-btn" id="docsNavNext" aria-label="Next">
                  Next
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
              </div>

              <div class="changelog-content" style="margin-top: 32px;">
            ${changelogEntries.map(entry => `
              <div class="changelog-entry" style="margin-bottom: 48px; padding-bottom: 32px; border-bottom: 1px solid hsl(var(--border));">
                <div style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 16px;">
                  <h2 style="margin: 0; font-size: 1.75rem; font-weight: 700;">
                    <a href="#${entry.version}" id="${entry.version}" style="color: hsl(var(--foreground)); text-decoration: none;">
                      ${entry.version}
                    </a>
                  </h2>
                  <span style="font-size: 14px; color: hsl(var(--muted-foreground)); font-family: var(--mono);">
                    ${new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <span style="
                    padding: 2px 8px;
                    border-radius: 999px;
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                    background: ${entry.type === 'major' ? 'hsl(var(--primary))' : entry.type === 'minor' ? 'hsl(var(--muted))' : 'hsl(var(--muted))'};
                    color: ${entry.type === 'major' ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))'};
                  ">
                    ${entry.type}
                  </span>
                </div>
                <div class="changelog-changes" style="display: flex; flex-direction: column; gap: 12px;">
                  ${entry.changes.map(change => `
                    <div style="display: flex; gap: 12px; align-items: flex-start;">
                      <span style="
                        flex-shrink: 0;
                        width: 20px;
                        height: 20px;
                        border-radius: 4px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 12px;
                        font-weight: 600;
                        background: ${change.type === 'added' ? 'hsl(142 71% 45% / 0.15)' : change.type === 'changed' ? 'hsl(45 93% 47% / 0.15)' : change.type === 'fixed' ? 'hsl(221 83% 53% / 0.15)' : 'hsl(var(--muted))'};
                        color: ${change.type === 'added' ? '#059669' : change.type === 'changed' ? '#d97706' : change.type === 'fixed' ? '#2563eb' : 'hsl(var(--foreground))'};
                      ">
                        ${change.type === 'added' ? '+' : change.type === 'changed' ? '~' : change.type === 'fixed' ? '!' : '•'}
                      </span>
                      <span style="flex: 1; line-height: 1.6; color: hsl(var(--foreground));">
                        ${change.text}
                      </span>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <script>
    const root = document.documentElement;
    const modeToggleButton = document.getElementById("modeToggleButton");
    const modeToggleLabel = document.getElementById("modeToggleLabel");
    const githubStars = document.getElementById("githubStars");
    const copyBtn = document.getElementById("copyComponentBtn");
    const docsNavCopy = document.getElementById("docsNavCopy");

    // Mode toggle
    if (modeToggleButton) {
      modeToggleButton.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        const html = document.documentElement;
        const isCurrentlyDark = html.getAttribute("data-theme") === "dark";
        const nextTheme = isCurrentlyDark ? "light" : "dark";
        if (nextTheme === "dark") {
          html.setAttribute("data-theme", "dark");
        } else {
          html.removeAttribute("data-theme");
        }
        if (modeToggleLabel) {
          modeToggleLabel.textContent = nextTheme === "dark" ? "Dark" : "Light";
        }
        localStorage.setItem("purity-site-mode", nextTheme);
      };
    }

    // Copy functionality
    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        // Show feedback
        const btn = copyBtn || docsNavCopy;
        if (btn) {
          const originalText = btn.textContent || btn.innerHTML;
          btn.textContent = "Copied!";
          setTimeout(() => {
            btn.innerHTML = originalText;
          }, 2000);
        }
      }).catch(err => {
        console.error("Failed to copy:", err);
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        copyToClipboard(window.location.href);
      });
    }

    if (docsNavCopy) {
      docsNavCopy.addEventListener("click", () => {
        copyToClipboard(window.location.href);
      });
    }

    // GitHub watchers
    if (githubStars) {
      fetch("https://api.github.com/repos/gagan-malik/purity-design-system")
        .then((response) => response.json())
        .then((data) => {
          if (data.subscribers_count !== undefined) {
            const watchers = data.subscribers_count;
            let formatted = watchers.toString();
            if (watchers >= 1000) {
              formatted = (watchers / 1000).toFixed(1).replace(/\\.0$/, "") + "k";
            }
            githubStars.textContent = formatted;
          }
        })
        .catch((error) => {
          console.error("Failed to fetch GitHub watchers:", error);
          githubStars.textContent = "—";
        });
    }

    // Apply initial theme
    const stored = localStorage.getItem("purity-site-mode") || "dark";
    if (stored === "dark") {
      root.setAttribute("data-theme", "dark");
      if (modeToggleLabel) modeToggleLabel.textContent = "Dark";
    } else {
      root.removeAttribute("data-theme");
      if (modeToggleLabel) modeToggleLabel.textContent = "Light";
    }
  </script>
</body>
</html>`;
}

ensureDir(distDir);

const components = buildComponentIndex();
const htmlHome = renderHTML(components, "home");
fs.writeFileSync(path.join(distDir, "index.html"), htmlHome, "utf8");

// Components page
const componentsDir = path.join(distDir, "components");
ensureDir(componentsDir);
const htmlComponents = renderHTML(components, "components");
fs.writeFileSync(path.join(componentsDir, "index.html"), htmlComponents, "utf8");

// Extract CSS from home page for use in detail pages
const sharedCSS = htmlHome.match(/<style>([\s\S]*?)<\/style>/)?.[1] || "";

// Changelog page
const changelogDir = path.join(distDir, "changelog");
ensureDir(changelogDir);
let htmlChangelog = renderChangelog();
htmlChangelog = htmlChangelog.replace(/<style>[\s\S]*?<\/style>/i, `<style>${sharedCSS}</style>`);
fs.writeFileSync(path.join(changelogDir, "index.html"), htmlChangelog, "utf8");

// Component detail pages
const detailPages = [];
for (const component of components) {
  const componentDetailDir = path.join(componentsDir, component.slug);
  ensureDir(componentDetailDir);
  let htmlDetail = renderComponentDetail(component, components);
  // Replace the CSS placeholder with actual CSS
  htmlDetail = htmlDetail.replace(/<style>[\s\S]*?<\/style>/i, `<style>${sharedCSS}</style>`);
  fs.writeFileSync(path.join(componentDetailDir, "index.html"), htmlDetail, "utf8");
  detailPages.push(`   - website/dist/components/${component.slug}/index.html`);
}

console.log(`✅ Website generated:`);
console.log(`   - website/dist/index.html`);
console.log(`   - website/dist/components/index.html`);
console.log(`   - website/dist/changelog/index.html`);
if (detailPages.length > 0) {
  console.log(`   - ${detailPages.length} component detail pages`);
}
console.log(`ℹ️ Components indexed: ${components.length}`);
console.log(`ℹ️ Base path: ${basePath}`);
console.log(`ℹ️ Storybook path: ${storybookPath}`);

