import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload as FUpload } from "../../index";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof FUpload> = {
  component: FUpload,
  title: "designsystem/FileUpload",
  tags: ["autodocs"],
  argTypes: {},
  args: {
    labelHighlight: "Click to upload",
    label: "or drag and drop",
    description: "SVG, PNG, JPG or GIF (max. 800x400px)",
    uploadedFiles: [
      {
        id: "sample1",
        mediaURL: "https://example.com/media/sample1.jpg",
        mediaName: "sample1.jpg",
        size: 5000000,
        progress: 75,
        fileSizeLimit: 8000000,
        uploadError: false,
        handleDelete: (file) => console.log("deleted file is", file),
        showLoader: true,
      },
      {
        id: "sample2",
        mediaURL: "https://example.com/media/sample2.png",
        mediaName: "sample2.png",
        size: 1500000,
        progress: 100,
        fileSizeLimit: 8000000,
        uploadError: false,
        handleDelete: (file) => console.log("deleted file is", file),
        showLoader: false,
      },
      {
        id: "sample3",
        mediaURL: "https://example.com/media/sample3.mp3",
        mediaName: "sample3.mp3",
        size: 2500000,
        progress: 30,
        fileSizeLimit: 8000000,
        uploadError: true,
        handleDelete: (file) => console.log("deleted file is", file),
        showLoader: true,
      },
    ],
    grid: 2,
    onFileUpload: (files) => console.log("uploaded files are ", files)
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const FileUpload: Story = {
  args: {},
};
