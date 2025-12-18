import React from "react";
import classNames from "classnames";
import { Chip } from "../Chip";

export interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Characters that trigger tag commit */
  separators?: string[];
  className?: string;
  testId?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  value,
  onChange,
  placeholder = "Add tag…",
  disabled = false,
  separators = [",", "Enter"],
  className,
  testId = "tag-input",
}) => {
  const [input, setInput] = React.useState("");

  const addTag = (raw: string) => {
    const next = raw.trim();
    if (!next) return;
    if (value.includes(next)) return;
    onChange([...value, next]);
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div
      className={classNames(
        "w-full rounded-3xl border border-border-secondary bg-bg-primary p-3",
        disabled && "opacity-50",
        className
      )}
      data-testid={testId}
    >
      <div className="flex flex-wrap gap-2">
        {value.map((t) => (
          <Chip key={t} label={t} onRemove={disabled ? undefined : () => removeTag(t)} />
        ))}
        <input
          className="min-w-[160px] flex-1 rounded-2xl border border-border-primary bg-bg-primary px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-brand focus:border-border-brand"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          onKeyDown={(e) => {
            if (disabled) return;
            const key = e.key;
            const shouldCommit = separators.includes(key);
            if (shouldCommit) {
              e.preventDefault();
              addTag(input);
              setInput("");
            } else if (key === "Backspace" && !input && value.length) {
              removeTag(value[value.length - 1]);
            }
          }}
          onPaste={(e) => {
            if (disabled) return;
            const text = e.clipboardData.getData("text");
            if (!text.includes(",")) return;
            e.preventDefault();
            text
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
              .forEach((t) => addTag(t));
          }}
        />
      </div>
    </div>
  );
};

export default TagInput;

