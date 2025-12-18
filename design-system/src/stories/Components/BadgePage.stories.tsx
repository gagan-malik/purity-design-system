import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Badge, CountBadge } from "../../components";
import { DocPage, DoDont, Section, SpecTable } from "../_shared/DocPage";

const meta: Meta = {
  title: "Pages/Components/Badge",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <DocPage title="Badge" subtitle="Compact status/label primitive. Supports tones, variants, icons, and dot badges.">
      <Section title="When to use">
        <DoDont
          doItems={[
            <>Use for categorical labels, statuses, or counts that are secondary to the primary content.</>,
            <>Prefer <code>soft</code> for most UI; use <code>solid</code> only for emphasis.</>,
          ]}
          dontItems={[
            <>Don’t use badges as the only carrier of critical information (pair with text or iconography).</>,
            <>Don’t overload with long sentences; keep it short.</>,
          ]}
        />
      </Section>

      <Section title="API surface">
        <SpecTable
          rows={[
            { key: "tone", value: <>Semantic intent (neutral/brand/success/warning/danger).</> },
            { key: "variant", value: <>Visual (soft/solid/outline).</> },
            { key: "dot", value: <>Small leading indicator for compact status.</> },
            { key: "CountBadge", value: <>Dedicated count badge for numbers.</> },
          ]}
        />
      </Section>

      <Section title="Examples">
        <div className="flex flex-wrap gap-3 items-center">
          <Badge tone="neutral" variant="soft">Neutral</Badge>
          <Badge tone="brand" variant="solid">New</Badge>
          <Badge tone="success" variant="soft" dot>Healthy</Badge>
          <Badge tone="warning" variant="outline">Review</Badge>
          <Badge tone="danger" variant="soft">Blocked</Badge>
          <CountBadge count={12} tone="brand" />
        </div>
      </Section>
    </DocPage>
  ),
};

