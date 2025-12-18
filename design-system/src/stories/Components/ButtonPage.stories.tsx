import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Button, IconButton } from "../../components";
import { CodeBlock, DocPage, DoDont, Section, SpecTable } from "../_shared/DocPage";

const meta: Meta = {
  title: "Pages/Components/Button",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <DocPage
      title="Button"
      subtitle="Primary action control. Supports semantic tones, variants, loading, icon slots, and polymorphism via asChild."
    >
      <Section title="Anatomy" description="A Button is a single tap target with an optional leading/trailing icon and optional loading affordance.">
        <SpecTable
          rows={[
            { key: "tone", value: <>Semantic intent (brand, neutral, success, warning, danger).</> },
            { key: "variant", value: <>Visual treatment (solid, outline, ghost, link).</> },
            { key: "size", value: <>Touch target sizing; prefer defaults unless density requires otherwise.</> },
            { key: "loading", value: <>Shows a busy state; set <code>aria-busy</code> automatically.</> },
            { key: "asChild", value: <>Polymorphic rendering; useful for links or custom wrappers.</> },
          ]}
        />
      </Section>

      <Section title="Examples" description="Use a semantic tone first; adjust variant second.">
        <div className="flex flex-wrap gap-3">
          <Button tone="brand" variant="solid">Continue</Button>
          <Button tone="neutral" variant="outline">Cancel</Button>
          <Button tone="danger" variant="solid">Delete</Button>
          <Button tone="brand" loading>Saving</Button>
          <IconButton ariaLabel="Add" tone="brand" icon={<span aria-hidden>＋</span>} />
        </div>
      </Section>

      <Section title="Do / Don’t">
        <DoDont
          doItems={[
            <>Use <code>tone</code> to communicate meaning (brand vs danger).</>,
            <>Keep labels verb-first (“Create”, “Save”, “Invite”).</>,
            <>Use loading when the action is async and prevents repeated submits.</>,
          ]}
          dontItems={[
            <>Don’t encode meaning with color-only without text/icon support.</>,
            <>Don’t use destructive tone for non-destructive actions.</>,
            <>Don’t disable without explaining why (prefer tooltip/inline hint).</>,
          ]}
        />
      </Section>

      <Section title="Accessibility" description="Buttons must be keyboard operable and have a discernible name.">
        <CodeBlock>{`// ✅ Icon-only buttons MUST have ariaLabel
<IconButton ariaLabel="Add item" icon={<PlusIcon />} />

// ✅ Loading conveys busy state
<Button loading>Saving</Button>`}</CodeBlock>
      </Section>
    </DocPage>
  ),
};

