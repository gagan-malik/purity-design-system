import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { AssistantInputV2, AssistantInputV2Props } from './AssistantInputV2';
import { ChangeEvent } from 'react';

export default {
  title: 'Components/AssistantInputV2',
  component: AssistantInputV2,
} as Meta<typeof AssistantInputV2>;

// Default state
export const Default = {
  args: {
    showAttachmentIcon: true,
    placeholderText: "Write something, or press '@' for helpers, '/' for workflows",
    onSend: (text: string) => console.log('Sent:', text),
    isSendDisabled: false,
  },
};

// With custom scope dropdown
export const WithScopeDropdown = {
  args: {
    ...Default.args,
    scopeDropdown: (
      <div className="rounded-[9999px] hover:bg-[#F3F4F6] dark:hover:bg-[#27272A] overflow-hidden flex flex-row items-center justify-center py-2 px-3 gap-1">
        <div className="flex flex-row items-center justify-center py-0 px-0.5">
          <div className="relative leading-5 font-semibold">Custom Scope</div>
        </div>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    ),
  },
};

// With file attachment
export const WithAttachment = {
  args: {
    ...Default.args,
    fileInfoDiv: (
      <div className="flex items-center gap-2 px-2 py-1 bg-[#F3F4F6] dark:bg-[#27272A] rounded-full">
        <span className="text-sm text-[#4B5563] dark:text-[#A1A1AA]">image.png</span>
        <button className="text-[#EF4444]">×</button>
      </div>
    ),
  },
};

// Disabled state
export const Disabled = {
  args: {
    ...Default.args,
    isSendDisabled: true,
  },
};

// With upgrade prompt
export const WithUpgradePrompt = {
  args: {
    ...Default.args,
    showUpgradeButton: true,
    upgradeMessage: "You are out of free daily assistant credits. Please wait 24 hours before trying again or consider upgrading for unlimited AI access.",
    upgradeClick: () => console.log('Upgrade clicked'),
  },
};

// Custom placeholder
export const CustomPlaceholder = {
  args: {
    ...Default.args,
    placeholderText: "Ask me anything about your code...",
  },
};

// Without attachment icon
export const WithoutAttachment = {
  args: {
    ...Default.args,
    showAttachmentIcon: false,
  },
};

// Interactive example with all features
export const Interactive = {
  args: {
    ...Default.args,
    onSend: (text: string) => alert(`Sending: ${text}`),
    handleAttachment: (e: ChangeEvent<HTMLInputElement>) => alert(`Selected file: ${e.target.files?.[0]?.name}`),
    upgradeClick: () => alert('Upgrade clicked'),
  },
};

// With custom bottom content
export const WithCustomBottomContent = {
  args: {
    ...Default.args,
    bottomMiddleContent: (
      <button
        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#F3F4F6] dark:hover:bg-[#27272A] transition-colors"
        onClick={() => alert('Custom button clicked!')}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10.8333 3.33337L17.5 10M17.5 10L10.8333 16.6667M17.5 10H2.5"
            stroke="currentColor"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    ),
  },
};

export const InFixedFrame: StoryFn<typeof AssistantInputV2> = (args: AssistantInputV2Props) => (
  <div className="w-[800px] h-[800px] bg-white dark:bg-[#121212] p-4 flex flex-col">
    <div className="flex-1">
      {/* This empty div represents content above the input */}
    </div>
    <AssistantInputV2 
      {...args}
      placeholderText="Type your message here..."
      onSend={(text: string) => console.log('Message sent:', text)}
    />
  </div>
);

InFixedFrame.args = {
  showUpgradeButton: false,
  isSendDisabled: false,
};

InFixedFrame.parameters = {
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#121212' },
    ],
  },
}; 