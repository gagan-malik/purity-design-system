import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Menubar } from "./Menubar";

const meta: Meta<typeof Menubar> = {
  title: "Molecules/Menubar",
  component: Menubar,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Menubar>;

export const Default: Story = {
  render: () => (
    <Menubar
      menus={[
        {
          label: "File",
          items: [
            { label: "New", onClick: () => {} },
            { label: "Open", onClick: () => {} },
            { separator: true, label: "sep" },
            { label: "Export", onClick: () => {} },
          ],
        },
        {
          label: "Edit",
          items: [
            { label: "Undo", onClick: () => {} },
            { label: "Redo", onClick: () => {} },
          ],
        },
      ]}
    />
  ),
};

