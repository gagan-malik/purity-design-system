import classNames from "classnames";
import React from "react";

export interface IRadioOption {
  name: string;
  image?: string;
  description: string;
}

interface IRadioButtonProps {
  options: IRadioOption[];
  value: IRadioOption;
  onChange: (option: IRadioOption) => void;
}

export const RadioButton: React.FC<IRadioButtonProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="space-y-3 rounded-3xl bg-bg-primary">
      {options.map((option, index) => (
        <div
          key={option.name}
          className={classNames(
            value.name === option.name && "ring-2 ring-border-brand_solid",
            "group rounded-3xl relative flex cursor-pointer border border-border-secondary p-3 focus:outline-none data-[checked]:z-10 data-[checked]:border-indigo-200 data-[checked]:bg-indigo-50"
          )}
        >
          <RadioButtonOption
            option={option}
            isSelected={value.name === option.name}
            onChange={onChange}
          />
        </div>
      ))}
    </div>
  );
};

interface IRadioButtonOptionProps {
  option?: IRadioOption;
  isSelected: boolean;
  onChange?: (option: IRadioOption) => void;
}

export const RadioButtonOption: React.FC<IRadioButtonOptionProps> = ({
  option,
  isSelected,
  onChange,
}) => {
  const handleChange = () => {
    onChange && option && onChange(option);
  };

  return (
    <div className="flex w-full items-center" onClick={handleChange}>
      <span
        aria-hidden="true"
        className={`mt-0.5 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border-primary ${
          isSelected ? "bg-blue-600" : "bg-bg-primary"
        } group-data-[checked]:border-transparent group-data-[checked]:bg-indigo-600 group-data-[focus]:ring-2 group-data-[focus]:ring-indigo-600 group-data-[focus]:ring-offset-2`}
        
      >
        {isSelected && (
          <span className="h-1.5 w-1.5 rounded-full bg-bg-primary_alt" />
        )}
      </span>
      {option && option.image && (
        <div className="px-4">
          <img
            src={option.image}
            alt={option.name}
            className="h-16 w-16 rounded-md"
          />
        </div>
      )}
      {option && (
        <span className="ml-3 flex flex-col">
          <span className="block text-sm font-medium text-text-primary group-data-[checked]:text-indigo-900">
            {option.name}
          </span>
          <span className="block text-sm text-text-placeholder group-data-[checked]:text-indigo-700">
            {option.description}
          </span>
        </span>
      )}
    </div>
  );
};
