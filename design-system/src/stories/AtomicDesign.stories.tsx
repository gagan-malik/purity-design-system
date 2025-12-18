import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

// Loaded via Storybook webpack rule: `.md` -> string
import atomicDesignMarkdown from "../../docs/atomic-design.md";

type AtomicBucket = "Atoms" | "Molecules" | "Organisms" | "Templates" | "Pages";

function storyIdFromTitle(title: string) {
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

function parseAtomicDesign(markdown: string): Record<AtomicBucket, string[]> {
  const out: Record<AtomicBucket, string[]> = {
    Atoms: [],
    Molecules: [],
    Organisms: [],
    Templates: [],
    Pages: [],
  };

  let section: AtomicBucket | null = null;

  for (const raw of markdown.split(/\r?\n/)) {
    const line = raw.trim();
    const h = line.match(/^##\s+(Atoms|Molecules|Organisms|Templates|Pages)\s*$/);
    if (h) {
      section = h[1] as AtomicBucket;
      continue;
    }
    if (!section) continue;

    // Matches lines like:
    // - `Button`
    // - `Lookup` (also exports `PeoplePicker`)
    const m = line.match(/^- `([^`]+)`/);
    if (m) out[section].push(m[1]);
  }

  return out;
}

const AtomicDesignPage: React.FC = () => {
  const atomic = React.useMemo(() => parseAtomicDesign(atomicDesignMarkdown), []);
  const order: AtomicBucket[] = ["Atoms", "Molecules", "Organisms", "Templates", "Pages"];

  return (
    <div style={{ padding: 20, maxWidth: 1100 }}>
      <h1 style={{ margin: "0 0 8px" }}>Atomic Design</h1>
      <p style={{ margin: "0 0 18px", color: "rgba(0,0,0,.65)" }}>
        This view is generated from <code>design-system/docs/atomic-design.md</code>. Story titles are organized under
        Atomic buckets (Atoms/Molecules/Organisms/Templates/Pages) in the sidebar.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 14,
        }}
      >
        {order.map((bucket) => (
          <div key={bucket} style={{ border: "1px solid rgba(0,0,0,.08)", borderRadius: 12, padding: 14 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
              <h2 style={{ margin: 0, fontSize: 16 }}>{bucket}</h2>
              <span style={{ fontFamily: "monospace", fontSize: 12, opacity: 0.7 }}>{atomic[bucket].length}</span>
            </div>
            <ul style={{ margin: "10px 0 0", paddingLeft: 16, display: "grid", gap: 6 }}>
              {atomic[bucket].map((name) => (
                <li key={name} style={{ fontSize: 13 }}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const meta: Meta<typeof AtomicDesignPage> = {
  title: "Atomic/Overview",
  component: AtomicDesignPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Atomic Design taxonomy for Purity components, generated from design-system/docs/atomic-design.md.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AtomicDesignPage>;

export const Overview: Story = {};

