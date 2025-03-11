import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Calendar from './Calendar';
import Avatar from '../Avatar/Avatar';

const meta: Meta<typeof Calendar> = {
  title: 'designsystem/Calendar',
  component: Calendar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// Function to create a visible alert when an event is clicked
const createClickHandler = (eventName: string) => {
  return () => {
    alert(`${eventName} clicked!`);
    console.log(`${eventName} clicked!`);
  };
};

// Updated sample events with the new format and more visible click handlers
const sampleEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    date: new Date(2024, 10, 2),
    avatar: <Avatar imageUrl="https://i.pravatar.cc/150?img=1" size="xs" />,
    onClick: createClickHandler('Team Meeting')
  },
  {
    id: '2',
    title: 'Project Review',
    date: new Date(2024, 10, 2),
    avatar: <Avatar imageUrl="https://i.pravatar.cc/150?img=2" size="xs" />,
    onClick: createClickHandler('Project Review')
  },
  {
    id: '3',
    title: 'Design Workshop',
    date: new Date(2024, 10, 10),
    avatar: <Avatar imageUrl="https://i.pravatar.cc/150?img=3" size="xs" />,
    onClick: createClickHandler('Design Workshop')
  },
  {
    id: '4',
    title: 'Client Meeting',
    date: new Date(), // Today
    avatar: <Avatar imageUrl="https://i.pravatar.cc/150?img=4" size="xs" />,
    onClick: createClickHandler('Client Meeting')
  },
  {
    id: '5',
    title: 'Product Demo',
    date: new Date(), // Today
    avatar: <Avatar imageUrl="https://i.pravatar.cc/150?img=5" size="xs" />,
    onClick: createClickHandler('Product Demo')
  },
  {
    id: '6',
    title: 'Strategy Session',
    date: new Date(), // Today
    avatar: <Avatar imageUrl="https://i.pravatar.cc/150?img=6" size="xs" />,
    onClick: createClickHandler('Strategy Session')
  }
];

export const MonthView: Story = {
  args: {
    events: sampleEvents,
    view: 'month',
  },
};

export const WeekView: Story = {
  args: {
    events: sampleEvents,
    view: 'week',
  },
};

export const Empty: Story = {
  args: {
    events: [],
    view: 'month',
  },
}; 