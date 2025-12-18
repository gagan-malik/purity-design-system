import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChatMessageList } from "./ChatMessageList";
import { MessageActions } from "../MessageActions/MessageActions";
import { Citation } from "../Citation/Citation";

const meta: Meta<typeof ChatMessageList> = {
  title: "Organisms/ChatMessageList",
  component: ChatMessageList,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof ChatMessageList>;

export const Default: Story = {
  render: () => (
    <div className="max-w-3xl">
      <ChatMessageList
        messages={[
          {
            id: "1",
            role: "assistant",
            name: "Assistant",
            meta: "just now",
            content: (
              <>
                Here’s a cited statement <Citation index={1} sources={[{ id: "s1", title: "Example source", url: "https://example.com" }]} />.
              </>
            ),
            markdown: false,
            actions: <MessageActions onCopy={() => {}} />,
          },
          {
            id: "2",
            role: "user",
            name: "You",
            meta: "just now",
            content: "Cool—show me the API.",
          },
          {
            id: "3",
            role: "assistant",
            name: "Assistant",
            meta: "just now",
            content: "Sure. Use `ChatMessageList` with an array of messages.",
          },
        ]}
      />
    </div>
  ),
};

