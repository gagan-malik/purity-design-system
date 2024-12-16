import { Meta, StoryObj } from "@storybook/react";
import { SectionLabel } from "./SectionLabel";
import React from "react";
import { Button } from "../Button/Button";
const meta: Meta<typeof SectionLabel> = {
  title: "designsystem/SectionLabel",
  component: SectionLabel,
  tags: ["autodocs"],
  args:{
    title: "Section Label",
    description: "This is a section label",
    helpIcon: false
  }
};



export default meta;
type Story = StoryObj<typeof SectionLabel>;

export const SectionLabelWithActionButton: Story = {
  args: {
    title: "Section Label",
    description: "This is a section label",
    helpIcon: false,
    actions: <Button color="label" variant="outlined" size="sm" >Action</Button>
  },
};

export const SectionLabelWithHelpIcon: Story = {
  args: {
    title: "Section Label",
    description: "This is a section label",
    helpIcon: true,
    helpText: "This is a help text"
  },
};


