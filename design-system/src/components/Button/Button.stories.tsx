import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Button, IconButton } from "./Button";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { ThemeToggle } from "../ThemeToggle";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Atoms/Button",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-8 space-y-4">
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Light and dark mode examples
export const LightAndDark: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text-primary">Buttons in Light/Dark Mode</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="filled" color="primary">Primary</Button>
          <Button variant="outlined" color="primary">Outlined</Button>
          <Button variant="filled" color="secondary">Secondary</Button>
          <Button variant="outlined" color="secondary">Secondary Outlined</Button>
          <Button variant="filled" color="destructive">Destructive</Button>
          <Button variant="outlined" color="destructive">Destructive Outlined</Button>
        </div>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text-primary">New variants (token-driven)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="text-xs font-semibold text-text-secondary">Brand</div>
            <div className="flex flex-wrap gap-3">
              <Button tone="brand" variant="solid">Solid</Button>
              <Button tone="brand" variant="outline">Outline</Button>
              <Button tone="brand" variant="ghost">Ghost</Button>
              <Button tone="brand" variant="link">Link</Button>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-xs font-semibold text-text-secondary">Danger</div>
            <div className="flex flex-wrap gap-3">
              <Button tone="danger" variant="solid">Solid</Button>
              <Button tone="danger" variant="outline">Outline</Button>
              <Button tone="danger" variant="ghost">Ghost</Button>
              <Button tone="danger" variant="link">Link</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const IconsAndLoading: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text-primary">Icons + loading</h3>
        <div className="flex flex-wrap gap-3 items-center">
          <Button tone="brand" startIcon={<span aria-hidden>↗</span>}>Start icon</Button>
          <Button tone="brand" endIcon={<span aria-hidden>→</span>}>End icon</Button>
          <Button tone="brand" loading loadingText="Saving…">Save</Button>
          <Button tone="danger" variant="outline" loading spinnerPlacement="end">Delete</Button>
        </div>
      </div>
    </div>
  ),
};

export const IconButtons: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text-primary">IconButton</h3>
        <div className="flex gap-3 items-center">
          <IconButton ariaLabel="Add" tone="brand" icon={<span aria-hidden>＋</span>} />
          <IconButton ariaLabel="Settings" tone="neutral" variant="ghost" icon={<span aria-hidden>⚙</span>} />
          <IconButton ariaLabel="Delete" tone="danger" icon={<span aria-hidden>🗑</span>} />
        </div>
      </div>
    </div>
  ),
};

export const AsChild: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text-primary">asChild (polymorphic)</h3>
        <div className="flex flex-wrap gap-3 items-center">
          <Button asChild tone="brand" variant="solid" startIcon={<span aria-hidden>↗</span>}>
            <a href="#button-as-child">Anchor button</a>
          </Button>
          <Button asChild tone="neutral" variant="outline" disabledReason="You don’t have permission." disabled>
            <a href="#disabled-anchor">Disabled anchor</a>
          </Button>
        </div>
      </div>
    </div>
  ),
};

