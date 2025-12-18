import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { DocPage, Section, SpecTable, DoDont } from "../_shared/DocPage";

const meta: Meta = {
  title: "Pages/Governance/API conventions",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <DocPage
      title="API conventions"
      subtitle="Rules that keep the design system consistent, predictable, and easier than shadcn to adopt at scale."
    >
      <Section title="Naming + semantics">
        <SpecTable
          rows={[
            { key: "Controlled props", value: <>Use <code>value</code>/<code>onValueChange</code> and <code>checked</code>/<code>onCheckedChange</code>.</> },
            { key: "Visual props", value: <>Prefer <code>tone</code>, <code>variant</code>, <code>size</code>.</> },
            { key: "className", value: <>Every component accepts <code>className</code> (applied to the correct DOM node).</> },
            { key: "asChild", value: <>Use polymorphism for link/button alignment when needed.</> },
          ]}
        />
      </Section>

      <Section title="Back-compat policy" description="We keep compatibility via soft-deprecation first, then remove in major versions.">
        <DoDont
          doItems={[
            <>Add new semantic props alongside legacy props and map legacy → new internally.</>,
            <>Mark legacy props clearly in story docs and keep behavior stable.</>,
          ]}
          dontItems={[
            <>Don’t break existing consumers without a migration path.</>,
            <>Don’t introduce duplicate props that conflict (e.g., <code>size</code> vs HTML input <code>size</code>).</>,
          ]}
        />
      </Section>
    </DocPage>
  ),
};

