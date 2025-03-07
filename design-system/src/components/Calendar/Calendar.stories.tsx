import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import  Calendar  from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'designsystem/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

const sampleEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    date: new Date(2024, 10, 2),
    users: [
      {
        id: '1',
        name: 'John Doe',
        imageUrl: 'https://i.pravatar.cc/150?img=1',
      },
      {
        id: '2',
        name: 'Jane Smith',
        imageUrl: 'https://i.pravatar.cc/150?img=2',
      },
      {
        id: '3',
        name: 'Bob Johnson',
        imageUrl: 'https://i.pravatar.cc/150?img=3',
      },
      {
        id: '4',
        name: 'Alice Brown',
        imageUrl: 'https://i.pravatar.cc/150?img=4',
      },
    ],
  },
  {
    id: '2',
    title: 'Project Review',
    date: new Date(2024, 10, 2),
    users: [
      {
        id: '1',
        name: 'John Doe',
        imageUrl: 'https://i.pravatar.cc/150?img=1',
      },
      {
        id: '2',
        name: 'Jane Smith',
        imageUrl: 'https://i.pravatar.cc/150?img=2',
      },
    ],
  },
  {
    id: '3',
    title: 'Design Workshop',
    date: new Date(2024, 10, 10),
    users: [
      {
        id: '3',
        name: 'Bob Johnson',
        imageUrl: 'https://i.pravatar.cc/150?img=3',
      },
    ],
  },
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