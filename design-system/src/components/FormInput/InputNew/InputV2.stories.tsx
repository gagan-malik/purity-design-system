import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import InputV2 from './InputV2';

const meta: Meta<typeof InputV2> = {
  title: 'Components/InputV2',
  component: InputV2,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [
        'text',
        'email',
        'password',
        'number',
        'tel',
        'url',
      ],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'dropdown'],
    },
    onChange: { action: 'changed' },
    onCopy: { action: 'copied' },
    onDropdownClick: { action: 'dropdown clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof InputV2>;

// Basic input without hint text
export const Default: Story = {
  args: {
    label: 'Label',
    value: '',
    placeholder: 'Placeholder',
    onChange: () => {},
    readOnly: false,
    className: '',
    hintText: '',
    showHint: false,
    showCopyButton: false,
    iconUrl: '',
    customClass: '',
    required: false,
    type: 'text',
    variant: 'default',
    onDropdownClick: () => {},
    dropdownOptions: [],
    onDropdownChange: () => {}
  },
};

// Input with hint text
export const WithHintText: Story = {
  args: {
    label: 'Action Key',
    placeholder: 'Enter action key',
    hintText: 'Use this for raising support tickets.',
    showHint: true,
  },
};

// Input with copy button
export const WithCopyButton: Story = {
  args: {
    label: 'API Key',
    placeholder: 'sk_test_51NkL2KSDdummy123456789',
    readOnly: true,
    hintText: 'Click the copy button to copy the API key to clipboard.',
    showHint: true,
    showCopyButton: true,
  },
};

// Read-only input
export const ReadOnly: Story = {
  args: {
    label: 'Action Key',
    placeholder: 'Enter action key',
    showHelpTooltip: false,
    helpText: '',
    readOnly: true,
    className: '',
    hintText: '',
    showHint: false,
    showCopyButton: false,
    iconUrl: '',
    customClass: '',
    required: false,
    type: 'text',
  },
};

// Input with custom width
export const CustomWidth: Story = {
  args: {
    label: 'Action Key',
    placeholder: 'Enter action key',
    className: 'w-[300px]',
  },
};

export const EmailInput: Story = {
  args: {
    label: 'Email',
    placeholder: 'john@doe.com',
    type: 'email',
    showHelpTooltip: true,
    helpText: 'Enter your workspace email ID here.',
    required: true,
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    showHelpTooltip: true,
    helpText: 'Password must be at least 8 characters.',
    required: true,
  },
};

export const DropdownVariant: Story = {
  args: {
    label: 'Select Option',
    placeholder: 'Choose an option',
    variant: 'dropdown',
    hintText: 'Click to open dropdown menu',
    showHint: true,
    onDropdownClick: () => console.log('Dropdown clicked'),
  },
}; 

export const WithDropdownFunctionality: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    variant: 'dropdown',
    value: 'United States',
    dropdownOptions: [
      'United States',
      'Canada',
      'Mexico',
      'United Kingdom',
      'Germany',
      'France',
    ],
    onDropdownChange: (value) => console.log('Selected country:', value),
  },
};

export const CustomCornerRadius = () => {
  return (
    <div className="p-4 max-w-md">
      <InputV2
        label="Mixed Corner Radius"
        placeholder="Type something..."
        className="rounded-none rounded-tl-2xl rounded-tr-xl rounded-br-lg"
        value=""
        onChange={() => {}}
      />
      <div className="mt-4 text-sm text-gray-600">
        <ul className="list-disc pl-4">
          <li>Top Left: rounded-2xl (16px)</li>
          <li>Top Right: rounded-xl (12px)</li>
          <li>Bottom Right: rounded-lg (8px)</li>
          <li>Bottom Left: rounded-none (0px)</li>
        </ul>
      </div>
    </div>
  );
};

CustomCornerRadius.parameters = {
  docs: {
    description: {
      story: 'This example shows how to customize individual corner radius of the input. Each corner has a different radius value.',
    },
  },
}; 