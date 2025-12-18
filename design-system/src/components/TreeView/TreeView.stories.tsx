import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TreeView, TreeNode } from "./TreeView";

const meta: Meta<typeof TreeView> = {
  title: "Organisms/TreeView",
  component: TreeView,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof TreeView>;

export const Default: Story = {
  render: () => {
    const nodes: TreeNode[] = [
      {
        id: "root",
        label: "Artifacts",
        children: [
          { id: "diff", label: "Diff viewer" },
          { id: "files", label: "Files", children: [{ id: "a", label: "src/components" }, { id: "b", label: "docs" }] },
        ],
      },
      { id: "settings", label: "Settings", disabled: true },
    ];

    const [selectedId, setSelectedId] = React.useState<string>("diff");
    return (
      <div className="max-w-sm">
        <TreeView nodes={nodes} selectedId={selectedId} onSelect={setSelectedId} defaultExpandedIds={["root", "files"]} />
      </div>
    );
  },
};

