import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FormGroupV2 from './FormGroupV2';

const meta: Meta<typeof FormGroupV2> = {
  title: 'Components/FormGroupV2',
  component: FormGroupV2,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // No argTypes for value/onChange, as fields are now uncontrolled
};

export default meta;
type Story = StoryObj<typeof FormGroupV2>;

export const Default: Story = {
  args: {
    className: '',
  },
};

export const WithValues: Story = {
  args: {
    className: '',
  },
}; 