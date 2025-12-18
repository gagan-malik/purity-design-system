import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AppShell } from "./AppShell";
import { Menubar } from "../Menubar/Menubar";
import { ConversationList } from "../ConversationList/ConversationList";

const meta: Meta<typeof AppShell> = {
  title: "Templates/AppShell",
  component: AppShell,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof AppShell>;

export const Default: Story = {
  render: () => (
    <AppShell
      header={
        <div className="h-14 flex items-center justify-between px-4">
          <div className="text-sm font-semibold">purity/ui</div>
          <Menubar
            menus={[
              { label: "File", items: [{ label: "New", onClick: () => {} }] },
              { label: "Help", items: [{ label: "Docs", onClick: () => {} }] },
            ]}
          />
        </div>
      }
      sidebar={
        <div className="p-3">
          <ConversationList
            conversations={[
              { id: "1", title: "Agent run", updatedAt: "today", pinned: true },
              { id: "2", title: "Tokens", updatedAt: "yesterday" },
            ]}
            selectedId="1"
            onSelect={() => {}}
            searchable
          />
        </div>
      }
    >
      <div className="max-w-3xl space-y-3">
        <div className="text-lg font-semibold">AppShell content</div>
        <div className="text-sm text-text-secondary">Compose agent UIs with header + sidebar + content.</div>
      </div>
    </AppShell>
  ),
};

