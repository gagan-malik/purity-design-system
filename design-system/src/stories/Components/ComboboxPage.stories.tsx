import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Combobox } from "../../components";
import type { ComboboxOption } from "../../components/Combobox/Combobox";
import { DocPage, DoDont, Section, SpecTable } from "../_shared/DocPage";

const meta: Meta = {
  title: "Pages/Components/Combobox",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => {
    const options: ComboboxOption[] = [
      { id: "1", label: "Neutral" },
      { id: "2", label: "Blue" },
      { id: "3", label: "Emerald" },
      { id: "4", label: "Rose" },
      { id: "5", label: "Amber" },
    ];
    const [value, setValue] = React.useState<ComboboxOption | undefined>(options[0]);

    return (
      <DocPage title="Combobox" subtitle="Searchable selection control built on Headless UI combobox.">
        <Section title="Behavior" description="Combobox supports keyboard navigation and type-to-filter.">
          <SpecTable
            rows={[
              { key: "options", value: <>Array of selectable items (id/label).</> },
              { key: "value", value: <>Selected option.</> },
              { key: "onChange", value: <>Selection callback.</> },
              { key: "a11y", value: <>Button has a label; input uses placeholder; listbox is managed by Headless UI.</> },
            ]}
          />
        </Section>

        <Section title="Example">
          <div className="max-w-md">
            <Combobox options={options} value={value} onChange={setValue} placeholder="Select a theme…" />
          </div>
        </Section>

        <Section title="Do / Don’t">
          <DoDont
            doItems={[
              <>Use for 8+ options or when filtering materially improves selection speed.</>,
              <>Prefer a simple Select for small option sets.</>,
            ]}
            dontItems={[
              <>Don’t hide critical form labels. Always provide a visible label nearby.</>,
              <>Don’t use for single boolean choice (use Checkbox/Toggle).</>,
            ]}
          />
        </Section>
      </DocPage>
    );
  },
};

