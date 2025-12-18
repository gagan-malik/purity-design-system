import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { AspectRatio, Badge } from "../../components";
import { DocPage, Section, SpecTable } from "../_shared/DocPage";

const meta: Meta = {
  title: "Pages/Components/AspectRatio",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <DocPage
      title="AspectRatio"
      subtitle="Layout primitive that preserves a given ratio using native CSS aspect-ratio with a safe fallback."
    >
      <Section title="Why it exists" description="Keeps media/cards stable while content loads, avoiding layout shift.">
        <SpecTable
          rows={[
            { key: "ratio", value: <>Preset key or ratio string (<code>&quot;16/9&quot;</code>) depending on implementation.</> },
            { key: "asChild", value: <>Wrap an existing element without extra DOM when needed.</> },
            { key: "fallback", value: <>Uses padding-bottom fallback when <code>aspect-ratio</code> is unsupported.</> },
          ]}
        />
      </Section>

      <Section title="Examples">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge tone="neutral" variant="soft">16:9</Badge>
            </div>
            <AspectRatio ratio="16/9">
              <div className="h-full w-full rounded-2xl bg-bg-secondary border border-border-secondary flex items-center justify-center text-sm text-text-tertiary">
                Media
              </div>
            </AspectRatio>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge tone="neutral" variant="soft">1:1</Badge>
            </div>
            <AspectRatio ratio="1/1">
              <div className="h-full w-full rounded-2xl bg-bg-secondary border border-border-secondary flex items-center justify-center text-sm text-text-tertiary">
                Square
              </div>
            </AspectRatio>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge tone="neutral" variant="soft">4:5</Badge>
            </div>
            <AspectRatio ratio="4/5">
              <div className="h-full w-full rounded-2xl bg-bg-secondary border border-border-secondary flex items-center justify-center text-sm text-text-tertiary">
                Portrait
              </div>
            </AspectRatio>
          </div>
        </div>
      </Section>
    </DocPage>
  ),
};

