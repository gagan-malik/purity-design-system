import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { DropdownMenu } from "./DropdownMenu";
import { Button } from "../Button";

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
  title: "designsystem/DropdownMenu",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const menuItems = [
  { label: "Edit", onClick: () => alert("Edit") },
  { label: "Duplicate", onClick: () => alert("Duplicate") },
  { separator: true },
  {
    label: "More",
    children: [
      { label: "Share", onClick: () => alert("Share") },
      { label: "Archive", onClick: () => alert("Archive") },
    ],
  },
  { label: "Delete", onClick: () => alert("Delete") },
];

// Basic dropdown menu
export const Basic: Story = {
  render: () => (
    <div className="p-8">
      <DropdownMenu trigger={<Button>Open Menu</Button>} items={menuItems} />
    </div>
  ),
};

// With submenus
export const WithSubmenus: Story = {
  render: () => (
    <div className="p-8">
      <DropdownMenu
        trigger={<Button>Open Menu</Button>}
        items={[
          { label: "Item 1", onClick: () => alert("Item 1") },
          {
            label: "Item 2",
            children: [
              { label: "Sub-item 1", onClick: () => alert("Sub 1") },
              { label: "Sub-item 2", onClick: () => alert("Sub 2") },
            ],
          },
        ]}
      />
    </div>
  ),
};

