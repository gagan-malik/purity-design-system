import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Grid } from "./Grid";

const meta: Meta<typeof Grid> = {
  component: Grid,
  title: "designsystem/Grid",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const GridItem = ({ num }: { num: number }) => (
  <div className="p-8 bg-bg-secondary rounded-lg text-center text-text-primary font-semibold">
    Item {num}
  </div>
);

// Basic grid
export const Basic: Story = {
  render: () => (
    <div className="p-4">
      <Grid columns={3}>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <GridItem key={num} num={num} />
        ))}
      </Grid>
    </div>
  ),
};

// Responsive columns
export const Responsive: Story = {
  render: () => (
    <div className="p-4">
      <Grid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <GridItem key={num} num={num} />
        ))}
      </Grid>
    </div>
  ),
};

// Different gaps
export const Gaps: Story = {
  render: () => (
    <div className="p-4 space-y-8">
      <div>
        <div className="mb-2 text-sm font-semibold">Small Gap</div>
        <Grid columns={3} gap="sm">
          {[1, 2, 3].map((num) => (
            <GridItem key={num} num={num} />
          ))}
        </Grid>
      </div>
      <div>
        <div className="mb-2 text-sm font-semibold">Large Gap</div>
        <Grid columns={3} gap="lg">
          {[1, 2, 3].map((num) => (
            <GridItem key={num} num={num} />
          ))}
        </Grid>
      </div>
    </div>
  ),
};

