import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { SearchAndFilter as SearchFilter } from "../../index";
import searchIcon from "../../assets/icons/searchIcon.svg";
const onSearchFilter = (val: any) => {
  console.log(val);
};

const meta: Meta<typeof SearchFilter> = {
  component: SearchFilter,
  title: "designsystem/SearchAndFilter",
  tags: ["autodocs"],
  argTypes: {},
  args: {
    filterOptions: [
      {
        label: "Search this board",
        placeholder: "Search",
        type: "text",
        iconUrl: searchIcon,
        labelBold: false,
      },
      {
        label: "Issue type",
        type: "select",
        labelBold: false,
        options: [
          { name: "All", id: "0" },
          { name: "Near Miss", id: "1" },
          { name: "Injury", id: "2" },
          { name: "Fatality", id: "3" },
          { name: "Property Damage", id: "5" },
          { name: "Observation", id: "6" },
          { name: "Incident", id: "7" },
        ],
        defaultSelected: { name: "All", id: "0" },
      },
      {
        label: "Status",
        type: "select",
        labelBold: false,
        placeholder: "Select Status",
        options: [
          {
            id: 1,
            name: "Open",
          },
          {
            id: 2,
            name: "In Progress",
          },
          {
            id: 3,
            name: "In Review",
          },
          {
            id: 4,
            name: "Completed",
          },
        ],
      },
    ],
    onSearchFilter,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchAndFilter: Story = {
  args: {},
};
