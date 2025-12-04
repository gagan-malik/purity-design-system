import type { Meta, StoryObj } from "@storybook/react-webpack5"
import { Typography as Tgraphy } from '../../index';

const meta: Meta<typeof Tgraphy> = {
  component: Tgraphy,
  title: "designsystem/Typography",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta
type Story = StoryObj<typeof Tgraphy>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
export const Typography: Story = {
  args: { 
    children:'Permitech',
    fontWeight :'bold', fontSize :'5xl', fontStyle :'italic'
  },
};
