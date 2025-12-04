import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React from "react";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { ThemeToggle } from "../ThemeToggle";
import { ThemeSelector } from "../ThemeSelector";
import { Button } from "../Button";
import { Card } from "../Card/DashboardCards";
import { Input } from "../FormInput/Input";
import { Badge } from "../Badge";

const meta: Meta = {
  title: "designsystem/Theme/Showcase",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="min-h-screen bg-bg-primary transition-colors">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Comprehensive showcase of components in both themes
export const ComponentShowcase: Story = {
  render: () => {
    return (
      <div className="p-8 space-y-8">
        {/* Theme Controls */}
        <div className="flex justify-between items-center border-b border-border-secondary pb-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Theme Showcase</h1>
            <p className="text-text-secondary mt-1">
              Toggle between light and dark mode to see how all components adapt
            </p>
          </div>
          <div className="flex gap-4">
            <ThemeSelector />
            <ThemeToggle showLabel />
          </div>
        </div>

        {/* Buttons Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="filled" color="primary">Primary</Button>
            <Button variant="outlined" color="primary">Outlined</Button>
            <Button variant="filled" color="secondary">Secondary</Button>
            <Button variant="outlined" color="secondary">Outlined</Button>
            <Button variant="filled" color="destructive">Destructive</Button>
            <Button variant="outlined" color="destructive">Outlined</Button>
          </div>
        </section>

        {/* Form Inputs Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">Form Inputs</h2>
          <div className="max-w-md space-y-4">
            <Input label="Email" type="email" placeholder="Enter your email" />
            <Input label="Password" type="password" placeholder="Enter password" />
            <Input label="Disabled" disabled placeholder="Disabled input" />
          </div>
        </section>

        {/* Cards Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-bg-secondary rounded-lg border border-border-secondary">
              <h3 className="text-lg font-semibold text-text-primary mb-2">Card Title</h3>
              <p className="text-text-secondary">
                This is a card component that adapts to the current theme.
              </p>
            </div>
            <div className="p-6 bg-bg-secondary rounded-lg border border-border-secondary">
              <h3 className="text-lg font-semibold text-text-primary mb-2">Card Title</h3>
              <p className="text-text-secondary">
                Notice how backgrounds and borders change with the theme.
              </p>
            </div>
            <div className="p-6 bg-bg-secondary rounded-lg border border-border-secondary">
              <h3 className="text-lg font-semibold text-text-primary mb-2">Card Title</h3>
              <p className="text-text-secondary">
                Text colors automatically adjust for readability.
              </p>
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">Badges</h2>
          <div className="flex flex-wrap gap-4">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </section>

        {/* Color Palette */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 bg-bg-primary border border-border-secondary rounded-lg"></div>
              <p className="text-sm text-text-secondary">Primary Background</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-bg-secondary border border-border-secondary rounded-lg"></div>
              <p className="text-sm text-text-secondary">Secondary Background</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-text-primary rounded-lg"></div>
              <p className="text-sm text-text-secondary">Primary Text</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-text-secondary rounded-lg"></div>
              <p className="text-sm text-text-secondary">Secondary Text</p>
            </div>
          </div>
        </section>
      </div>
    );
  },
};

