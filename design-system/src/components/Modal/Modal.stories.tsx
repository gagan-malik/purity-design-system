import type { Meta, StoryObj } from "@storybook/react";
// import type { Meta, StoryObj } from "@storybook/react";
// import React from "react";
import { Avatar, Modal as Mdl } from "../../index";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import BasicForm from "./common/BasicForm";
// import dangerIcon from "../../assets/icons/dangerIcon.svg";
// (https://www.npmjs.com/package/@storybook/react)";
import React from "react";
// import { Modal as Mdl, ModalHeader, ModalFooter, BasicForm } from "../../index";
import dangerIcon from "../../assets/icons/removeUser.svg";
import deleteRed from "../../assets/icons/deleteRed.svg";

const meta: Meta<typeof Mdl> = {
  component: Mdl,
  title: "designsystem/Modal",
  tags: ["autodocs"],
  argTypes: {
    header: { control: "input" },
    footer: { control: "input" },
    children: { control: "input" },
    widthVariant: {
      control: "select",
      options: ["small", "default", "large", "full"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Base Modal
export const Default: Story = {
  args: {
    header: <ModalHeader title="Default Modal" showCrossIcon />,
    children: <BasicForm />,
    footer: (
      <ModalFooter
        onCancel={() => console.log("modal closed")}
        onShown={() => console.log("Modal opened!")}
        closeActionLabel="Close"
        actionLabel="Save"
      />
    ),
    widthVariant: "reportmodal",
  },
};

// Small Modal
export const SmallModal: Story = {
  args: {
    ...Default.args,
    widthVariant: "small",
  },
};

// Large Modal
export const LargeModal: Story = {
  args: {
    ...Default.args,
    widthVariant: "large",
  },
};

// Full Width Modal
export const FullWidthModal: Story = {
  args: {
    ...Default.args,
    widthVariant: "full",
  },
};

// Modal with Icon in Header
export const ModalWithIcon: Story = {
  args: {
    header: (
      <ModalHeader
        title="Remove Username?"
        headerIconUrl={dangerIcon}
        description="Username will no longer have access to this workspace and any of its contents, including their documents, actions, and files."
      />
    ),
    widthVariant: "small",

    footer: (
      <ModalFooter
        actionLabel="Remove"
        actionButtonColor="destructive"
        actionButtonShape="circle"
        cancelButtonVariant="outlined"
        closeActionLabel="Cancel"
        cancelButtonColor="secondary"
        onCancel={() => console.log("modal closed")}
        onShown={() => console.log("modal open")}
      />
    ),
  },
};
export const ModalWithAvatar: Story = {
  args: {
    header: (
      <ModalHeader
        title="Remove Username?"
        headerIconUrl={<Avatar  size="xl" border="none" background="bg-bg-error-secondary" icon={deleteRed}/>}
        description="Username will no longer have access to this workspace and any of its contents, including their documents, actions, and files."
      />
    ),
    widthVariant: "small",

    footer: (
      <ModalFooter
        actionLabel="Remove"
        actionButtonColor="destructive"
        actionButtonShape="circle"
        cancelButtonVariant="outlined"
        closeActionLabel="Cancel"
        cancelButtonColor="secondary"
        onCancel={() => console.log("modal closed")}
        onShown={() => console.log("modal open")}
      />
    ),
  },
};
// Modal with Description
export const ModalWithDescription: Story = {
  args: {
    ...Default.args,
    header: (
      <ModalHeader
        title="Modal with Description"
        description="This is a description for the modal"
        highlightDescription={true}
      />
    ),
  },
};

// Modal without Footer
export const ModalWithoutFooter: Story = {
  args: {
    ...Default.args,
    footer: null,
  },
};

// Modal without Top-right cross Icon
export const ModalWithoutCrossIcon: Story = {
  args: {
    ...Default.args,

    header: <ModalHeader title="Without Cross Icon" showCrossIcon={false} />,
  },
};

// Modal with Disabled Action
export const ModalWithDisabledAction: Story = {
  args: {
    ...Default.args,
    footer: (
      <ModalFooter
        onCancel={() => console.log("modal closed")}
        onShown={() => console.log("modal opened")}
        closeActionLabel="Close"
        actionLabel="Save"
        disableAction={true}
      />
    ),
  },
};
