import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SectionHeaderV2 from './SectionHeaderV2';

const meta: Meta<typeof SectionHeaderV2> = {
  title: 'Components/SectionHeaderV2',
  component: SectionHeaderV2,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SectionHeaderV2>;

export const Default: Story = {
  args: {
    title: 'Change password',
    subtitle: 'Update your app login password here.',
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Change password',
  },
}; 