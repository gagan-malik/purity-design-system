import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChatMessage } from "./ChatMessage";
import { MessageActions } from "../MessageActions/MessageActions";

const meta: Meta<typeof ChatMessage> = {
  title: "Organisms/ChatMessage",
  component: ChatMessage,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof ChatMessage>;

export const AssistantMarkdown: Story = {
  render: () => (
    <div className="space-y-3">
      <ChatMessage
        role="assistant"
        name="Assistant"
        meta="just now"
        content={
          "Here is **markdown** with a list:\n\n- One\n- Two\n\nAnd code:\n\n```ts\nexport const answer = 42;\n```"
        }
        actions={<MessageActions onCopy={() => {}} onRegenerate={() => {}} />}
      />
      <ChatMessage role="user" name="You" meta="just now" content={"Can you explain it?"} />
      <ChatMessage role="tool" name="tool:search" meta="running" content={"query=design system"} markdown={false} />
      <ChatMessage role="system" content={"System message: rate limit warning"} markdown={false} />
    </div>
  ),
};

