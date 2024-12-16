import type { Meta, StoryObj } from "@storybook/react";
import { AuthLayout as ALayout, Button, FormGroup, Input } from "../../index";
import permiLogo from "../../assets/icons/permitechPLogo.svg";
import React from "react";
import doneIcon from "../../assets/icons/doneSuccess.svg";
import googleLogo from "../../assets/icons/googleLogo.svg";
import { Link } from "react-router-dom";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof ALayout> = {
  component: ALayout,
  title: "designsystem/AuthLayout",
  tags: ["autodocs"],
  argTypes: {},
  args: {
    shadow: true,
    headerTitle: "Create an account",
    headerDescription: (
      <p className="text-base font-normal text-tertiary-600">
        Start your 30-day free trial.
      </p>
    ),
    headerImageUrl: permiLogo,
    children: (
      <div>
        <FormGroup
          children={[
            <div className="w-full">
              <Input
                label="Name"
                onChange={() => {}}
                placeholder="Enter your name"
                required
                type="text"
              />
            </div>,
            <div className="w-full">
              <Input
                label="Email"
                onChange={() => {}}
                placeholder="Enter your email"
                required
                type="text"
              />
            </div>,
            <div className="w-full">
              <Input
                label="Password"
                onChange={() => {}}
                placeholder="Create a password"
                required
                type="password"
              />
            </div>,
            <div className="flex flex-col items-start justify-between gap-3">
              <div className="flex items-center justify-start gap-2">
                <img src={doneIcon} alt="" />
                <p className="font-normal text-sm text-[#6E7781]">
                  Must be at least 8 characters
                </p>
              </div>
              <div className="flex items-center justify-start gap-2">
                <img src={doneIcon} alt="" />
                <p className="font-normal text-sm text-[#6E7781]">
                  Must contain one special character
                </p>
              </div>
            </div>,
            <Button shape="circle" style={{ width: "100%" }} color="primary" size="md">
              Get started
            </Button>,
            <Button
              style={{ width: "100%" }}
              color="primary"
              size="md"
              imgSrc={googleLogo}
              variant="outlined"
              shape="circle"
            >
              Sign up with Google
            </Button>,
          ]}
        />
      </div>
    ),
    footer: (
      <div className="flex items-center justify-center gap-1 text-sm font-normal">
        <p className="text-sm font-normal">Footer description</p>
        <a href="/link">
          <p className="font-semibold text-sm text-blue-700">
            <a href={"/login"}>login</a>
          </p>
        </a>
      </div>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AuthLayout: Story = {
  args: {},
};
