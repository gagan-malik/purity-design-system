import React from "react";

interface ITextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextArea: React.FC<ITextareaProps> = ({
  label = "Description",
  className = "",
  ...props
}) => {
  return (
    <>
      <div className="flex flex-col items-start justify-center gap-1 w-full">
        <p className="font-semibold text-sm text-text-secondary">{label}</p>
        <textarea
          className={`w-full p-3 rounded-[24px] border-2 border-solid font-normal text-base border-border-primary bg-bg-primary ${className}`}
          {...props}
        />
      </div>
    </>
  );
};

export default TextArea;
