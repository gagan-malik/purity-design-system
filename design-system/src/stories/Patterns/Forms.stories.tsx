import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Label } from "../../components/Label";
import { TextArea } from "../../components";
import { Combobox } from "../../components/Combobox";
import { Button } from "../../components/Button";
import type { ComboboxOption } from "../../components/Combobox/Combobox";

const meta: Meta = {
  title: "Pages/Patterns/Forms",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pattern: form layout with labels, validation messaging, and primary/secondary actions. Use this as a baseline for product forms.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Reference: Story = {
  render: () => {
    const options: ComboboxOption[] = [
      { id: "1", label: "Customer support" },
      { id: "2", label: "Billing" },
      { id: "3", label: "Security" },
    ];
    const [team, setTeam] = React.useState<ComboboxOption | undefined>(options[0]);
    const [notes, setNotes] = React.useState("");

    return (
      <div className="max-w-2xl space-y-5">
        <div className="rounded-3xl border border-border-secondary bg-bg-primary p-5 space-y-4">
          <div>
            <div className="text-xl font-semibold text-text-primary">Create ticket</div>
            <div className="text-sm text-text-tertiary">A real-world form composition example.</div>
          </div>

          <div>
            <Label htmlFor="team" required>
              Team
            </Label>
            <Combobox options={options} value={team} onChange={setTeam} placeholder="Select a team…" />
          </div>

          <div>
            <Label htmlFor="notes">Details</Label>
            <TextArea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe the issue…"
              className="min-h-[120px]"
            />
            <div className="mt-2 text-xs text-text-tertiary">Keep it brief and include reproduction steps.</div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button tone="neutral" variant="outline">
              Cancel
            </Button>
            <Button tone="brand" variant="solid">
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

