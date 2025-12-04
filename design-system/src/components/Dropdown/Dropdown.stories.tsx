import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Dropdown } from "../../index";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const data = [
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active flex w-full px-4 py-2 text-sm"}>
        Account settings
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        Support
      </a>
    ),
    isDisabled: true,
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        License
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        Sign out
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        Account settings
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        Support
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        License
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        Sign out
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        Account settings
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        Support
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        License
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        Sign out
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        Account settings
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        Support
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        License
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        Sign out
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        Account settings
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        Support
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        License
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        Sign out
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        Account settings
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        Support
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        License
      </a>
    ),
  },
  {
    render: () => (
      <a href="#" className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        Sign out
      </a>
    ),
  },
];

const checkDropdownData = [
  {
    id: 1,
    render: () => (
      <div className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>
        Account settings
      </div>
    ),
    selected: true,
  },
  {
    id: 2,
    render: () => (
      <div className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>Support</div>
    ),
    selected: true,
  },
  {
    id: 3,
    render: () => (
      <div className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>License</div>
    ),
    selected: false,
  },
  {
    id: 4,
    render: () => (
      <div className={"text-text-primary hover:bg-bg-active block px-4 py-2 text-sm"}>Sign out</div>
    ),
    selected: false,
  },
];

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: "designsystem/Dropdown",
  tags: ["autodocs"],
  argTypes: {},
  args: {
    data: data,
    dropdownPlaceholder: "Dropdown",
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
// export const heading: Story = {
//     args: { dropdownPlaceholder: "Dropdown", data: data },
// };

export const dropdown: Story = {
  render: () => (
    <div
      style={{
        alignItems: "flex-end",
        flex: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Dropdown dropdownPlaceholder="Dropdown" data={data} />
    </div>
  ),
};

export const checkDropdown: Story = {
  render: () => (
    <div
      style={{
        alignItems: "flex-end",
        flex: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Dropdown
        dropdownPlaceholder="Dropdown"
        data={checkDropdownData}
        type="check"
      />
    </div>
  ),
};
export const multiselectDropdown: Story = {
  render: () => (
    <div
      style={{
        alignItems: "flex-end",
        flex: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Dropdown
        dropdownPlaceholder="Dropdown"
        data={checkDropdownData}
        type="multiselect"
      />
    </div>
  ),
};

export const ghostDropdown: Story = {
  render: () => (
    <div
      style={{
        alignItems: "flex-end",
        flex: 1,
        display: "flex",
        height: "700px",
        width: "1400px",
        justifyContent: "center",
      }}
    >
      <Dropdown
        dropdownPlaceholder={
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
            <div className="pl-2">{"In"}</div>
          </div>
        }
        data={data}
        variant="ghost"
        placement="top-right"
      />
    </div>
  ),
};
