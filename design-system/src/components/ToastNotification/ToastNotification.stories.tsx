import type { Meta, StoryObj } from "@storybook/react";
import { ToastNotification } from "../../index";

const meta: Meta<typeof ToastNotification> = {
  component: ToastNotification,
  title: "designsystem/ToastNotification",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["Avatar", "undo", "alertcircle", "packaged", "uploadcloud", "success", "release"],
    },
    isDesktop: { control: { type: "boolean" } },
    isMobile: { control: { type: "boolean" } },
    message: { contro: "input" },
  },
  args: {
    variant: "Avatar",
    message: "Kathrine Moss",
    actionLabel: "Change Log",
    showDismiss: "Dismiss",
    onActionClick: () => {
      window.alert("action clicked");
    },
    onClose: () => {
      window.alert("close clicked");
    },
    description: "I’ve finished adding my notes. Happy for us to review whenever you’re ready!",
    isDesktop: true,  // Default to true
    isMobile: false,
  },
};

export default meta;
type Story = StoryObj<typeof ToastNotification>;

/*
 *👇 Render functions are a framework-specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc

export const ToastNotificationAvtar: Story = {
  args: {
    variant: "Avatar",
    isDesktop: true,
    isMobile: false,
    message: "Kathrine Moss",
    actionLabel: "Change Log",
    showDismiss: "Dismiss",
    onActionClick: () => {
      window.alert("action clicked");
    },
    onClose: () => {
      window.alert("close clicked");
    },
    description: "I’ve finished adding my notes. Happy for us to review whenever you’re ready!",
  },
};

export const ToastNotificationAvtarMobile: Story = {
  args: {
    variant: "Avatar",
    isDesktop: false,
    isMobile: true,
    message: "Kathrine Moss",
    actionLabel: "Change Log",
    showDismiss: "Dismiss",
    onActionClick: () => {
      window.alert("action clicked");
    },
    onClose: () => {
      window.alert("close clicked");
    },
    description: "I’ve finished adding my notes. Happy for us to review whenever you’re ready!",
  },
};

export const ToastNotificationAlert: Story = {
  args: {
    variant: "alertcircle",
    isDesktop: true,
    isMobile: false,
    message: "We’ve just released a new update!",
    actionLabel: "Change Log",
    showDismiss: "Dismiss",
    onActionClick: () => {
      window.alert("action clicked");
    },
    onClose: () => {
      window.alert("close clicked");
    },
    description: "I’ve finished adding my notes. Happy for us to review whenever you’re ready!",
  },
};
export const ToastNotificationAlertMobile: Story = {
  args: {
    variant: "alertcircle",
    isDesktop: false,
    isMobile: true,
    message: "We’ve just released a new update!",
    actionLabel: "Change Log",
    showDismiss: "Dismiss",
    onActionClick: () => {
      window.alert("action clicked");
    },
    onClose: () => {
      window.alert("close clicked");
    },
    description: "I’ve finished adding my notes. Happy for us to review whenever you’re ready!",
  },
};

export const ToastNotificationPackaged: Story = {
  args: {
    variant: "packaged",
    isDesktop: true,
    isMobile: false,
    message: "We’ve just released a new update!",
    actionLabel: "Install now",
    showDismiss: "Later",
    onActionClick: () => {
      window.alert("action clicked");
    },
    onClose: () => {
      window.alert("Later clicked");
    },
    description: "Includes the all new dashboard view.\nPages and exports will now load faster.",
  },
};
export const ToastNotificationPackagedMobile: Story = {
  args: {
    variant: "packaged",
    isDesktop: false,
    isMobile: true,
    message: "We’ve just released a new update!",
    actionLabel: "Install now",
    showDismiss: "Later",
    onActionClick: () => {
      window.alert("action clicked");
    },
    onClose: () => {
      window.alert("Later clicked");
    },
    description: "Includes the all new dashboard view.\nPages and exports will now load faster.",
  },
};

export const ToastNotificationUploadCloud: Story = {
  args: {
    variant: "uploadcloud",
    isDesktop: true,
    isMobile: false,
    message: "Uploading 'website-FINAL06.flg'",
    actionLabel: "Upload another",
    showDismiss: "Cancel",
    onActionClick: () => {
      window.alert("action clicked");
    },
    onClose: () => {
      window.alert("close clicked");
    },
    description: "Please wait while we upload your file.",
  },
};

export const ToastNotificationUploadCloudMobile: Story = {
  args: {
    variant: "uploadcloud",
    isDesktop: false,
    isMobile: true,
    message: "Uploading 'website-FINAL06.flg'",
    actionLabel: "Upload another",
    showDismiss: "Cancel",
    onActionClick: () => {
      window.alert("action clicked");
    },
    onClose: () => {
      window.alert("close clicked");
    },
    description: "Please wait while we upload your file.",
  },
};

export const ToastNotificationUndoAction: Story = {
  args: {
    variant: "undo",
    isDesktop: true,
    isMobile: false,
    message: "This project has been unpublished",
    onActionClick: () => {
      window.alert("action clicked");
    },
    actionLabel: "Undo action",
    showDismiss: false,
    description: "Removing all users has unpublished this project. Add users to republish.",
  },
};
export const ToastNotificationUndoActionMobile: Story = {
  args: {
    variant: "undo",
    isDesktop: false,
    isMobile: true,
    message: "This project has been unpublished",
    onActionClick: () => {
      window.alert("action clicked");
    },
    actionLabel: "Undo action",
    showDismiss: false,
    description: "Removing all users has unpublished this project. Add users to republish.",
  },
};

export const ToastNotificationSuccess: Story = {
  args: {
    variant: "success",
    isDesktop: true,
    isMobile: false,
    message: "Successfully updated profile",
    onActionClick: () => {
      window.alert("action clicked");
    },
    showDismiss: true,
    actionLabel: "View Changes",
    description: "Your changes have been saved and your profile is live. Your team can make edits.",
  },
};
export const ToastNotificationSuccessMobile: Story = {
  args: {
    variant: "success",
    isDesktop: false,
    isMobile: true,
    message: "Successfully updated profile",
    onActionClick: () => {
      window.alert("action clicked");
    },
    showDismiss: true,
    actionLabel: "View Changes",
    description: "Your changes have been saved and your profile is live. Your team can make edits.",
  },
};


export const ToastNotificationRelease: Story = {
  args: {
    variant: "release",
    isDesktop: true,
    isMobile: false,
    message: "We’ve just released a new update!",
    onActionClick: () => {
      window.alert("action clicked");
    },
    showDismiss: true,
    actionLabel: "Changelog",
    description: "Check out the all new dashboard view. Pages and exports now load faster.",
  },
};

export const ToastNotificationUpdateProfile: Story = {
  args: {
    variant: "UpdateProfile",
    isDesktop: true,
    isMobile: false,
    message: "Updates have been made to your profile",
    onActionClick: () => {
      window.alert("action clicked");
    },
    showDismiss: true,
    actionLabel: "Changelog",
    description: "Your team has made changes to your company profile since you last logged in.",
  },
};
export const ToastNotificationUpdateProfileMobile: Story = {
  args: {
    variant: "UpdateProfile",
    isDesktop: true,
    isMobile: false,
    message: "Updates have been made to your profile",
    onActionClick: () => {
      window.alert("action clicked");
    },
    showDismiss: true,
    actionLabel: "Changelog",
    description: "Your team has made changes to your company profile since you last logged in.",
  },
};

// Add comment here about Primary to show on doc
// export const Primary:Story={
//   args={message:"Hello"}
//   render:(args)=> <Alert {...args}/>
// }
