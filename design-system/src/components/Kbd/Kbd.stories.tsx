import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Kbd, KbdGroup } from "./Kbd";
import { ThemeProvider } from "../../contexts/ThemeContext";

const meta: Meta<typeof Kbd> = {
  component: Kbd,
  title: "Atoms/Kbd",
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

export const Default: Story = {
  render: () => <Kbd>Ctrl</Kbd>,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Kbd size="sm">Ctrl</Kbd>
      <Kbd size="md">Ctrl</Kbd>
      <Kbd size="lg">Ctrl</Kbd>
    </div>
  ),
};

export const KeyCombinations: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <span>+</span>
        <Kbd>K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>Shift</Kbd>
        <span>+</span>
        <Kbd>P</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
    </div>
  ),
};

export const InText: Story = {
  render: () => (
    <div className="space-y-2 text-sm">
      <p>
        Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open the command palette.
      </p>
      <p>
        Use <Kbd>Ctrl</Kbd> + <Kbd>B</Kbd> to toggle the sidebar.
      </p>
    </div>
  ),
};
