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
    .filter((t) => t.toLowerCase().startsWith("designsystem/"))
    .map((t) => {
      const name = t.split("/")[1] || t;
      const id = storyIdFromTitle(t);
      const href = `${storybookPath}?path=/docs/${id}`;
      return { title: t, name, id, href };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return items;
}

function renderHTML(components) {
  const updated = new Date().toISOString();
  const defaultPreview =
    components.find((c) => c.name.toLowerCase() === "themeshowcase") ||
    components.find((c) => c.name.toLowerCase() === "button") ||
    components[0];
  const defaultPreviewHref = defaultPreview?.href || storybookPath;

  // Apple-ish styling: large type, subtle gradients, hairline borders, glassy surfaces.
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
      --bg: #ffffff;
      --fg: #0b0b0f;
      --muted: rgba(11,11,15,.64);
      --border: rgba(11,11,15,.12);
      --card: rgba(255,255,255,.75);
      --card2: rgba(255,255,255,.55);
      --shadow: 0 10px 30px rgba(0,0,0,.08);
      --shadow2: 0 1px 0 rgba(0,0,0,.06);
      --accent: #1570ef;
      --accent2: #7c3aed;
      --radius: 18px;
      --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      --sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
    }
    :root[data-theme="dark"] {
      --bg: #0b0b10;
      --fg: rgba(255,255,255,.92);
      --muted: rgba(255,255,255,.66);
      --border: rgba(255,255,255,.12);
      --card: rgba(16,16,22,.65);
      --card2: rgba(16,16,22,.52);
      --shadow: 0 12px 40px rgba(0,0,0,.45);
      --shadow2: 0 1px 0 rgba(255,255,255,.06);
      --accent: #60a5fa;
      --accent2: #a78bfa;
    }
    * { box-sizing: border-box; }
    html, body { height: 100%; }
    body {
      margin: 0;
      font-family: var(--sans);
      background: radial-gradient(1200px 900px at 15% 10%, color-mix(in oklab, var(--accent) 18%, transparent), transparent 65%),
                  radial-gradient(1200px 900px at 85% 20%, color-mix(in oklab, var(--accent2) 16%, transparent), transparent 70%),
                  var(--bg);
      color: var(--fg);
      line-height: 1.45;
      letter-spacing: -0.01em;
    }
    a { color: inherit; text-decoration: none; }
    a:hover { text-decoration: underline; text-underline-offset: 3px; }

    .wrap { max-width: 1120px; margin: 0 auto; padding: 0 20px; }

    header {
      position: sticky;
      top: 0;
      z-index: 20;
      backdrop-filter: blur(16px);
      background: color-mix(in oklab, var(--bg) 72%, transparent);
      border-bottom: 1px solid var(--border);
    }
    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      height: 64px;
    }
    .brand { display: flex; align-items: center; gap: 10px; font-weight: 650; }
    .brand-mark {
      width: 26px; height: 26px; border-radius: 8px;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      box-shadow: var(--shadow2);
    }
    .navlinks { display: flex; gap: 18px; align-items: center; color: var(--muted); font-size: 14px; }
    .navlinks a { padding: 6px 8px; border-radius: 10px; }
    .navlinks a:hover { background: color-mix(in oklab, var(--fg) 6%, transparent); text-decoration: none; color: var(--fg); }

    .actions { display: flex; gap: 10px; align-items: center; }
    .btn {
      border: 1px solid var(--border);
      background: color-mix(in oklab, var(--bg) 70%, transparent);
      color: var(--fg);
      padding: 9px 12px;
      border-radius: 12px;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: var(--shadow2);
    }
    .btn.primary {
      border: none;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      color: white;
      box-shadow: var(--shadow);
    }
    .btn:hover { text-decoration: none; transform: translateY(-1px); transition: transform .12s ease; }

    .hero { padding: 86px 0 56px; }
    .kicker { color: var(--muted); font-size: 14px; letter-spacing: .08em; text-transform: uppercase; }
    h1 {
      margin: 14px 0 10px;
      font-size: clamp(40px, 5vw, 64px);
      line-height: 1.04;
      letter-spacing: -0.03em;
    }
    .lead { max-width: 62ch; color: var(--muted); font-size: 18px; }
    .hero-grid {
      display: grid;
      grid-template-columns: 1.2fr .8fr;
      gap: 18px;
      margin-top: 28px;
    }
    @media (max-width: 880px) { .hero-grid { grid-template-columns: 1fr; } }

    .card {
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: var(--card);
      backdrop-filter: blur(18px);
      box-shadow: var(--shadow);
      overflow: hidden;
    }
    .card .inner { padding: 18px 18px; }

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

    section { padding: 44px 0; }
    h2 { margin: 0 0 10px; font-size: 26px; letter-spacing: -0.02em; }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }
    @media (max-width: 960px) { .grid { grid-template-columns: repeat(2, 1fr);} }
    @media (max-width: 640px) { .grid { grid-template-columns: 1fr;} }

    .comp {
      border: 1px solid var(--border);
      background: var(--card);
      border-radius: 16px;
      padding: 14px;
      box-shadow: var(--shadow2);
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 10px;
    }
    .comp .name { font-weight: 650; }
    .comp .meta { color: var(--muted); font-size: 12px; font-family: var(--mono); }

    .preview {
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: var(--card);
      box-shadow: var(--shadow);
      overflow: hidden;
    }
    .previewbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 14px;
      border-bottom: 1px solid var(--border);
      background: color-mix(in oklab, var(--bg) 78%, transparent);
      backdrop-filter: blur(14px);
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
      border: 1px solid var(--border);
      background: var(--card2);
      color: var(--fg);
      padding: 10px 12px;
      border-radius: 12px;
      font-size: 14px;
      min-width: 240px;
      max-width: 520px;
      width: 100%;
    }
    .seg {
      display: inline-flex;
      border: 1px solid var(--border);
      background: var(--card2);
      border-radius: 12px;
      padding: 2px;
      gap: 2px;
    }
    .seg button {
      appearance: none;
      border: 0;
      background: transparent;
      color: var(--muted);
      padding: 8px 10px;
      border-radius: 10px;
      font-size: 13px;
      cursor: pointer;
      white-space: nowrap;
    }
    .seg button[aria-pressed="true"] {
      background: color-mix(in oklab, var(--fg) 8%, transparent);
      color: var(--fg);
    }
    .previewframe {
      width: 100%;
      height: min(78vh, 720px);
      border: 0;
      background: var(--bg);
    }

    footer {
      padding: 36px 0 60px;
      color: var(--muted);
      border-top: 1px solid var(--border);
      margin-top: 20px;
    }

    .sr { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
  </style>
</head>
<body>
  <header>
    <div class="wrap nav">
      <div class="brand">
        <div class="brand-mark" aria-hidden="true"></div>
        <div>Purity Design System</div>
      </div>
      <nav class="navlinks" aria-label="Primary">
        <a href="#overview">Overview</a>
        <a href="#getting-started">Getting started</a>
        <a href="#preview">Live preview</a>
        <a href="#components">Components</a>
        <a href="${storybookPath}">Storybook</a>
      </nav>
      <div class="actions">
        <button class="btn" id="themeToggle" type="button" aria-label="Toggle theme">
          <span aria-hidden="true">◐</span>
          <span class="hide-sm">Theme</span>
        </button>
        <a class="btn primary" href="${storybookPath}">
          Open Storybook
        </a>
      </div>
    </div>
  </header>

  <main>
    <div class="wrap hero" id="overview">
      <div class="kicker">Design system • React • Theme-aware</div>
      <h1>Build polished UI with speed—and keep it consistent.</h1>
      <p class="lead">
        Purity is a theme-first React component library with a production Storybook.
        The landing site is the index; Storybook is the source of truth for every component API.
      </p>

      <div class="hero-grid">
        <div class="card">
          <div class="inner">
            <h2 style="margin:0 0 8px;">What’s included</h2>
            <div class="spec">
              <div class="pill"><div class="label">Theme</div><div class="value">light / dark / system</div></div>
              <div class="pill"><div class="label">Tokens</div><div class="value">CSS variables</div></div>
              <div class="pill"><div class="label">Docs</div><div class="value">Storybook + a11y</div></div>
              <div class="pill"><div class="label">Release</div><div class="value">SemVer</div></div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="inner">
            <h2 style="margin:0 0 8px;">Quick links</h2>
            <div style="display:flex; flex-direction:column; gap:10px;">
              <a class="btn" href="${storybookPath}">Browse components in Storybook</a>
              <a class="btn" href="${storybookPath}?path=/docs/" style="justify-content:space-between;">
                Docs home
                <span aria-hidden="true">→</span>
              </a>
              <div class="pill">
                <div class="label">Base path</div>
                <div class="value">${basePath}</div>
              </div>
              <div class="pill">
                <div class="label">Last generated</div>
                <div class="value">${updated}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section id="getting-started">
      <div class="wrap">
        <h2>Getting started</h2>
        <p class="lead" style="margin:0 0 14px;">
          Install from GitHub Packages, then rely on Storybook for component usage and API details.
        </p>
        <div class="card"><div class="inner">
          <div class="pill" style="font-family:var(--mono); white-space:pre; overflow:auto;">export NPM_TOKEN=&quot;&lt;github token with read:packages&gt;&quot;\n# npm install @purity/design-system</div>
          <div style="height:10px"></div>
          <div class="pill" style="font-family:var(--mono); white-space:pre; overflow:auto;"># Open Storybook\n${storybookPath}</div>
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

    <section id="components">
      <div class="wrap">
        <h2>Components</h2>
        <p class="lead" style="margin:0 0 14px;">
          This index is generated from Storybook story titles. Click a component to jump directly to its docs.
        </p>
        <div class="grid">
          ${components
            .map(
              (c) => `
            <a class="comp" href="${c.href}">
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
      const root = document.documentElement;
      const btn = document.getElementById("themeToggle");
      const select = document.getElementById("componentSelect");
      const frame = document.getElementById("previewFrame");
      const open = document.getElementById("openInStorybook");
      const previewKey = "purity-preview-theme";
      const previewButtons = Array.from(document.querySelectorAll(".segbtn"));

      function apply(theme) {
        if (theme === "dark") root.setAttribute("data-theme", "dark");
        else root.removeAttribute("data-theme");
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
