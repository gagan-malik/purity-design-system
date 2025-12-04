import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { SegmentTab } from "./index";

const meta = {
  title: "designsystem/SegmentTab",
  tags: ["autodocs"],
  component: SegmentTab,
} satisfies Meta<typeof SegmentTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      { id: "tab1", label: "Tab 1" },
      { id: "tab2", label: "Tab 2" },
      { id: "tab3", label: "Tab 3" },
    ],
  },
};

export const WithDefaultTab: Story = {
  args: {
    tabs: [
      { id: "tab1", label: "Tab 1" },
      { id: "tab2", label: "Tab 2" },
      { id: "tab3", label: "Tab 3" },
    ],
    defaultTab: "tab2",
  },
};

export const WithCallback: Story = {
  args: {
    tabs: [
      { id: "tab1", label: "Tab 1" },
      { id: "tab2", label: "Tab 2" },
      { id: "tab3", label: "Tab 3" },
    ],
    onTabChange: (tabId) => console.log(`Tab changed to: ${tabId}`),
  },
};

export const WithBackground: Story = {
  args: {
    tabs: [
      { id: "tab1", label: "Home" },
      { id: "tab2", label: "Profile" },
      { id: "tab3", label: "Messages" },
    ],
    defaultBackground: true,
  },
};
