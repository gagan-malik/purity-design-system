import React from "react";
import classNames from "classnames";

interface IContentBoxProps {
  content: string;
  theme?:String;
}
const ContentBox: React.FC<IContentBoxProps> = ({
  content,theme
}) => {

  return (
    <div className={`p-4 bg-bg-primary border border-solid border-border-secondary rounded-2xl text-sm text-secondary-700 flex items-center justify-start gap-3 w-full ${theme}`}>
      {content}
    </div>
  );
};

export default ContentBox;