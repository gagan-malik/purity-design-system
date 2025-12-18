import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";
import { ThemeProvider } from "../../contexts/ThemeContext";
import React, { useState } from "react";

const meta: Meta<typeof ToggleGroup> = {
  component: ToggleGroup,
  title: "Molecules/ToggleGroup",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-8">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => {
    const [value, setValue] = useState("left");
    return (
      <ToggleGroup type="single">
        <ToggleGroupItem
          value="left"
          pressed={value === "left"}
          onClick={() => setValue("left")}
        >
          Left
        </ToggleGroupItem>
        <ToggleGroupItem
          value="center"
          pressed={value === "center"}
          onClick={() => setValue("center")}
        >
          Center
        </ToggleGroupItem>
        <ToggleGroupItem
          value="right"
          pressed={value === "right"}
          onClick={() => setValue("right")}
        >
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    const toggleValue = (val: string) => {
      setValues((prev) =>
        prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
      );
    };
    return (
      <ToggleGroup type="multiple">
        <ToggleGroupItem
          value="bold"
          pressed={values.includes("bold")}
          onClick={() => toggleValue("bold")}
        >
          Bold
        </ToggleGroupItem>
        <ToggleGroupItem
          value="italic"
          pressed={values.includes("italic")}
          onClick={() => toggleValue("italic")}
        >
          Italic
        </ToggleGroupItem>
        <ToggleGroupItem
          value="underline"
          pressed={values.includes("underline")}
          onClick={() => toggleValue("underline")}
        >
          Underline
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    const [value, setValue] = useState("day");
    return (
      <ToggleGroup type="single" orientation="vertical">
        <ToggleGroupItem
          value="day"
          pressed={value === "day"}
          onClick={() => setValue("day")}
        >
          Day
        </ToggleGroupItem>
        <ToggleGroupItem
          value="week"
          pressed={value === "week"}
          onClick={() => setValue("week")}
        >
          Week
        </ToggleGroupItem>
        <ToggleGroupItem
          value="month"
          pressed={value === "month"}
          onClick={() => setValue("month")}
        >
          Month
        </ToggleGroupItem>
        <ToggleGroupItem
          value="year"
          pressed={value === "year"}
          onClick={() => setValue("year")}
        >
          Year
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};
