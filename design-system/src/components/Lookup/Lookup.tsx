import React from "react";
import { Combobox, ComboboxOption } from "../Combobox";
import { MultiSelect, MultiSelectOption } from "../MultiSelect";

export interface LookupOption {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface LookupProps {
  options: LookupOption[];
  value?: LookupOption;
  onChange?: (value: LookupOption) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  testId?: string;
}

export const Lookup: React.FC<LookupProps> = ({
  options,
  value,
  onChange,
  label = "Lookup",
  placeholder,
  disabled,
  testId = "lookup",
}) => {
  const mapped: ComboboxOption[] = options.map((o) => ({ id: o.id, label: o.label, disabled: o.disabled }));
  const selected = value ? mapped.find((o) => o.id === value.id) : undefined;

  return (
    <Combobox
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      testId={testId}
      options={mapped}
      value={selected}
      onChange={(v) => {
        const next = options.find((o) => o.id === String(v.id));
        if (next) onChange?.(next);
      }}
    />
  );
};

export interface PeoplePickerProps {
  options: LookupOption[];
  value: LookupOption[];
  onChange: (value: LookupOption[]) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  testId?: string;
}

export const PeoplePicker: React.FC<PeoplePickerProps> = ({
  options,
  value,
  onChange,
  label = "People",
  placeholder,
  disabled,
  testId = "people-picker",
}) => {
  const mapped: MultiSelectOption[] = options.map((o) => ({ id: o.id, label: o.label, disabled: o.disabled }));
  const selected: MultiSelectOption[] = value
    .map((v) => mapped.find((o) => o.id === v.id))
    .filter(Boolean) as MultiSelectOption[];

  return (
    <MultiSelect
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      testId={testId}
      options={mapped}
      value={selected}
      onChange={(vals) => {
        const next = vals
          .map((v) => options.find((o) => o.id === String(v.id)))
          .filter(Boolean) as LookupOption[];
        onChange(next);
      }}
    />
  );
};

export default Lookup;

