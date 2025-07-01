import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { HelperCard, HelperCardProps } from './HelperCard';

export default {
  title: 'Components/HelperCard',
  component: HelperCard,
  argTypes: {
    title: {
      control: 'text',
      description: 'The name/title of the helper',
    },
    handle: {
      control: 'text',
      description: 'The handle/tag of the helper (without @ symbol)',
    },
    avatarUrl: {
      control: 'text',
      description: 'URL of the avatar image',
    },
    bgColor: {
      control: 'text',
      description: 'Background color class for the card',
    },
    onClick: {
      action: 'clicked',
      description: 'Optional click handler',
    },
  },
} as Meta<typeof HelperCard>;

// Default Template
const Template: StoryFn<typeof HelperCard> = (args: HelperCardProps) => (
  <HelperCard {...args} />
);

// Default state
export const Default = Template.bind({});
Default.args = {
  title: 'Strategy',
  handle: 'strategy',
};

// With Avatar
export const WithAvatar = Template.bind({});
WithAvatar.args = {
  ...Default.args,
  avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
};

// Custom Background
export const CustomBackground = Template.bind({});
CustomBackground.args = {
  ...Default.args,
  bgColor: 'bg-blue-50 dark:bg-blue-900',
};

// Dark Mode Example
export const DarkMode = Template.bind({});
DarkMode.args = {
  ...Default.args,
};
DarkMode.parameters = {
  backgrounds: {
    default: 'dark',
  },
};

// Multiple Cards Example
export const MultipleCards: StoryFn<typeof HelperCard> = () => (
  <div className="flex flex-col gap-2">
    <div className="flex gap-2">
      <HelperCard 
        title="Strategy"
        handle="strategy"
      />
      <HelperCard 
        title="Code Review"
        handle="codereview"
        bgColor="bg-blue-50 dark:bg-blue-900"
      />
    </div>
    <div className="flex gap-2">
      <HelperCard 
        title="Documentation"
        handle="docs"
        bgColor="bg-green-50 dark:bg-green-900"
      />
      <HelperCard 
        title="Long Helper Name"
        handle="longhandlename"
      />
    </div>
  </div>
); 