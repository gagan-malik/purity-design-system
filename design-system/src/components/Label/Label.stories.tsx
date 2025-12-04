import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Label } from "./Label";
import { Input } from "../FormInput/Input";

const meta: Meta<typeof Label> = {
  component: Label,
  title: "designsystem/Label",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic label
export const Basic: Story = {
  render: () => (
    <div className="p-4">
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Enter your name" />
    </div>
  ),
};

// Required label
export const Required: Story = {
  render: () => (
    <div className="p-4">
      <Label htmlFor="email" required>
        Email Address
      </Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  ),
};

// Multiple labels
export const FormExample: Story = {
  render: () => (
    <div className="p-4 space-y-4 max-w-md">
      <div>
        <Label htmlFor="firstName" required>
          First Name
        </Label>
        <Input id="firstName" placeholder="John" />
      </div>
      <div>
        <Label htmlFor="lastName" required>
          Last Name
        </Label>
        <Input id="lastName" placeholder="Doe" />
      </div>
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Input id="bio" placeholder="Tell us about yourself" />
      </div>
    </div>
  ),
};

