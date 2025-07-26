import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import EyeCloseIcon from '../../../assets/icons/eyeClose.svg';
import EyeOpenIcon from '../../../assets/icons/eyeOpen.svg';
import { ToolTip } from '../../ToolTip';
import { Icons } from '../../Icons/Icons';

export interface DropdownOption {
  id: string;
  name: string;
}

export interface InputV2Props {
  /** Label text for the input */
  label?: string;
  /** Width of the label container */
  labelWidth?: string;
  /** Initial value for the input */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Callback when input value changes */
  onChange?: (val: string) => void;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Additional className for custom styling */
  className?: string;
  /** Hint text shown below the input */
  hintText?: string;
  /** Whether to show the hint text */
  showHint?: boolean;
  /** Whether to show copy button */
  showCopyButton?: boolean;
  /** Callback when copy button is clicked */
  onCopy?: () => void;
  /** Whether to show help tooltip */
  showHelpTooltip?: boolean;
  /** Help text for the help tooltip */
  helpText?: string;
  /** Icon URL for the input */
  iconUrl?: string;
  /** Custom class for the input */
  customClass?: string;
  /** Whether the input is required */
  required?: boolean;
  /** Input type */
  type?: string;
  /** Input variant - 'default' or 'dropdown' */
  variant?: 'default' | 'dropdown';
  /** Callback when dropdown is clicked */
  onDropdownClick?: () => void;
  /** Options for the dropdown */
  dropdownOptions?: (string | DropdownOption)[];
  /** Callback when a dropdown option is selected */
  onDropdownChange?: (value: string | DropdownOption) => void;
}

/**
 * InputV2 component with label and optional hint text
 * @param {InputV2Props} props - Component props
 * @returns {React.ReactElement} InputV2 component
 */
const InputV2: React.FC<InputV2Props> = ({
  label = '',
  labelWidth,
  value = '',
  placeholder = '',
  onChange = () => {},
  readOnly = false,
  className,
  hintText,
  showHint = false,
  showCopyButton = false,
  onCopy,
  showHelpTooltip = false,
  helpText = '',
  iconUrl,
  customClass = '',
  required = false,
  type = 'text',
  variant = 'default',
  onDropdownClick,
  dropdownOptions = [],
  onDropdownChange,
  ...props
}) => {
  const [inputType, setInputType] = useState(type);
  const [inputValue, setInputValue] = useState(value);
  const [isCopied, setIsCopied] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  React.useEffect(() => {
    setInputType(type);
  }, [type]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inputValue);
    setIsCopied(true);
    onCopy?.();
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDropdownClick = () => {
    if (variant === 'dropdown') {
      setIsDropdownOpen(!isDropdownOpen);
      onDropdownClick?.();
    }
  };

  const handleOptionClick = (option: string | DropdownOption) => {
    const value = typeof option === 'string' ? option : option.name;
    setInputValue(value);
    onChange?.(value);
    onDropdownChange?.(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const containerClass = classNames(
    'w-full relative flex flex-row items-center justify-center box-border text-left text-sm text-text-secondary font-inter',
    className
  );

  const innerClass = 'self-stretch w-full flex flex-col items-center justify-center gap-2';
  
  const inputRowClass = classNames(
    'self-stretch w-full flex flex-row items-center min-w-0 h-11 pl-4',
    variant === 'dropdown' && 'pr-12'
  );

  const labelClass = classNames(
    'items-center overflow-hidden text-ellipsis whitespace-nowrap h-[22px] text-text-primary',
    variant === 'dropdown' ? 'w-fit' : 'flex-1',
    labelWidth && `!w-[${labelWidth}]`
  );

  const inputClass = classNames(
    'min-w-0 h-full relative leading-5 text-text-secondary placeholder:text-text-tertiary flex items-center bg-transparent border-none outline-none focus:outline-none focus:ring-0 truncate',
    variant === 'dropdown' ? 'flex-1 text-center' : 'flex-1',
    customClass
  );

  const inputContainerClass = classNames(
    'self-stretch bg-bg-secondary h-11 flex flex-row items-center justify-between box-border rounded-2xl',
    className
  );

  return (
    <div className={containerClass} ref={containerRef}>
      <div className={innerClass}>
        <div className="relative w-full">
          <div className={inputContainerClass}>
            <div className={inputRowClass}>
              {label && (
                <div className={labelClass} style={labelWidth ? { width: labelWidth } : undefined}>
                  {label}
                  {required && <span className="text-text-error ml-1">*</span>}
                </div>
              )}
              {/* Icon */}
              {iconUrl && (
                <img src={iconUrl} alt="icon" className="w-5 h-5 mr-2" />
              )}
              {/* Input only (no textarea, no dropdown) */}
              <input
                className={inputClass}
                value={inputValue}
                onChange={handleInputChange}
                readOnly={readOnly || variant === 'dropdown'}
                placeholder={placeholder}
                type={inputType}
                onClick={variant === 'dropdown' ? handleDropdownClick : undefined}
                {...props}
              />
              {/* Dropdown chevron icon */}
              {variant === 'dropdown' && (
                <div className="absolute right-4 flex items-center justify-center h-full">
                  <Icons 
                    name="chevron-selector-vertical" 
                    size="sm" 
                    color="text-text-tertiary"
                  />
                </div>
              )}
              {/* Password toggle */}
              {type === 'password' && variant !== 'dropdown' && (
                <button
                  type="button"
                  onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}
                  className="w-5 h-5 flex items-center justify-center mr-4"
                >
                  <img
                    src={inputType === 'password' ? EyeCloseIcon : EyeOpenIcon}
                    alt={inputType === 'password' ? 'Show password' : 'Hide password'}
                    className="w-5 h-5"
                  />
                </button>
              )}
              {/* Help tooltip */}
              {showHelpTooltip && helpText && variant !== 'dropdown' && (
                <div className="mr-4">
                  <ToolTip text={helpText}>
                    <Icons name="bullet-list" size="sm" />
                  </ToolTip>
                </div>
              )}
              {/* Copy button */}
              {showCopyButton && !showHelpTooltip && variant !== 'dropdown' && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-5 h-5 flex items-center justify-center mr-4"
                >
                  <Icons name={isCopied ? "check-done-01" : "copy-03"} size="sm" />
                </button>
              )}
            </div>
          </div>
          {isDropdownOpen &&
            variant === 'dropdown' &&
            dropdownOptions.length > 0 && (
              <div className="absolute top-full mt-1 w-full bg-bg-primary border border-border-secondary shadow-lg rounded-lg z-50">
                {dropdownOptions.map((option, index) => {
                  const optionValue = typeof option === 'string' ? option : option.name;
                  const optionKey = typeof option === 'string' ? option : option.id;
                  return (
                    <button
                      key={optionKey}
                      className="w-full px-4 py-2 text-left hover:bg-bg-hover text-text-primary first:rounded-t-lg last:rounded-b-lg"
                      onClick={() => handleOptionClick(option)}
                    >
                      {optionValue}
                    </button>
                  );
                })}
              </div>
            )}
        </div>
        {showHint && hintText && (
          <div className="self-start pl-4 relative leading-5 text-text-tertiary">
            {hintText}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputV2;
