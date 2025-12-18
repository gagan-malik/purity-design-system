import React from "react";
import classNames from "classnames";
import { Combobox as HeadlessCombobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export interface ComboboxOption {
  id: string | number;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: ComboboxOption;
  onChange?: (value: ComboboxOption) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  testId?: string;
}

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select…",
  label,
  disabled = false,
  className,
  testId = "combobox",
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
      <HeadlessCombobox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <div className="relative w-full rounded-2xl border border-border-primary bg-bg-primary px-3 py-2">
            <HeadlessCombobox.Input
              className="w-full border-none p-0 bg-transparent text-sm text-text-primary focus:ring-0"
              displayValue={(o: ComboboxOption) => o?.label ?? ""}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
            />
            <HeadlessCombobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-text-tertiary" aria-hidden="true" />
            </HeadlessCombobox.Button>
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

export default Combobox;

