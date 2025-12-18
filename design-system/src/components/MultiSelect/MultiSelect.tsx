import React from "react";
import classNames from "classnames";
import { Combobox as HeadlessCombobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Chip } from "../Chip";

export interface MultiSelectOption {
  id: string | number;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value: MultiSelectOption[];
  onChange: (value: MultiSelectOption[]) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  testId?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select…",
  label,
  disabled = false,
  className,
  testId = "multi-select",
}) => {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  return (
    <div className={classNames("w-full", className)} data-testid={testId}>
      {label && <div className="mb-2 text-sm font-semibold text-text-primary">{label}</div>}
      <HeadlessCombobox multiple value={value} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <div className="w-full rounded-3xl border border-border-secondary bg-bg-primary p-3">
            <div className="flex flex-wrap gap-2 items-center">
              {value.map((v) => (
                <Chip
                  key={v.id}
                  label={v.label}
                  onRemove={
                    disabled
                      ? undefined
                      : () => onChange(value.filter((x) => x.id !== v.id))
                  }
                />
              ))}
              <HeadlessCombobox.Input
                className="min-w-[160px] flex-1 border-none bg-transparent p-0 text-sm text-text-primary focus:ring-0"
                onChange={(e) => setQuery(e.target.value)}
                placeholder={value.length ? "" : placeholder}
              />
              <HeadlessCombobox.Button className="ml-auto inline-flex items-center justify-center rounded-full w-9 h-9 border border-border-secondary hover:bg-bg-secondary transition-colors">
                <ChevronUpDownIcon className="h-5 w-5 text-text-tertiary" aria-hidden="true" />
              </HeadlessCombobox.Button>
            </div>
          </div>

          <HeadlessCombobox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-2xl border border-border-secondary bg-bg-primary p-1 shadow-xl">
            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-sm text-text-tertiary">No results.</div>
            ) : (
              filtered.map((o) => (
                <HeadlessCombobox.Option
                  key={o.id}
                  value={o}
                  disabled={o.disabled}
                  className={({ active, disabled: optDisabled }) =>
                    classNames(
                      "relative cursor-default select-none rounded-xl px-3 py-2 text-sm",
                      active ? "bg-bg-secondary" : "",
                      optDisabled ? "opacity-50" : "cursor-pointer"
                    )
                  }
                >
                  {({ selected }) => (
                    <div className="flex items-center justify-between gap-3">
                      <span className={classNames("truncate", selected && "font-semibold")}>{o.label}</span>
                      {selected && <CheckIcon className="h-4 w-4 text-text-primary" aria-hidden="true" />}
                    </div>
                  )}
                </HeadlessCombobox.Option>
              ))
            )}
          </HeadlessCombobox.Options>
        </div>
      </HeadlessCombobox>
    </div>
  );
};

export default MultiSelect;

