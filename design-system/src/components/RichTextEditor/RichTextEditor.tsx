import React from "react";
import classNames from "classnames";

export interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  testId?: string;
}

/**
 * RichTextEditor (lightweight)
 * This is a minimal contentEditable editor intended for internal/product use.
 * For advanced editing features, consider integrating a full editor (TipTap/ProseMirror).
 */
export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  label,
  disabled = false,
  className,
  testId = "rich-text-editor",
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    if (ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
  }, [value]);

  const exec = (cmd: string) => {
    if (disabled) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (document as any).execCommand?.(cmd, false, undefined);
    onChange(ref.current?.innerHTML ?? "");
  };

  return (
    <div className={classNames("w-full", className)} data-testid={testId}>
      {label && <div className="mb-2 text-sm font-semibold text-text-primary">{label}</div>}

      <div className="rounded-3xl border border-border-secondary bg-bg-primary overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border-secondary bg-bg-secondary px-3 py-2">
          <button type="button" className="text-sm font-semibold hover:underline" onClick={() => exec("bold")} disabled={disabled}>
            B
          </button>
          <button type="button" className="text-sm font-semibold italic hover:underline" onClick={() => exec("italic")} disabled={disabled}>
            I
          </button>
          <button type="button" className="text-sm font-semibold hover:underline" onClick={() => exec("underline")} disabled={disabled}>
            U
          </button>
        </div>

        <div
          ref={ref}
          className={classNames(
            "min-h-[140px] p-3 text-sm text-text-primary outline-none",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          contentEditable={!disabled}
          onInput={() => onChange(ref.current?.innerHTML ?? "")}
          suppressContentEditableWarning
        />
      </div>
    </div>
  );
};

export default RichTextEditor;

