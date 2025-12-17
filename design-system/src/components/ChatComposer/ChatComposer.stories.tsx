import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChatComposer } from "./ChatComposer";
import { AttachmentPicker, AttachmentItem } from "../AttachmentPicker/AttachmentPicker";

const meta: Meta<typeof ChatComposer> = {
  title: "designsystem/ChatComposer",
  component: ChatComposer,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof ChatComposer>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const [attachments, setAttachments] = React.useState<AttachmentItem[]>([]);

    return (
      <div className="max-w-2xl space-y-3">
        <ChatComposer
          value={value}
          onChange={setValue}
          onSubmit={() => setValue("")}
          footer={
            <AttachmentPicker
              attachments={attachments}
              onAddFiles={(files) => {
                const next: AttachmentItem[] = Array.from(files).map((f) => ({
                  id: `${f.name}-${f.size}-${f.lastModified}-${Math.random().toString(16).slice(2)}`,
                  file: f,
                  status: "queued",
                }));
                setAttachments((prev) => [...prev, ...next]);
              }}
              onRemove={(id) => setAttachments((prev) => prev.filter((a) => a.id !== id))}
            />
          }
        />
      </div>
    );
  },
};

export const Generating: Story = {
  render: () => {
    const [value, setValue] = React.useState("Stop me!");
    return (
      <div className="max-w-2xl">
        <ChatComposer value={value} onChange={setValue} isGenerating onStop={() => {}} />
      </div>
    );
  },
};

