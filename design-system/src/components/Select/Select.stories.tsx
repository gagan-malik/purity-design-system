import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Select } from "../../index";
import companyAvatarIcon from "../../assets/icons/companyAvatar.svg";
import avatar from "../../assets/icons/popover/Avatar.svg";
import account from "../../assets/icons/popover/account.svg";
import logout from "../../assets/icons/popover/logout.svg";
import { DesignSpecs } from "../../../stories/_shared/DesignSpecs";
import { ComponentSpecsTable, TokenSpec } from "../../../stories/_shared/ComponentSpecsTable";

const people = [
  {
    id: 1,
    name: "Leslie Alexander",
    render: (id: string) => (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingRight: "10px",
          alignItems: "center",
        }}
      >
        {<img src={companyAvatarIcon} />} Leslie Alexander
      </div>
    ),
  },
  { id: 2, name: "Alexander" },
  { id: 3, name: "Leslie er" },
  { id: 4, name: "Leslie" },
  { id: 5, name: "Leslder", disable: true },

  // More users...
];

const data2 = [
  { id: 1, name: "account", menuRender: { heading: "ACCOUNT TESTING WITH LONG STRING" } },
  {
    id: 2,
    name: "Olivia Rhyde",
    menuRender: {
      title: "Molecules/Select",
      subHeading: "olivia@untitledui.com",
      img: avatar,
      underline: true,
    },
  },
  {
    id: 3,
    name: "Manage Account",
    menuRender: { title: "Manage Account", img: account, underline: true },
  },
  { id: 4, name: "upgrade", menuRender: { heading: "UPGRADE" } },
  {
    id: 5,
    name: "try the pro plan",
    menuRender: {
      title: "Try the Pro plan",
      badge: (
        <div className="bg-blue-600 px-2 rounded-sm text-white">
          Free 30 day trial
        </div>
      ),
    },
  },
  { id: 6, name: "logout", menuRender: { title: "Logout", img: logout } },
];

const data1 = [
  { id: 7, name: "account", menuRender: { heading: "ACCOUNT" } },
  {
    id: 8,
    name: "Olivia Rhyde",
    menuRender: {
      title: "Olivia Rhyde",
      subHeading: "olivia@untitledui.com",
      img: avatar,
      underline: true,
    },
  },
  {
    id: 9,
    name: "Manage Account",
    menuRender: { title: "Manage Account", img: account, underline: true },
  },
  { id: 10, name: "upgrade", menuRender: { heading: "UPGRADE" } },
  {
    id: 11,
    name: "try the pro plan",
    menuRender: {
      title: "Try the Pro plan",
      badge: (
        <div className="bg-blue-600 px-2 rounded-sm text-white">
          Free 30 day trial
        </div>
      ),
    },
  },
  { id: 12, name: "logout", menuRender: { title: "Logout", img: logout } },
];

const meta: Meta<typeof Select> = {
  component: Select,
  title: "Molecules/Select",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
export const heading: Story = {
  args: {
    options: people,
    defaultSelected: people[1],
    label: "Default Select",
    required: true,
  },
};

export const CheckSelect: Story = {
  args: {
    options: data2,
    placeholder: "select a menu",
    label: "Menu Select",
    required: true,
    defautFocus: true,
  },
};

export const RadioSelect: Story = {
  args: {
    options: data2,
    placeholder: "select a menu",
    label: "Menu Select",
    required: true,
    defautFocus: true,
    type: "radio",
  },
};

export const CheckboxSelect: Story = {
  args: {
    options: [...data2, ...data1],
    placeholder: "select a menu",
    label: "Menu Select",
    required: true,
    defautFocus: true,
    type: "checkbox",
    size:"medium"
  },
};

export const GhostCheckSelect: Story = {
  args: {
    options: data2,
    placeholder: "select a menu",
    label: "Menu Select",
    required: true,
    defautFocus: true,
    variant: "ghost",
  },
};

export const SelectWithoutSearch: Story = {
  args: {
    options: data2,
    placeholder: (
      <div className="flex flex-row">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8334 5.83333L9.9038 3.9741C9.63625 3.439 9.50247 3.17144 9.30289 2.97597C9.1264 2.80311 8.91368 2.67164 8.68014 2.59109C8.41605 2.5 8.11692 2.5 7.51866 2.5H4.33341C3.39999 2.5 2.93328 2.5 2.57676 2.68166C2.26316 2.84144 2.00819 3.09641 1.8484 3.41002C1.66675 3.76654 1.66675 4.23325 1.66675 5.16667V5.83333M1.66675 5.83333H14.3334C15.7335 5.83333 16.4336 5.83333 16.9684 6.10582C17.4388 6.3455 17.8212 6.72795 18.0609 7.19836C18.3334 7.73314 18.3334 8.4332 18.3334 9.83333V13.5C18.3334 14.9001 18.3334 15.6002 18.0609 16.135C17.8212 16.6054 17.4388 16.9878 16.9684 17.2275C16.4336 17.5 15.7335 17.5 14.3334 17.5H5.66675C4.26662 17.5 3.56655 17.5 3.03177 17.2275C2.56137 16.9878 2.17892 16.6054 1.93923 16.135C1.66675 15.6002 1.66675 14.9001 1.66675 13.5V5.83333ZM10.0001 14.1667V9.16667M7.50008 11.6667H12.5001"
            stroke="#6E7781"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div className="pl-2">in</div>
      </div>
    ),
    label: "Menu Select",
    required: true,
    defautFocus: true,
    variant: "ghost",
    disableSearch: true,
  },
};

// Select token specifications
const selectTokens: TokenSpec[] = [
  {
    name: "Select Background",
    cssVariable: "var(--bg-primary)",
    description: "Background color for select input",
    usage: "Default background for select field",
  },
  {
    name: "Select Text",
    cssVariable: "var(--text-primary)",
    description: "Text color for selected value",
    usage: "Text color for selected option",
  },
  {
    name: "Select Border",
    cssVariable: "var(--border-primary)",
    description: "Border color for select field",
    usage: "Default border color",
  },
  {
    name: "Select Placeholder",
    cssVariable: "var(--text-placeholder)",
    description: "Text color for placeholder",
    usage: "Placeholder text styling",
  },
  {
    name: "Dropdown Background",
    cssVariable: "var(--bg-primary)",
    description: "Background color for dropdown menu",
    usage: "Dropdown menu background",
  },
  {
    name: "Dropdown Item Hover",
    cssVariable: "var(--bg-secondary)",
    description: "Background color for hovered dropdown item",
    usage: "Applied on hover for menu items",
  },
  {
    name: "Dropdown Shadow",
    cssVariable: "var(--shadow-md)",
    description: "Shadow for dropdown menu",
    usage: "Elevation for dropdown",
  },
  {
    name: "Focus Ring",
    cssVariable: "var(--ring)",
    description: "Focus ring color",
    usage: "Applied on focus for accessibility",
  },
  {
    name: "Disabled Background",
    cssVariable: "var(--bg-disabled)",
    description: "Background color for disabled select",
    usage: "Applied when select is disabled",
  },
  {
    name: "Disabled Text",
    cssVariable: "var(--text-disabled)",
    description: "Text color for disabled select",
    usage: "Text color when disabled",
  },
];

export const DesignSpecs: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1200 }}>
      <DesignSpecs
        component="Select"
        dimensions={{
          minHeight: "44px (touch target minimum)",
          width: "100% (full width by default)",
        }}
        spacing={{
          padding: "var(--spacing-sm) to var(--spacing-md)",
          paddingLeft: "var(--spacing-md)",
          paddingRight: "var(--spacing-md)",
          gap: "var(--spacing-xs) (between elements)",
        }}
        typography={{
          fontSize: "var(--text-base) (1rem)",
          fontWeight: "400 (normal)",
          lineHeight: "1.5",
          fontFamily: "var(--sans)",
        }}
        colors={{
          background: "var(--bg-primary)",
          text: "var(--text-primary)",
          border: "var(--border-primary)",
          hover: {
            background: "var(--bg-secondary)",
          },
          disabled: {
            background: "var(--bg-disabled)",
            text: "var(--text-disabled)",
            border: "var(--border-disabled)",
          },
        }}
        states={[
          {
            name: "Default",
            description: "Default select state",
            visual: <Select data={people} label="Select Option" />,
          },
          {
            name: "With Selection",
            description: "Select with selected value",
            visual: <Select data={people} label="Selected" defaultValue={people[0]} />,
          },
          {
            name: "Open/Dropdown",
            description: "Select with dropdown menu open",
            visual: <Select data={people} label="Open" />,
          },
          {
            name: "Disabled",
            description: "Select in disabled state",
            visual: <Select data={people} label="Disabled" disabled />,
          },
          {
            name: "With Search",
            description: "Select with search functionality",
            visual: <Select data={people} label="Searchable" />,
          },
        ]}
      />

      <div style={{ marginTop: 48 }}>
        <ComponentSpecsTable tokens={selectTokens} title="Select Token Reference" />
      </div>
    </div>
  ),
};
