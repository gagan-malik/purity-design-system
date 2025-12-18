import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import {
  ChatMessageList,
  ChatComposer,
  StreamingIndicator,
  ErrorBanner,
  Citation,
} from "../../components";

const meta: Meta = {
  title: "Pages/Patterns/AI Chat",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pattern: AI chat surface using Purity primitives (streaming, citations, composer, errors). This is a reference composition you can copy into apps.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Reference: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div className="max-w-3xl space-y-4">
        <div className="rounded-3xl border border-border-secondary bg-bg-primary p-4">
          <div className="mb-3">
            <StreamingIndicator label="Model is streaming…" />
          </div>
          <ChatMessageList
            messages={[
              { id: "u1", role: "user", content: "Summarize the attached document." },
              {
                id: "a1",
                role: "assistant",
                content:
                  "Here’s a concise summary. Key points: …\n\nI’ll include citations below.",
              },
            ]}
          />
          <div className="mt-3">
            <Citation label="Doc excerpt" href="#" description="Section 2.1 — Findings" />
          </div>
        </div>

        <ErrorBanner
          title="Tool failed"
          description="The retrieval tool timed out. Retry or continue without citations."
          actions={[
            { label: "Retry", onClick: () => {} },
            { label: "Dismiss", onClick: () => {} },
          ]}
        />

        <div className="rounded-3xl border border-border-secondary bg-bg-primary p-4">
          <ChatComposer
            value={value}
            onChange={setValue}
            onSend={() => setValue("")}
            placeholder="Ask a question…"
          />
        </div>
      </div>
    );
  },
};

