import React from "react";
import FormGroup from "../FormGroup";
import Input from "../FormInput/Input";
import doneIcon from "../../assets/icons/doneSuccess.svg";
import googleLogo from "../../assets/icons/googleLogo.svg";
import { Button } from "../Button";

const SampleLoginForm = () => {
  return (
    <div>
      <FormGroup
        children={[
          <Input
            label="Name"
            onChange={() => {}}
            placeholder="Enter your name"
            required
            type="text"
          />,
          <Input
            label="Email"
            onChange={() => {}}
            placeholder="Enter your email"
            required
            type="text"
          />,
          <Input
            label="Password"
            onChange={() => {}}
            placeholder="Create a password"
            required
            type="password"
          />,
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
          <Button style={{ width: "100%" }} color="primary" size="md">
            Get started
          </Button>,
          <Button
            style={{ width: "100%" }}
            color="primary"
            size="md"
            imgSrc={googleLogo}
            variant="outlined"
          >
            Sign up with Google
          </Button>,
        ]}
      />
    </div>
  );
};

export default SampleLoginForm;
