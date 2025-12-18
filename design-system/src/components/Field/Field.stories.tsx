import type { Meta, StoryObj } from "@storybook/react-webpack5";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldContent,
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldSeparator,
  FieldTitle,
} from "./Field";
import { Input } from "../FormInput/Input";
import { Checkbox } from "../Checkbox";
import { Button } from "../Button";
import { ThemeProvider } from "../../contexts/ThemeContext";

const meta: Meta<typeof Field> = {
  component: Field,
  title: "Molecules/Field",
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
      <Field>
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <Input id="username" placeholder="Enter username" />
        <FieldDescription>
          Choose a unique username for your account.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input id="password" type="password" placeholder="Enter password" />
        <FieldDescription>
          Must be at least 8 characters long.
        </FieldDescription>
      </Field>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="email" placeholder="Enter email" />
        <FieldError>Please enter a valid email address.</FieldError>
      </Field>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <Field orientation="horizontal">
        <FieldLabel htmlFor="remember">Remember me</FieldLabel>
        <Checkbox id="remember" />
      </Field>
    </div>
  ),
};

export const WithFieldSet: Story = {
  render: () => (
    <div className="max-w-md">
      <FieldSet>
        <FieldLegend>Payment Information</FieldLegend>
        <FieldDescription>
          Enter your payment details to complete the purchase.
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="card-name">Name on Card</FieldLabel>
            <Input id="card-name" placeholder="John Doe" />
          </Field>
          <Field>
            <FieldLabel htmlFor="card-number">Card Number</FieldLabel>
            <Input id="card-number" placeholder="1234 5678 9012 3456" />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <div className="max-w-md">
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Account Information</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" placeholder="John Doe" />
            </Field>
            <Field>
              <FieldLabel htmlFor="email2">Email</FieldLabel>
              <Input id="email2" type="email" placeholder="john@example.com" />
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend>Preferences</FieldLegend>
          <FieldGroup>
            <Field orientation="horizontal">
              <Checkbox id="newsletter" />
              <FieldContent>
                <FieldLabel htmlFor="newsletter">Subscribe to newsletter</FieldLabel>
                <FieldDescription>
                  Receive updates about new features and products.
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldGroup>
        </FieldSet>
        <Field orientation="horizontal">
          <Button>Submit</Button>
          <Button variant="outlined">Cancel</Button>
        </Field>
      </FieldGroup>
    </div>
  ),
};
