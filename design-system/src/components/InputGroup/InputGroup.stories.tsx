import type { Meta, StoryObj } from "@storybook/react-webpack5";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
} from "./InputGroup";
import { ThemeProvider } from "../../contexts/ThemeContext";
// Simple SVG icons
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const meta: Meta<typeof InputGroup> = {
  component: InputGroup,
  title: "Molecules/InputGroup",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-8 space-y-6">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithIcon: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput type="email" placeholder="Enter your email" />
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const WithIconsBothSides: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <InputGroup>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon>
          <StarIcon />
        </InputGroupAddon>
        <InputGroupAddon align="end">
          <CheckIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <InputGroup>
        <InputGroupText>$</InputGroupText>
        <InputGroupInput placeholder="0.00" />
        <InputGroupText>USD</InputGroupText>
      </InputGroup>
      <InputGroup>
        <InputGroupText>https://</InputGroupText>
        <InputGroupInput placeholder="example.com" />
        <InputGroupText>.com</InputGroupText>
      </InputGroup>
    </div>
  ),
};

export const WithButton: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupButton>Search</InputGroupButton>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Enter URL" />
        <InputGroupAddon>
          <InfoIcon />
        </InputGroupAddon>
        <InputGroupButton>Go</InputGroupButton>
      </InputGroup>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <InputGroup disabled>
        <InputGroupInput placeholder="Disabled input" disabled />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};
