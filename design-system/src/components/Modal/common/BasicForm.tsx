import React from "react";
import Input from "../../FormInput/Input/Input";
import TextArea from "../../FormInput/TextArea/TextArea";

const BasicForm = () => {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-4">
      <Input
        placeholder="Enter your name"
        onChange={(e) => console.log(e.target.value)}
        label="Name"
      />
      <TextArea
        placeholder="Enter about yourself"
        onChange={(e: any) => console.log(e.target.value)}
      />
    </div>
  );
};

export default BasicForm;
