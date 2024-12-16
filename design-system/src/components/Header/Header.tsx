import React from "react";
import permitechHeaderLogo from "../../assets/icons/permitechHeaderLogo.svg";
import notification from "../../assets/icons/notification.svg";
import AvatarButton from "./AvatarButton";
import dropdown from "../../assets/icons/dropDown.svg";

interface IPropsHeader {
  avatarUrl: string;
  permitechLogoOnClick: () => void;
  menuItems: React.ReactNode[];
  rightSideIcon: React.ReactNode[];
}

const Header = (props: IPropsHeader) => {
  const {
    avatarUrl,
    permitechLogoOnClick,
    menuItems,
    rightSideIcon
  } = props
  return (

    <div className="w-full fixed z-[99]">
      <header className="flex h-14 items-center justify-between bg-white py-4 px-4 dark:bg-slate-800 ">
        <div className="navbar flex items-center justify-start">

          <img
            onClick={permitechLogoOnClick}
            alt="Permitech logo"
            style={{
              cursor: "pointer",
              zIndex: 0,
              marginLeft: ".5em",
              height: "1.25em"
            }}
            src={permitechHeaderLogo}
          />

          <div className="flex flex-start gap-4">
            {menuItems}
          </div>
        </div>
        <div className="flex gap-4">
          {rightSideIcon}
        </div>
      </header>
      <div className="h-1 bg-headerBottom" />
    </div>

  );
};

export default Header;
