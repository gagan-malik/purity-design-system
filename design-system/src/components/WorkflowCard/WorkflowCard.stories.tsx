import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { WorkflowCard, WorkflowCardProps } from './WorkflowCard';

export default {
  title: 'Components/WorkflowCard',
  component: WorkflowCard,
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the workflow',
    },
    description: {
      control: 'text',
      description: 'The description of the workflow',
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
    onMenuClick: {
      action: 'menu clicked',
      description: 'Optional menu click handler',
    },
  },
} as Meta<typeof WorkflowCard>;

// Default Template
const Template: StoryFn<typeof WorkflowCard> = (args: WorkflowCardProps) => (
  <WorkflowCard {...args} />
);

// Default state
export const Default = Template.bind({});
Default.args = {
  title: 'Editor',
  description: 'Elevate your writing. Write better. Edit faster. Publish smarter.',
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
export const MultipleCards: StoryFn<typeof WorkflowCard> = () => (
  <div className="flex flex-wrap gap-4">
    <WorkflowCard 
      title="Editor"
      description="Elevate your writing. Write better. Edit faster."
    />
    <WorkflowCard 
      title="Code Review"
      description="AI-powered code review assistant."
      bgColor="bg-blue-50 dark:bg-blue-900"
    />
    <WorkflowCard 
      title="Documentation"
      description="Generate comprehensive documentation."
      bgColor="bg-green-50 dark:bg-green-900"
    />
  </div>
); 