import type { Meta, StoryObj } from "@storybook/react-webpack5";
// import type { Meta, StoryObj } from "@storybook/react-webpack5";
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
import { DesignSpecs } from "../../../stories/_shared/DesignSpecs";
import { ComponentSpecsTable, TokenSpec } from "../../../stories/_shared/ComponentSpecsTable";
import { UsageGuidelines } from "../../../stories/_shared/UsageGuidelines";

const meta: Meta<typeof Mdl> = {
  component: Mdl,
  title: "Organisms/Modal",
  tags: ["autodocs"],
  parameters: {
    // Figma design link - add your Figma file URL here
    // design: {
    //   type: 'figma',
    //   url: 'https://www.figma.com/file/YOUR_FILE_ID/Modal-Design',
    // },
  },
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

//modal without header 
export const ModalWithoutHeader: Story = {
  args: {
    ...Default.args,
    header: null,
  },
};

// Modal token specifications
const modalTokens: TokenSpec[] = [
  {
    name: "Modal Background",
    cssVariable: "var(--bg-primary)",
    description: "Background color for modal content",
    usage: "Modal content area background",
  },
  {
    name: "Modal Overlay",
    cssVariable: "var(--bg-overlay)",
    description: "Background color for modal overlay/backdrop",
    usage: "Semi-transparent overlay behind modal",
  },
  {
    name: "Modal Shadow",
    cssVariable: "var(--shadow-modal)",
    description: "Shadow for modal elevation",
    usage: "Applied to modal container for depth",
  },
  {
    name: "Modal Border Radius",
    cssVariable: "var(--radius-lg) to var(--radius-xl)",
    description: "Border radius for modal corners",
    usage: "Rounded corners on modal container",
  },
  {
    name: "Modal Padding",
    cssVariable: "var(--spacing-lg) to var(--spacing-xl)",
    description: "Internal padding for modal content",
    usage: "Padding inside modal",
  },
  {
    name: "Modal Header Text",
    cssVariable: "var(--text-primary)",
    description: "Text color for modal titles",
    usage: "Modal header/title text",
  },
  {
    name: "Modal Content Text",
    cssVariable: "var(--text-primary)",
    description: "Text color for modal content",
    usage: "Modal body text",
  },
  {
    name: "Modal Border",
    cssVariable: "var(--border-secondary)",
    description: "Border color for modal (if applicable)",
    usage: "Modal container border",
  },
];

export const DesignSpecs: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <div style={{ padding: 24, maxWidth: 1200 }}>
        <button onClick={() => setIsOpen(true)} style={{ padding: "12px 24px", backgroundColor: "var(--bg-brand-solid)", color: "var(--text-white)", border: "none", borderRadius: "8px", cursor: "pointer" }}>
          Open Modal for Specs
        </button>
        {isOpen && (
          <Mdl
            onClose={() => setIsOpen(false)}
            header={<ModalHeader title="Modal Design Specs" showCrossIcon />}
            footer={
              <ModalFooter
                onCancel={() => setIsOpen(false)}
                closeActionLabel="Close"
                actionLabel="OK"
              />
            }
          >
            <DesignSpecs
              component="Modal"
              dimensions={{
                width: "var(--width-sm) to var(--width-2xl) (size-dependent)",
                minWidth: "320px (mobile)",
                maxWidth: "640px to 1024px (desktop)",
              }}
              spacing={{
                padding: "var(--spacing-lg) to var(--spacing-xl)",
                gap: "var(--spacing-md)",
              }}
              typography={{
                fontSize: "var(--text-base) (1rem)",
                fontWeight: "400 (normal) for content, 600 (semibold) for titles",
                lineHeight: "1.5",
                fontFamily: "var(--sans)",
              }}
              colors={{
                background: "var(--bg-primary)",
                text: "var(--text-primary)",
                border: "var(--border-secondary)",
              }}
              states={[
                {
                  name: "Default",
                  description: "Default modal state",
                  visual: <div>Modal content area</div>,
                },
                {
                  name: "With Overlay",
                  description: "Modal with backdrop overlay",
                  visual: <div style={{ padding: 16, backgroundColor: "var(--bg-overlay)", borderRadius: 8 }}>Overlay background</div>,
                },
                {
                  name: "Small",
                  description: "Small modal variant (320px-480px)",
                  visual: <div>Small modal</div>,
                },
                {
                  name: "Large",
                  description: "Large modal variant (640px-1024px)",
                  visual: <div>Large modal</div>,
                },
              ]}
            />
            <div style={{ marginTop: 48 }}>
              <ComponentSpecsTable tokens={modalTokens} title="Modal Token Reference" />
            </div>
          </Mdl>
        )}
      </div>
    );
  },
};

export const Usage: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24, color: "var(--text-primary)" }}>
        Usage Guidelines
      </h2>
      <UsageGuidelines
        whenToUse={[
          "For important confirmations and actions",
          "For focused user interactions",
          "For displaying detailed forms or content",
          "For critical information that requires attention",
          "For multi-step workflows",
        ]}
        whenNotToUse={[
          "For simple notifications (use Toast or Alert)",
          "For non-critical information (use Popover or Tooltip)",
          "For mobile interfaces (use MobileSheet or ActionSheet)",
          "For navigation (use NavigationMenu or Drawer)",
          "For contextual actions (use ContextMenu)",
        ]}
        commonMistakes={[
          "Using modals for every interaction (creates modal fatigue)",
          "Not providing clear close/cancel actions",
          "Making modals too large or complex",
          "Not handling escape key to close",
          "Stacking multiple modals",
        ]}
        alternatives={[
          "AlertDialog for confirmations",
          "Popover for contextual information",
          "Sheet for side panels",
          "Drawer for mobile menus",
          "Toast for non-blocking notifications",
        ]}
      />
    </div>
  ),
};
