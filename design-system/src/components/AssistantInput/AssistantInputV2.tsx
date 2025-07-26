import React, { FunctionComponent, useState, useRef, useEffect, ReactNode, KeyboardEvent } from 'react';
import Icons from '../Icons/Icons';
import { Button } from '../Button';
import { ButtonV2 } from '../ButtonV2/ButtonV2';

interface TemplateVariable {
  id: string;
  name: string;
  startIndex: number;
  endIndex: number;
}

interface TemplateChipProps {
  variable: TemplateVariable;
  onEdit: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  isEditing: boolean;
  onStartEdit: (id: string) => void;
  onFinishEdit: () => void;
  position: { top: number; left: number };
}

const TemplateChip: React.FC<TemplateChipProps> = ({
  variable,
  onEdit,
  onDelete,
  isEditing,
  onStartEdit,
  onFinishEdit,
  position
}) => {
  const [editValue, setEditValue] = useState(variable.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editValue.trim()) {
      onEdit(variable.id, editValue.trim());
    }
    onFinishEdit();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setEditValue(variable.name);
      onFinishEdit();
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        className="absolute bg-blue-500 text-white px-2 py-1 rounded-md text-sm font-medium outline-none border-2 border-blue-600 min-w-[40px] z-10"
        style={{ 
          top: position.top,
          left: position.left,
          width: `${Math.max(editValue.length * 8 + 16, 40)}px` 
        }}
      />
    );
  }

  return (
    <span
      onClick={() => onStartEdit(variable.id)}
      className="absolute inline-flex items-center bg-blue-500 text-white px-2 py-1 rounded-md text-sm font-medium cursor-pointer hover:bg-blue-600 transition-colors z-10"
      style={{ top: position.top, left: position.left }}
    >
      {variable.name}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(variable.id);
        }}
        className="ml-1 hover:bg-blue-700 rounded-full p-0.5 transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M9 3L3 9M3 3l6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </span>
  );
};

export interface AssistantInputV2Props {
  // Text Input Controls
  placeholderText?: string;
  onSend?: (text: string) => void;
  isSendDisabled?: boolean;
  value?: string;
  defaultValue?: string;
  onInputChange?: (text: string) => void;
  maxHeight?: number;

  // Template Variables
  enableTemplateVariables?: boolean;

  // Bottom Section Content
  bottomMiddleContent?: ReactNode;

  // Display Values (read-only for display)
  webSearchEnabled?: boolean;
  reasoningEnabled?: boolean;
  selectedModel?: string;

  // Upgrade Controls
  showUpgradeButton?: boolean;
  upgradeMessage?: string;
  onShowUsage?: () => void;
  onUpgrade?: () => void;
  upgradeClick?: () => void;

  // Style Customization
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

export const AssistantInputV2: FunctionComponent<AssistantInputV2Props> = ({
  // Text Input Controls
  placeholderText = "Write something, or press '@' for helpers, '/' for workflows",
  onSend,
  isSendDisabled = false,
  value,
  defaultValue = "",
  onInputChange = () => {},
  maxHeight = 224,

  // Template Variables
  enableTemplateVariables = false,

  // Bottom Section Content
  bottomMiddleContent,

  // Display Values
  webSearchEnabled = false,
  reasoningEnabled = false,
  selectedModel = 'auto',

  // Upgrade Controls
  showUpgradeButton = false,
  upgradeMessage = "You are out of free daily assistant credits. Please wait 24 hours before trying again or consider upgrading for unlimited AI access.",
  onShowUsage = () => {},
  onUpgrade = () => {},
  upgradeClick,

  // Style Customization
  className = "",
  inputClassName = "",
  buttonClassName = ""
}) => {
  const [inputText, setInputText] = useState(value ?? defaultValue);
  const [displayText, setDisplayText] = useState(value ?? defaultValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Template variables state
  const [variables, setVariables] = useState<TemplateVariable[]>([]);
  const [editingVariableId, setEditingVariableId] = useState<string | null>(null);

  // Sync external value changes with internal state
  useEffect(() => {
    if (value !== undefined) {
      setInputText(value);
      if (enableTemplateVariables) {
        parseTemplateVariables(value);
        setDisplayText(createDisplayText(value));
      } else {
        setDisplayText(value);
      }
    }
  }, [value, enableTemplateVariables]);

  const parseTemplateVariables = (text: string) => {
    const regex = /\{\{([^}]+)\}\}/g;
    const newVariables: TemplateVariable[] = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      newVariables.push({
        id: `${match.index}-${match[1]}`,
        name: match[1],
        startIndex: match.index,
        endIndex: match.index + match[0].length
      });
    }

    setVariables(newVariables);
  };

  const createDisplayText = (text: string) => {
    if (!enableTemplateVariables) return text;
    
    // Replace {{variable}} with placeholder spaces for proper text measurement
    return text.replace(/\{\{([^}]+)\}\}/g, (match, varName) => {
      return ' '.repeat(varName.length + 2); // Account for chip width
    });
  };

  const getChipPositions = () => {
    if (!textareaRef.current || !containerRef.current) return [];
    
    const textarea = textareaRef.current;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    return variables.map(variable => {
      // Create a temporary text node to measure position
      const beforeText = inputText.substring(0, variable.startIndex);
      const lines = beforeText.split('\n');
      const lineHeight = 24; // Approximate line height
      const charWidth = 8; // Approximate character width
      
      const lineNumber = lines.length - 1;
      const charPosition = lines[lines.length - 1].length;
      
      return {
        variable,
        position: {
          top: lineNumber * lineHeight + 8, // Add some padding
          left: charPosition * charWidth + 8 // Add some padding
        }
      };
    });
  };

  const handleEditVariable = (id: string, newName: string) => {
    const updatedVariables = variables.map(v => 
      v.id === id ? { ...v, name: newName } : v
    );
    
    // Update the input text
    let newText = inputText;
    const variable = variables.find(v => v.id === id);
    if (variable) {
      const before = newText.substring(0, variable.startIndex);
      const after = newText.substring(variable.endIndex);
      newText = before + `{{${newName}}}` + after;
      
      setInputText(newText);
      onInputChange(newText);
      parseTemplateVariables(newText);
      setDisplayText(createDisplayText(newText));
    }
  };

  const handleDeleteVariable = (id: string) => {
    const variableToDelete = variables.find(v => v.id === id);
    if (!variableToDelete) return;

    // Remove the variable from text
    const before = inputText.substring(0, variableToDelete.startIndex);
    const after = inputText.substring(variableToDelete.endIndex);
    const newText = before + after;
    
    setInputText(newText);
    onInputChange(newText);
    parseTemplateVariables(newText);
    setDisplayText(createDisplayText(newText));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    onInputChange(newText);
    
    if (enableTemplateVariables) {
      parseTemplateVariables(newText);
      setDisplayText(createDisplayText(newText));
    } else {
      setDisplayText(newText);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
      textarea.style.overflowX = 'hidden';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputText]);

  const handleSend = () => {
    if (onSend) onSend(inputText);
    setInputText("");
    setDisplayText("");
    setVariables([]);
  };

  if (showUpgradeButton) {
    return (
      <div className="relative w-full flex flex-col gap-[21px]">
        {/* Main container - overall width 326x49 */}
        <div className="w-full shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-[32px] bg-gray-100 dark:bg-gray-800 flex flex-row items-center justify-start p-4 box-border">
          {/* This p-4 adds 16px padding all around */}
          <div className="self-stretch flex-1 flex flex-col items-start justify-center pt-2 px-0 pb-0 gap-2">
            {/* Input container */}
            <div className="w-full flex flex-col items-start justify-start">
              {/* Textarea - needs padding adjustment to match: left:12px, right:22px, top:8px, bottom:8px */}
              <textarea
                ref={textareaRef}
                className="relative leading-6 w-full min-h-[48px] py-0 bg-transparent border-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0 text-text-primary placeholder:text-text-placeholder resize-none scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
                value={upgradeMessage}
                readOnly
                rows={1}
              />
            </div>
            <div className="self-stretch flex flex-row items-center justify-between gap-0 text-sm text-text-secondary">
              <div className="flex flex-row items-center justify-start gap-2 text-text-tertiary">
                <div className="rounded-full h-8 overflow-hidden flex flex-row items-center justify-center py-2 px-3 box-border gap-1">
                  <Icons name="star-01" size="sm" />
                  <div className="flex flex-row items-center justify-center py-0 px-0.5">
                    <div className="relative leading-5 font-semibold">100/100</div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-start">
                  <ButtonV2
                    onClick={upgradeClick}
                    size="md"
                    hierarchy="primary"
                    shape="rounded"
                  >
                    Upgrade now
                  </ButtonV2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const chipPositions = enableTemplateVariables ? getChipPositions() : [];

  return (
    <div className={`relative w-full flex flex-col gap-[21px] ${className}`}>
      {/* Main container - overall width 326x49 */}
      <div className="w-full shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-[32px] bg-gray-100 dark:bg-gray-800 flex flex-row items-center justify-start p-4 box-border">
        {/* This p-4 adds 16px padding all around */}
        <div className="self-stretch flex-1 flex flex-col items-start justify-center pt-2 px-0 pb-0 gap-2">
          {/* Input container */}
          <div ref={containerRef} className="w-full flex flex-col items-start justify-start relative">
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              className={`relative leading-6 w-full min-h-[48px] py-0 bg-transparent border-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0 text-text-primary placeholder:text-text-placeholder resize-none scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent ${inputClassName} ${enableTemplateVariables ? 'text-transparent' : ''}`}
              placeholder={placeholderText}
              value={enableTemplateVariables ? displayText : inputText}
              onChange={handleTextChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  isSendDisabled ? null : handleSend();
                }
              }}
              rows={1}
            />
            
            {/* Overlay for displaying actual text with variables visible */}
            {enableTemplateVariables && (
              <div 
                className="absolute inset-0 pointer-events-none leading-6 text-text-primary whitespace-pre-wrap"
                style={{ 
                  padding: '0',
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                  lineHeight: 'inherit'
                }}
              >
                {inputText}
              </div>
            )}
            
            {/* Template Variable Chips */}
            {enableTemplateVariables && chipPositions.map(({ variable, position }) => (
              <TemplateChip
                key={variable.id}
                variable={variable}
                position={position}
                onEdit={handleEditVariable}
                onDelete={handleDeleteVariable}
                isEditing={editingVariableId === variable.id}
                onStartEdit={setEditingVariableId}
                onFinishEdit={() => setEditingVariableId(null)}
              />
            ))}
          </div>
          <div className="self-stretch flex flex-row items-center gap-2 text-sm text-text-secondary">
            {/* Flexible Middle Container */}
            <div className="flex-1 flex items-center">
              {bottomMiddleContent}
            </div>

            {/* Send Button */}
            <div className="flex items-center justify-start">
              <ButtonV2
                onClick={handleSend}
                size="md"
                hierarchy="primary"
                shape="rounded"
                disabled={isSendDisabled || !inputText.trim()}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-[-90deg]"
                >
                  <path 
                    d="M4.16675 9.99996H15.8334M15.8334 9.99996L10.0001 4.16663M15.8334 9.99996L10.0001 15.8333" 
                    stroke="currentColor" 
                    strokeWidth="1.66667" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </ButtonV2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 