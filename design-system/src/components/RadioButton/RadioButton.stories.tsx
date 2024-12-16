import { Meta, StoryObj } from "@storybook/react";
import { IRadioOption, RadioButton } from "./index";

import SystemThemeImgURL from "../../assets/images/system-theme.svg";
import LightThemeImgURL from "../../assets/images/light-theme.svg";
import DarkThemeImgURL from "../../assets/images/dark-theme.svg";

const settings: IRadioOption[] = [
  {
    name: "Public Access",
    description:
      "This project is visible to anyone on the internet, and can be shared with others.",
  },
  {
    name: "Private Access",
    description:
      "This project is only visible to you, and can only be shared with you.",
  },
];

const themeSettings: IRadioOption[] = [
  {
    name: "System",
    image: SystemThemeImgURL,
    description:
      "The system theme is the default theme that is used by the application.",
  },
  {
    name: "Light Mode",
    image: LightThemeImgURL,
    description: "The light theme is a lighter version of the system theme.",
  },
  {
    name: "Dark Mode",
    image: DarkThemeImgURL,
    description: "The dark theme is a darker version of the system theme.",
  },
];

const meta: Meta<typeof RadioButton> = {
  title: "designsystem/RadioButton",
  component: RadioButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  args: {
    options: settings,
    value: settings[0],
    onChange: () => {},
  },
};

export const Image: Story = {
  args: {
    options: themeSettings,
    value: themeSettings[0],
    onChange: () => {},
  },
};
