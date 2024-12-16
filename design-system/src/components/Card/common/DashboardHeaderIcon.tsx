import React from "react";

interface IHeaderIconProps {
  imgPath: string;
  onClick: () => void;
}
const HeaderIcon = (props: IHeaderIconProps) => {
  const { imgPath, onClick } = props;
  return (
    <div
      onClick={() => onClick()}
      className="cursor-pointer hover:bg-cardbg flex items-center justify-center rounded-xs p-1 w-12 h-12"
    >
      <img src={imgPath} />
    </div>
  );
};

export default HeaderIcon;
