import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import type { PartialBlock } from "@blocknote/core";

import { BlockNoteRichTextEditor, BlockNoteRichTextViewer } from "./BlockNoteEditor";

const meta: Meta<typeof BlockNoteRichTextEditor> = {
  title: "Organisms/BlockNoteEditor",
  component: BlockNoteRichTextEditor,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof BlockNoteRichTextEditor>;

const SAMPLE: PartialBlock[] = [
  {
    type: "heading",
    props: { level: 2 },
    content: [{ type: "text", text: "BlockNote in Purity", styles: {} }],
  },
  {
    type: "paragraph",
    content: [
      { type: "text", text: "This is a BlockNote-powered editor wrapper with Purity theming + styling.", styles: {} },
    ],
  },
  {
    type: "paragraph",
    content: [
      { type: "text", text: "Try typing “/” to open the slash menu.", styles: { bold: true } },
    ],
  },
];

export const Default: Story = {
  args: {
    initialContent: SAMPLE,
    editable: true,
    theme: "system",
  },
  render: (args) => {
    const [markdown, setMarkdown] = React.useState<string>("");

    return (
      <div className="space-y-4">
        <BlockNoteRichTextEditor
          {...args}
          onChange={({ editor }) => {
            // `blocksToMarkdownLossy` expects PartialBlocks; `editor.document` is compatible at runtime.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setMarkdown(editor.blocksToMarkdownLossy(editor.document as any));
          }}
        />

        <div className="rounded-2xl border border-border-secondary bg-bg-secondary p-3 text-sm text-text-secondary">
          <div className="mb-2 text-xs font-semibold text-text-primary">Markdown (lossy)</div>
          <pre className="whitespace-pre-wrap">{markdown || "Start typing to see output…"}</pre>
        </div>
      </div>
    );
  },
};

export const ReadOnlyViewer: Story = {
  args: {
    initialContent: SAMPLE,
    editable: false,
  },
  render: () => <BlockNoteRichTextViewer content={SAMPLE} theme="system" />,
};

