import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ConversationList } from "./ConversationList";

const meta: Meta<typeof ConversationList> = {
  title: "designsystem/ConversationList",
  component: ConversationList,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof ConversationList>;

export const Default: Story = {
  render: () => {
    const [selectedId, setSelectedId] = React.useState("c1");
    const [items, setItems] = React.useState([
      { id: "c1", title: "Design system audit", updatedAt: "2025-12-17", pinned: true, unreadCount: 2 },
      { id: "c2", title: "Refactor tokens", updatedAt: "2025-12-16" },
      { id: "c3", title: "Build AI primitives", updatedAt: "2025-12-15" },
    ]);

    return (
      <div className="max-w-sm">
        <ConversationList
          conversations={items}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onRename={(id, title) =>
            setItems((prev) => prev.map((c) => (c.id === id ? { ...c, title } : c)))
          }
          onDelete={(id) => setItems((prev) => prev.filter((c) => c.id !== id))}
        />
      </div>
    );
  },
};

