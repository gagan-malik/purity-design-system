import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { FilesInfoList as FilesInfo } from "../../../index";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof FilesInfo> = {
  component: FilesInfo,
  title: "designsystem/FilesInfoList",
  tags: ["autodocs"],
  argTypes: {},
  args: {
    files: [
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
        mediaURL: "https://example.com/media/sample3.gif",
        mediaName: "sample3.gif",
        size: 2500000,
        progress: 30,
        fileSizeLimit: 8000000,
        uploadError: true,
        handleDelete: (file) => console.log("deleted file is", file),
        showLoader: true,
      },
      {
        id: "sample4",
        mediaURL: "https://example.com/media/sample4.jpg",
        mediaName: "sample4.jpg",
        size: 5000000,
        progress: 75,
        fileSizeLimit: 8000000,
        uploadError: false,
        handleDelete: (file) => console.log("deleted file is", file),
        showLoader: true,
      },
    ],
    grid: 2,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const FilesInfoList: Story = {
  args: {},
};
