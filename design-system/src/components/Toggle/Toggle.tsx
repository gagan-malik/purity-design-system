import React, { useState } from 'react';
import classNames from 'classnames';

export interface IToggleProps {
  id: string;
  label: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Toggle: React.FC<IToggleProps> = ({
  id,
  label,
  isChecked,
  onChange,
  disabled = false,
}) => {
  const [checked, setChecked] = useState(isChecked);

  const handleToggle = () => {
    if (!disabled) {
      const newChecked = !checked;
      setChecked(newChecked);
      onChange(newChecked);
    }
  };

  return (
    <label
      htmlFor={id}
      className={classNames(
        'flex items-center cursor-pointer',
        { 'opacity-50 cursor-not-allowed': disabled }
      )}
    >
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          className="sr-only"
          checked={checked}
          onChange={handleToggle}
          disabled={disabled}
        />
        <div
          className={classNames(
            'block w-11 h-6 rounded-full transition-colors duration-300 ease-in-out',
            {
              'bg-bg-tertiary': !checked,
              'bg-blue-600': checked,
            }
          )}
        />
        <div
          className={classNames(
            'absolute left-0.5 top-0.5 bg-fg-white w-5 h-5 rounded-full shadow transition-transform duration-300 ease-in-out',
            {
              'transform translate-x-5': checked,
            }
          )}
        />
      </div>
      <div className="ml-3 text-text-secondary font-medium">
        {label}
      </div>
    </label>
  );
};