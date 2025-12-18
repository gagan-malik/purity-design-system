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
    .filter((t) => !t.toLowerCase().startsWith("atomic/"))
    .map((t) => {
      const parts = t.split("/").filter(Boolean);
      const name = parts[parts.length - 1] || t;
      const id = storyIdFromTitle(t);
      const href = `${storybookPath}?path=/docs/${id}`;
      return { title: t, name, id, href };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return items;
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

function renderHTML(components) {
  const updated = new Date().toISOString();
  const defaultPreview =
    components.find((c) => c.name.toLowerCase() === "themeshowcase") ||
    components.find((c) => c.name.toLowerCase() === "button") ||
    components[0];
  const defaultPreviewHref = defaultPreview?.href || storybookPath;

  // shadcn/ui-inspired styling: neutral palette, grid background, crisp type.
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="light dark" />
  <title>Purity Design System</title>
  <meta name="description" content="A theme-aware React design system with Storybook documentation." />
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

      --radius: 12px;
      --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      --sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
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
    :root[data-theme="dark"] {
      --background: 240 10% 3.9%;
      --foreground: 0 0% 98%;
      --muted: 240 3.7% 15.9%;
      --muted-foreground: 240 5% 64.9%;
      --card: 240 10% 3.9%;
      --border: 240 3.7% 15.9%;
      --ring: 240 4.9% 83.9%;
      --primary: 0 0% 98%;
      --primary-foreground: 240 5.9% 10%;
    }
    * { box-sizing: border-box; }
    html, body { height: 100%; }
    body {
      margin: 0;
      font-family: var(--sans);
      color: hsl(var(--foreground));
      background: hsl(var(--background));
      line-height: 1.5;
    }
    a { color: inherit; text-decoration: none; }
    a:hover { text-decoration: none; }

    .wrap { max-width: 1120px; margin: 0 auto; padding: 0 20px; }

    /* subtle grid, like shadcn/ui */
    .bg-grid {
      background-image:
        linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
        linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px);
      background-size: 56px 56px;
      background-position: center top;
    }
    .fade-top {
      mask-image: radial-gradient(60% 40% at 50% 0%, black 55%, transparent 100%);
    }

    header {
      position: sticky;
      top: 0;
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
    .brand-mark {
      width: 18px; height: 18px; border-radius: 5px;
      background: hsl(var(--foreground));
    }
    .brand-name { font-family: var(--mono); font-size: 14px; }
    .navlinks { display: flex; gap: 14px; align-items: center; color: hsl(var(--muted-foreground)); font-size: 14px; }
    .navlinks a { padding: 6px 8px; border-radius: 10px; }
    .navlinks a:hover { background: hsl(var(--muted)); color: hsl(var(--foreground)); }

    .actions { display: flex; gap: 10px; align-items: center; }
    .btn {
      border: 1px solid hsl(var(--border));
      background: hsl(var(--background));
      color: hsl(var(--foreground));
      padding: 9px 12px;
      border-radius: 12px;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 1px 0 rgba(0,0,0,.02);
    }
    .btn.primary {
      border-color: transparent;
      background: hsl(var(--primary));
      color: hsl(var(--primary-foreground));
    }
    .btn:hover { text-decoration: none; transform: translateY(-1px); transition: transform .12s ease; }

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

    .hero { padding: 72px 0 36px; }
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
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }
    @media (max-width: 960px) { .grid { grid-template-columns: repeat(2, 1fr);} }
    @media (max-width: 640px) { .grid { grid-template-columns: 1fr;} }

    .comp {
      border: 1px solid hsl(var(--border));
      background: hsl(var(--card));
      border-radius: var(--radius);
      padding: 14px;
      box-shadow: 0 1px 0 rgba(0,0,0,.02);
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 10px;
    }
    .comp:hover { background: hsl(var(--muted)); }
    .comp .name { font-weight: 600; }
    .comp .meta { color: hsl(var(--muted-foreground)); font-size: 12px; font-family: var(--mono); }

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
      background: hsl(var(--card));
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
      padding: 36px 0 60px;
      color: hsl(var(--muted-foreground));
      border-top: 1px solid hsl(var(--border));
      margin-top: 20px;
    }

    .sr { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
  </style>
</head>
<body class="bg-grid fade-top">
  <header>
    <div class="wrap nav">
      <div class="brand">
        <div class="brand-mark" aria-hidden="true"></div>
        <div class="brand-name">purity/ui</div>
      </div>
      <nav class="navlinks" aria-label="Primary">
        <a href="#getting-started">Docs</a>
        <a href="#preview">Live preview</a>
        <a href="#ai">AI</a>
        <a href="#atomic">Atomic</a>
        <a href="#components">Components</a>
        <a href="${storybookPath}">Storybook</a>
      </nav>
      <div class="actions">
        <div class="themeSelect" id="themeSelectRoot">
          <button
            class="btn"
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
        <button class="btn" id="themeToggle" type="button" aria-label="Toggle theme">
          <span aria-hidden="true">Theme</span>
        </button>
        <a class="btn primary" href="${storybookPath}">
          Open docs
        </a>
      </div>
    </div>
  </header>

  <main>
    <div class="wrap hero">
      <div class="kicker">Design system · React · Storybook</div>
      <h1>Build your UI once.<br/>Ship consistent products.</h1>
      <p class="lead">
        Purity is a theme-aware React component library with Storybook documentation. This homepage is inspired by the clarity of shadcn/ui.
      </p>
      <div class="hero-actions">
        <a class="btn primary" href="${storybookPath}">Get started</a>
        <a class="btn" href="#components">Browse components</a>
      </div>
      <div class="code">export NPM_TOKEN=&quot;&lt;github token with read:packages&gt;&quot;
# npm install @purity/design-system</div>
    </div>

    <section id="getting-started">
      <div class="wrap">
        <h2>Docs</h2>
        <p class="lead" style="margin:0 0 14px;">
          Storybook is the source of truth for component APIs, examples, and accessibility checks.
        </p>
        <div class="card"><div class="inner" style="display:flex; flex-direction:column; gap:8px;">
          <div style="font-family:var(--mono); font-size:12px; color:hsl(var(--muted-foreground));">Base path: <span style="color:hsl(var(--foreground));">${basePath}</span></div>
          <div style="font-family:var(--mono); font-size:12px; color:hsl(var(--muted-foreground));">Updated: <span style="color:hsl(var(--foreground));">${updated}</span></div>
          <div style="font-family:var(--mono); font-size:12px; color:hsl(var(--muted-foreground));">Storybook: <a href="${storybookPath}" style="text-decoration:underline; text-underline-offset:3px; color:hsl(var(--foreground));">${storybookPath}</a></div>
        </div></div>
      </div>
    </section>

    <section id="preview">
      <div class="wrap">
        <h2>Live preview</h2>
        <p class="lead" style="margin:0 0 14px;">
          Pick a component and preview its Storybook docs inline—like Apple’s interactive previews.
        </p>

        <div class="preview">
          <div class="previewbar">
            <div class="left">
              <label class="sr" for="componentSelect">Select a component</label>
              <select class="select" id="componentSelect">
                ${components
                  .map((c) => {
                    const selected = c.href === defaultPreviewHref ? "selected" : "";
                    return `<option value="${c.href}" ${selected}>${c.name}</option>`;
                  })
                  .join("\n")}
              </select>
            </div>
            <div class="right">
              <div class="seg" role="group" aria-label="Preview theme">
                <button type="button" class="segbtn" data-preview-theme="system" aria-pressed="true">System</button>
                <button type="button" class="segbtn" data-preview-theme="light" aria-pressed="false">Light</button>
                <button type="button" class="segbtn" data-preview-theme="dark" aria-pressed="false">Dark</button>
              </div>
              <a class="btn" id="openInStorybook" href="${defaultPreviewHref}">
                Open in Storybook →
              </a>
            </div>
          </div>
          <iframe
            class="previewframe"
            id="previewFrame"
            title="Component preview"
            loading="lazy"
            src="${defaultPreviewHref}&globals=theme:system"
          ></iframe>
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

    <section id="atomic">
      <div class="wrap">
        <h2>Atomic structure</h2>
        <p class="lead" style="margin:0 0 14px;">
          This is generated from <code style="font-family:var(--mono);">design-system/docs/atomic-design.md</code>.
        </p>
        <!-- Note: Storybook sidebar grouping stays under designsystem/*; this section provides an Atomic view on the homepage. -->
        ${(() => {
          const atomic = parseAtomicDesign();
          if (!atomic) return `<div class="card"><div class="inner">Atomic design document not found.</div></div>`;

          const order = ["Atoms", "Molecules", "Organisms", "Templates", "Pages"];
          return `<div class="atomic">
            ${order
              .map((k) => {
                const items = atomic[k] || [];
                return `<div class="kcard">
                    <h3>${k}</h3>
                    <div class="desc">${items.length} components</div>
                    <ul class="alist">
                      ${items
                        .slice(0, 24)
                        .map((n) => `<li><a href="${hrefForComponentName(n)}">${n}</a></li>`)
                        .join("")}
                      ${items.length > 24 ? `<li class="meta">…and ${items.length - 24} more</li>` : ""}
                    </ul>
                  </div>`;
              })
              .join("")}
          </div>`;
        })()}
      </div>
    </section>

    <section id="components">
      <div class="wrap">
        <h2>Components</h2>
        <p class="lead" style="margin:0 0 14px;">
          This index is generated from Storybook story titles. Click a component to jump directly to its docs.
        </p>
        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap; margin: 0 0 14px;">
          <label class="sr" for="componentSearch">Search components</label>
          <input class="search" id="componentSearch" type="search" placeholder="Search components…" autocomplete="off" />
        </div>
        <div class="grid">
          ${components
            .map(
              (c) => `
            <a class="comp" href="${c.href}" data-name="${c.name.toLowerCase()}" data-title="${c.title.toLowerCase()}">
              <div>
                <div class="name">${c.name}</div>
                <div class="meta">${c.title}</div>
              </div>
              <div class="meta">docs</div>
            </a>`
            )
            .join("\n")}
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="wrap">
      <div>© ${new Date().getFullYear()} Purity Design System</div>
      <div style="margin-top:8px; font-family:var(--mono); font-size:12px;">Storybook mounted at: ${storybookPath}</div>
    </div>
  </footer>

  <script>
    (function () {
      const key = "purity-site-theme";
      const colorKey = "purity-site-color";
      const root = document.documentElement;
      const btn = document.getElementById("themeToggle");
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

      function apply(theme) {
        if (theme === "dark") root.setAttribute("data-theme", "dark");
        else root.removeAttribute("data-theme");
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
      }

      function setThemeMenuOpen(open) {
        if (!themeSelectRoot || !themeSelectBtn) return;
        themeSelectRoot.setAttribute("data-open", open ? "true" : "false");
        themeSelectBtn.setAttribute("aria-expanded", open ? "true" : "false");
      }

      function isThemeMenuOpen() {
        return themeSelectRoot?.getAttribute("data-open") === "true";
      }

      function withGlobals(href, previewTheme) {
        try {
          const url = new URL(href, window.location.origin);
          // Storybook v7+ expects globals in a query param like: globals=theme:dark
          url.searchParams.set("globals", "theme:" + previewTheme);
          return url.toString();
        } catch {
          // Fallback: best-effort append
          const sep = href.includes("?") ? "&" : "?";
          return href + sep + "globals=theme:" + previewTheme;
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

      const stored = localStorage.getItem(key);
      if (stored === "dark" || stored === "light") {
        apply(stored);
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        apply("dark");
      }

      const storedColor = localStorage.getItem(colorKey) || "neutral";
      applyColor(storedColor);
      setThemeMenuOpen(false);

      const storedPreview = localStorage.getItem(previewKey);
      if (storedPreview === "light" || storedPreview === "dark" || storedPreview === "system") {
        setPreviewTheme(storedPreview);
      } else {
        setPreviewTheme("system");
      }

      btn?.addEventListener("click", () => {
        const isDark = root.getAttribute("data-theme") === "dark";
        const next = isDark ? "light" : "dark";
        localStorage.setItem(key, next);
        apply(next);
      });

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

      componentSearch?.addEventListener("input", () => {
        const q = (componentSearch.value || "").trim().toLowerCase();
        const cards = Array.from(document.querySelectorAll("a.comp"));
        for (const el of cards) {
          const name = el.getAttribute("data-name") || "";
          const title = el.getAttribute("data-title") || "";
          const show = !q || name.includes(q) || title.includes(q);
          el.style.display = show ? "" : "none";
        }
      });
    })();
  </script>
</body>
</html>`;
}

ensureDir(distDir);

const components = buildComponentIndex();
const html = renderHTML(components);
fs.writeFileSync(path.join(distDir, "index.html"), html, "utf8");

console.log(`✅ Website generated: website/dist/index.html`);
console.log(`ℹ️ Components indexed: ${components.length}`);
console.log(`ℹ️ Base path: ${basePath}`);
console.log(`ℹ️ Storybook path: ${storybookPath}`);
