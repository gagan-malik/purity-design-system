import type { Meta, StoryObj } from "@storybook/react-webpack5";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
  ItemSeparator,
} from "./Item";
import { Button } from "../Button";
import { Avatar } from "../Avatar";
import { ThemeProvider } from "../../contexts/ThemeContext";
// Simple SVG icons
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const ShieldAlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const meta: Meta<typeof Item> = {
  component: Item,
  title: "Molecules/Item",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-8">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Basic Item</ItemTitle>
          <ItemDescription>
            A simple item with title and description.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outlined" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <HomeIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Dashboard</ItemTitle>
          <ItemDescription>
            Overview of your account and activity.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon />
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <ShieldAlertIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Security Alert</ItemTitle>
          <ItemDescription>
            New login detected from unknown device.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outlined">
            Review
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
};

export const WithAvatar: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <Item variant="outline">
        <ItemMedia>
          <Avatar size="sm">ER</Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Evil Rabbit</ItemTitle>
          <ItemDescription>Last seen 5 months ago</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outlined">
            Invite
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
};

export const AsLink: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <Item variant="outline" asChild>
        <a href="#" className="flex items-center gap-3 p-3 border border-border rounded-md">
          <ItemContent>
            <ItemTitle>Visit our documentation</ItemTitle>
            <ItemDescription>
              Learn how to get started with our components.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon />
          </ItemActions>
        </a>
      </Item>
      <Item variant="outline" asChild>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 border border-border rounded-md"
        >
          <ItemContent>
            <ItemTitle>External resource</ItemTitle>
            <ItemDescription>
              Opens in a new tab with security attributes.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ExternalLinkIcon />
          </ItemActions>
        </a>
      </Item>
    </div>
  ),
};

export const ItemList: Story = {
  render: () => (
    <div className="max-w-md">
      <ItemGroup>
        <Item variant="outline">
          <ItemMedia>
            <Avatar size="sm">S</Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>shadcn</ItemTitle>
            <ItemDescription>shadcn@vercel.com</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="ghost">
              +
            </Button>
          </ItemActions>
        </Item>
        <ItemSeparator />
        <Item variant="outline">
          <ItemMedia>
            <Avatar size="sm">M</Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>maxleiter</ItemTitle>
            <ItemDescription>maxleiter@vercel.com</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="ghost">
              +
            </Button>
          </ItemActions>
        </Item>
        <ItemSeparator />
        <Item variant="outline">
          <ItemMedia>
            <Avatar size="sm">E</Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>evilrabbit</ItemTitle>
            <ItemDescription>evilrabbit@vercel.com</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="ghost">
              +
            </Button>
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  ),
};
