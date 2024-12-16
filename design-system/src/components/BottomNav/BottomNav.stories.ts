import type { Meta, StoryObj } from "@storybook/react"
import { BottomNav as BNav, IBottomNavItem } from "../../index"

import dashboardIcon from "../../assets/icons/dashboardSample.svg"
import settingsIcon from "../../assets/icons/globalSettings.svg"
import settingsSelectedIcon from "../../assets/icons/globalSettingsSelected.svg"
import homeIcon from "../../assets/icons/home.svg"
import homeSelectedIcon from "../../assets/icons/homeSelected.svg"
import notificationIcon from "../../assets/icons/notificationBellMobile.svg"
import tasksIcon from "../../assets/icons/tasks.svg"
import tasksSelectedIcon from "../../assets/icons/tasksSelected.svg"


export const navConfig: IBottomNavItem[] = [
  {
    icon: homeIcon,
    iconSelected: homeSelectedIcon,
    label: "Overview",
    href: "/",
  },
  {
    icon: tasksIcon,
    iconSelected: tasksSelectedIcon,
    label: "Issues",
    href: "#",
  },
  {
    icon: dashboardIcon,
    iconSelected: dashboardIcon,
    label: "Dashboard",
    href: "#",
  },
  {
    icon: settingsIcon,
    iconSelected: settingsSelectedIcon,
    label: "Settings",
    href: "#",
  },
  {
    icon: notificationIcon,
    iconSelected: notificationIcon,
    label: "Notifications",
    onClick: (e => alert("It works")),
  },
]

const meta: Meta<typeof BNav> = {
  component: BNav,
  title: "designsystem/BottomNav",
  tags: ["autodocs"],
  argTypes: {
    navItems: { control: "array" },
  },
  args: {
    navItems: navConfig,
  },
}

export default meta
type Story = StoryObj<typeof BNav>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
export const BottomNav: Story = {
  args: {},
}
