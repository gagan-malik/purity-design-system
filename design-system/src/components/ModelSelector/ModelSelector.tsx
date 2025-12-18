import React from "react";
import classNames from "classnames";

export interface ModelOption {
  id: string;
  label: string;
  description?: string;
  contextWindow?: number;
  badge?: string;
}

export interface ModelSelectorProps {
  models: ModelOption[];
  value: string;
  onChange: (id: string) => void;
  disabled?: boolean;
  className?: string;
  testId?: string;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  value,
  onChange,
  disabled = false,
  className,
  testId = "model-selector",
}) => {
  const selected = models.find((m) => m.id === value);

  return (
    <div className={classNames("w-full rounded-3xl border border-border-secondary bg-bg-primary p-4", className)} data-testid={testId}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-text-primary">Model</div>
          {selected?.description && <div className="mt-1 text-sm text-text-secondary">{selected.description}</div>}
          {typeof selected?.contextWindow === "number" && (
            <div className="mt-2 text-xs text-text-tertiary font-mono">context={selected.contextWindow.toLocaleString()}</div>
          )}
        </div>
        {selected?.badge && (
          <span className="text-xs px-2 py-0.5 rounded-full border border-border-secondary bg-bg-secondary text-text-tertiary">
            {selected.badge}
          </span>
        )}
      </div>

      <div className="mt-3">
        <select
          className={classNames(
            "w-full rounded-2xl border border-border-primary bg-bg-primary px-3 py-2 text-sm text-text-primary",
            "focus:outline-none focus:ring-2 focus:ring-border-brand focus:border-border-brand",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ModelSelector;

