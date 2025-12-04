import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { NavigationMenu } from "./NavigationMenu";

const meta: Meta<typeof NavigationMenu> = {
  component: NavigationMenu,
  title: "designsystem/NavigationMenu",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const menuItems = [
  { label: "Home", href: "#" },
  {
    label: "Products",
    children: [
      { label: "Product 1", href: "#" },
      { label: "Product 2", href: "#" },
      { label: "Product 3", href: "#" },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Service 1", href: "#" },
      { label: "Service 2", href: "#" },
    ],
  },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

// Basic navigation menu
export const Basic: Story = {
  args: {
    items: menuItems,
  },
};

// With active item
export const WithActive: Story = {
  args: {
    items: menuItems,
    activeItem: "Products",
  },
};

// Vertical
export const Vertical: Story = {
  args: {
    items: menuItems,
    orientation: "vertical",
  },
};

