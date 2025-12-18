import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { DocPage, Section, SpecTable } from "../_shared/DocPage";

const meta: Meta = {
  title: "Pages/Governance/Quality gates",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <DocPage
      title="Quality gates"
      subtitle="How changes ship safely: build, Storybook, accessibility smoke, and deployment."
    >
      <Section title="What is enforced in CI (today)">
        <SpecTable
          rows={[
            { key: "Build (Rollup)", value: <>Typecheck + bundle the library.</> },
            { key: "Storybook build", value: <>Ensures docs compile and pages render.</> },
            { key: "A11y smoke", value: <>Runs axe checks against a curated set of <code>Pages/*</code> stories.</> },
            { key: "Perf budget", value: <>Basic size budget on marketing <code>index.html</code>.</> },
          ]}
        />
      </Section>

      <Section title="Expectations for new components" description="If a component is new or changed materially, it must be testable and documentable.">
        <ul className="list-disc pl-5 text-sm text-text-tertiary space-y-1">
          <li>Has a stable semantic API (no leaking internal implementation details).</li>
          <li>Has keyboard navigation if it’s interactive.</li>
          <li>Has labels for icon-only controls.</li>
          <li>Has at least one Storybook story and appears in Atomic navigation.</li>
        </ul>
      </Section>
    </DocPage>
  ),
};

