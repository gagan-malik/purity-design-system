import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Form } from "./Form";
import { Input } from "../FormInput/Input";
import { Button } from "../Button";
import { Label } from "../Label";

const meta: Meta<typeof Form> = {
  component: Form,
  title: "designsystem/Form",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic form
export const Basic: Story = {
  render: () => (
    <div className="p-4 max-w-md">
      <Form onSubmit={(e) => { e.preventDefault(); alert("Form submitted!"); }}>
        <div>
          <Label htmlFor="name" required>Name</Label>
          <Input id="name" placeholder="Enter your name" />
        </div>
        <div>
          <Label htmlFor="email" required>Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  ),
};

