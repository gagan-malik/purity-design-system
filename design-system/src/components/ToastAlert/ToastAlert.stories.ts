import type { Meta, StoryObj } from "@storybook/react";
import { ToastAlert } from "../../index";

const meta: Meta<typeof ToastAlert> = {
  component: ToastAlert,
  title: "designsystem/ToastAlert",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["basic", "primary", "secondary", "success", "warinng", "error"],
    },
    message: { contro: "input" },
  },
  args: {
    variant: "error",
    message: "We’ve just released a new feature",
  },
};

export default meta;
type Story = StoryObj<typeof ToastAlert>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
export const AlertBasic: Story = {
  args: {
    variant: "basic",
    actionLabel: "action",
    showDismiss: true,
    onActionClick: () => {
      window.alert("action clicked");
    },
    onClose: () => {
      window.alert("close clicked");
    },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.",
  },
};
export const AlertPrimaryWithDescription: Story = {
  args: {
    variant: "success",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.",
  },
};
export const AlertPrimary: Story = {
  args: { variant: "primary" },
};
export const AlertSecondary: Story = {
  args: { variant: "secondary" },
};
export const AlertWarning: Story = {
  args: { variant: "warinng" },
};
export const AlertWarningWithDescription: Story = {
  args: { variant: "warinng", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor." },
};
export const AlertSuccess: Story = {
  args: { variant: "success" },
};
export const AlertError: Story = {
  args: { variant: "error" },
};

// Add comment here about Primary to show on doc
// export const Primary:Story={
//   args={message:"Hello"}
//   render:(args)=> <Alert {...args}/>
// }
