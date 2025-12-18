import React from "react";
import classNames from "classnames";

import type { BlockNoteEditor as BlockNoteEditorInstance, PartialBlock } from "@blocknote/core";
import { BlockNoteViewRaw, useCreateBlockNote } from "@blocknote/react";

import "@blocknote/core/fonts/inter.css";

export type BlockNoteThemeMode = "light" | "dark" | "system";

export interface BlockNoteRichTextEditorProps {
  /**
   * Initial content for the editor. This is applied only when the editor instance is created.
   * If you need fully controlled content, manage a key and remount the component on change.
   */
  initialContent?: PartialBlock[];
  /**
   * Editor interactivity.
   * @default true
   */
  editable?: boolean;
  /**
   * Theme to apply to BlockNote UI.
   * - "system" follows OS preference unless `documentElement[data-theme]` is set to "light"/"dark"
   * @default "system"
   */
  theme?: BlockNoteThemeMode;
  /**
   * Called whenever the editor content changes.
   */
  onChange?: (args: { editor: BlockNoteEditorInstance; document: BlockNoteEditorInstance["document"] }) => void;
  /**
   * Optional class for the outer wrapper.
   */
  className?: string;
  /**
   * Sets a stable test id on the wrapper.
   * @default "blocknote-editor"
   */
  testId?: string;
  /**
   * Enable/disable default BlockNote UI pieces.
   */
  formattingToolbar?: boolean;
  linkToolbar?: boolean;
  slashMenu?: boolean;
  sideMenu?: boolean;
  filePanel?: boolean;
  tableHandles?: boolean;
  emojiPicker?: boolean;
  comments?: boolean;
}

function resolveTheme(mode: BlockNoteThemeMode): "light" | "dark" {
  if (typeof document === "undefined") return "light";

  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;

  if (mode === "light" || mode === "dark") return mode;

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  return prefersDark ? "dark" : "light";
}

function useResolvedTheme(mode: BlockNoteThemeMode): "light" | "dark" {
  const [resolved, setResolved] = React.useState<"light" | "dark">(() => resolveTheme(mode));

  React.useEffect(() => {
    const update = () => setResolved(resolveTheme(mode));

    update();

    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onMediaChange = () => update();
    media?.addEventListener?.("change", onMediaChange);

    const observer = new MutationObserver(() => update());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      observer.disconnect();
      media?.removeEventListener?.("change", onMediaChange);
    };
  }, [mode]);

  return resolved;
}

export const BlockNoteRichTextEditor: React.FC<BlockNoteRichTextEditorProps> = ({
  initialContent,
  editable = true,
  theme = "system",
  onChange,
  className,
  testId = "blocknote-editor",
  formattingToolbar = true,
  linkToolbar = true,
  slashMenu = true,
  sideMenu = true,
  filePanel = true,
  tableHandles = true,
  emojiPicker = true,
  comments = false,
}) => {
  const resolvedTheme = useResolvedTheme(theme);

  const editor = useCreateBlockNote(
    {
      initialContent,
    },
    // Only recreate when initialContent reference changes.
    // Consumers can control recreation with a `key` if needed.
    [initialContent],
  );

  return (
    <div
      className={classNames("w-full", className)}
      data-testid={testId}
      data-component="BlockNoteRichTextEditor"
    >
      <div className="rounded-3xl border border-border-secondary bg-bg-primary overflow-hidden">
        <BlockNoteViewRaw
          editor={editor}
          editable={editable}
          theme={resolvedTheme}
          onChange={() => onChange?.({ editor, document: editor.document })}
          formattingToolbar={formattingToolbar}
          linkToolbar={linkToolbar}
          slashMenu={slashMenu}
          sideMenu={sideMenu}
          filePanel={filePanel}
          tableHandles={tableHandles}
          emojiPicker={emojiPicker}
          comments={comments}
          className="bn-purity"
        />
      </div>
    </div>
  );
};

export interface BlockNoteRichTextViewerProps {
  /**
   * Rendered content (blocks) for view-only mode.
   * This should be an array of PartialBlocks compatible with BlockNote.
   */
  content: PartialBlock[];
  /**
   * Theme to apply to BlockNote UI.
   * @default "system"
   */
  theme?: BlockNoteThemeMode;
  className?: string;
  testId?: string;
}

export const BlockNoteRichTextViewer: React.FC<BlockNoteRichTextViewerProps> = ({
  content,
  theme = "system",
  className,
  testId = "blocknote-viewer",
}) => {
  const resolvedTheme = useResolvedTheme(theme);

  const editor = useCreateBlockNote(
    {
      initialContent: content,
    },
    [content],
  );

  return (
    <div className={classNames("w-full", className)} data-testid={testId} data-component="BlockNoteRichTextViewer">
      <div className="rounded-3xl border border-border-secondary bg-bg-primary overflow-hidden">
        <BlockNoteViewRaw
          editor={editor}
          editable={false}
          theme={resolvedTheme}
          formattingToolbar={false}
          linkToolbar={false}
          slashMenu={false}
          sideMenu={false}
          filePanel={false}
          tableHandles={false}
          emojiPicker={false}
          comments={false}
          className="bn-purity"
        />
      </div>
    </div>
  );
};

export default BlockNoteRichTextEditor;

