import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ArtifactPanel } from "./ArtifactPanel";

const meta: Meta<typeof ArtifactPanel> = {
  title: "Organisms/ArtifactPanel",
  component: ArtifactPanel,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof ArtifactPanel>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <button
          type="button"
          className="rounded-full px-4 py-2 text-sm font-semibold border border-border-secondary bg-bg-primary hover:bg-bg-secondary"
          onClick={() => setOpen(true)}
        >
          Open artifact panel
        </button>
        <ArtifactPanel open={open} onClose={() => setOpen(false)} title="Generated diff">
          <pre className="text-xs font-mono whitespace-pre-wrap break-words">
            {`diff --git a/foo.ts b/foo.ts
--- a/foo.ts
+++ b/foo.ts
@@
-const x = 1
+const x = 2`}
          </pre>
        </ArtifactPanel>
      </div>
    );
  },
};

