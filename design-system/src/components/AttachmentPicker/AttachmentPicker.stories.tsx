import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AttachmentPicker, AttachmentItem } from "./AttachmentPicker";

const meta: Meta<typeof AttachmentPicker> = {
  title: "designsystem/AttachmentPicker",
  component: AttachmentPicker,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof AttachmentPicker>;

export const Default: Story = {
  render: () => {
    const [attachments, setAttachments] = React.useState<AttachmentItem[]>([]);

    return (
      <div className="max-w-xl">
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
      </div>
    );
  },
};

