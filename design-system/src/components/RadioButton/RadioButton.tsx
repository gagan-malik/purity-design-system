import classNames from "classnames";
import React from "react";

export interface IRadioOption {
  name: string;
  image?: string;
  description: string;
  disabled?: boolean;
}

export interface RadioButtonProps {
  options: IRadioOption[];
  value: IRadioOption;
  /**
   * New API (preferred)
   */
  onValueChange?: (option: IRadioOption) => void;
  /**
   * Back-compat (deprecated)
   * @deprecated Use onValueChange.
   */
  onChange?: (option: IRadioOption) => void;
  ariaLabel?: string;
  className?: string;
  testId?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  value,
  onValueChange,
  onChange,
  ariaLabel = "Options",
  className,
  testId = "radio-button",
}) => {
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const selectedIndex = Math.max(0, options.findIndex((o) => o.name === value.name));

  const commit = (option: IRadioOption) => {
    if (option.disabled) return;
    onValueChange?.(option);
    onChange?.(option);
  };

  return (
    <div
      className={classNames("space-y-3 rounded-3xl bg-bg-primary", className)}
      role="radiogroup"
      aria-label={ariaLabel}
      data-testid={testId}
    >
      {options.map((option, index) => {
        const isSelected = value.name === option.name;
        const disabled = Boolean(option.disabled);
        return (
          <button
          key={option.name}
          ref={(el) => {
            refs.current[index] = el;
          }}
          type="button"
          role="radio"
          aria-checked={isSelected}
          disabled={disabled}
          tabIndex={index === selectedIndex ? 0 : -1}
          onClick={() => commit(option)}
          onKeyDown={(e) => {
            const last = options.length - 1;
            const move = (nextIndex: number) => {
              const next = Math.max(0, Math.min(last, nextIndex));
              refs.current[next]?.focus();
              commit(options[next]);
            };

            switch (e.key) {
              case "ArrowDown":
              case "ArrowRight":
                e.preventDefault();
                move(index + 1);
                break;
              case "ArrowUp":
              case "ArrowLeft":
                e.preventDefault();
                move(index - 1);
                break;
              case "Home":
                e.preventDefault();
                move(0);
                break;
              case "End":
                e.preventDefault();
                move(last);
                break;
              default:
                break;
            }
          }}
          className={classNames(
            isSelected && "ring-2 ring-border-brand_solid",
            "group rounded-3xl relative flex w-full text-left border border-border-secondary p-3",
            "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-button-ringBrandShadowSm",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-bg-secondary"
          )}
        >
          <RadioButtonOption
            option={option}
            isSelected={isSelected}
          />
        </button>
        );
      })}
    </div>
  );
};

interface IRadioButtonOptionProps {
  option?: IRadioOption;
  isSelected: boolean;
}

export const RadioButtonOption: React.FC<IRadioButtonOptionProps> = ({
  option,
  isSelected,
}) => {
  return (
    <div className="flex w-full items-center">
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
