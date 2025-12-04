import { Meta, StoryObj } from "@storybook/react-webpack5";
import { SearchInput } from "./index";
import React from "react";
const meta: Meta<typeof SearchInput> = {
  title: "designsystem/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  args:{
        placeholder: "Search or ask questions in this workspace...",
        showActionButton: false,
        value:"",
        onSearchInput: (val) => console.log('Input changed:', val),
        showRoundedBottom: true,
  }
};



export default meta;
type Story = StoryObj<typeof SearchInput>;

export const SearchInputWithActionButton: Story = {
  args: {
    onActionButtonClick : () => {
      window.alert("onActionButtonClicked");
    },
    showActionButton: true,
  },
};


export const SearchInputWithoutActionButton: Story = {
  args:{
    placeholder: "Search or ask questions in this workspace...",
    showActionButton: false,
    onSearchInput: (val) =>{
      console.log("test",val)
    }
}
};

export const SearchInputWithContainer: Story = {
  args:{
    placeholder: "Search or ask questions in this workspace...",
    showActionButton: false,
    onSearchInput: (val) =>{
      console.log("test",val)
    },
    containerDiv : <div className="flex shadow-boxShadowBlack rounded-b-2xl">
        <span className="p-3">Here you can add filters and Search Results </span>
      </div>
}
};
