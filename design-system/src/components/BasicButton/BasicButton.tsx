import React from "react";

interface IBasicButtonProps {
  text: string;
  active?: boolean;
  onClick?: () => void;
}
const BasicButton = (props: IBasicButtonProps) => {
  const { text, active = false, onClick } = props;
  return (
    // do font 500 for not active
    <button
      className={`shadow-none rounded-md border-none border-transparent bg-transparent px-xl_4 py-xs text-sm  hover:bg-white dark:text-white ${
        active
          ? "bg-white font-semibold shadow-boxShadowFilter dark:bg-slate-400"
          : "font-medium"
      }`}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {text}
    </button>
  );
};

export default BasicButton;
