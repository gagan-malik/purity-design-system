import React, { useEffect, useMemo, useRef, useState } from "react";
import { LinkProps } from "react-router-dom";
import { Link } from "../Link/Link";
import sideNavIcon from "../../assets/icons/newSideNav/sidebar.svg";
import dropdownimg from "../../assets/icons/dropDown.svg";
import { MenuPopover, PopoverPlacement } from "../..";

export type TSideNavItem = {
  icon: string;
  label: string;
  href?: string;
  onNavClick?: () => void;
  reactRouterLinkProps?: LinkProps;
  badge?: string | React.ReactNode;
};

export interface ISideNavProps {
  navItems: TSideNavItem[];
  activePath?: string;
  companyName: string;
  companyAvatarUrl: string;
  supportText: string;
  menuItems: React.ReactNode[];
  reactRouterLink?: React.ComponentType<LinkProps>;
  footer?: React.ReactNode;
  collapsedfooter?: React.ReactNode;
  rounded?: boolean;
  header?: React.ReactNode;
  collapsedheader?: React.ReactNode;
  getIsExpanded: (isExpanded: boolean) => void;
  customHeight?: number;
}

const SideNav: React.FC<ISideNavProps> = ({
  navItems,
  activePath: pathname = "/",
  footer,
  collapsedfooter,
  header,
  collapsedheader,
  reactRouterLink,
  rounded = false,
  getIsExpanded,
  customHeight,
}) => {
  const [expanded, setExpanded] = useState<boolean>(
    () => localStorage.getItem("isSideNavExpanded") === "true"
  );

  const handleSideNavExpansion = () => {
    const isExpanded = !expanded;
    getIsExpanded(isExpanded);
    localStorage.setItem("isSideNavExpanded", JSON.stringify(isExpanded));
    setExpanded(isExpanded);
  };

  const headerRef = useRef<HTMLDivElement | null>(null);


  return (
    <div
    style={{ transition: "all 0.2s ease-in-out" }}
      className={`grid ${expanded ? "w-[312px]" : "w-[80px]"} h-screen ${rounded ? "rounded-xl_4" : ""
        } border border-solid border-border-secondary bg-bg-primary flex-col overflow-hidden`}
    >
      <div
        className={`flex flex-col gap-3 ${expanded ? "items-center" : "items-center"
          } pt-5 w-full`}
      >
        {/* Expand Icon at the Top */}
        <div
          className={`flex ${expanded ? "w-full justify-start pl-7" : "justify-center"} items-center cursor-pointer`}
        >
          <img
            onClick={handleSideNavExpansion}
            src={sideNavIcon}
            alt="collapse"
            className="m-0"
          />
        </div>

        {header && (
        <div className="px-4 flex items-end w-full" ref={headerRef}>
          {expanded && header}
            {!expanded && collapsedheader}
          </div>
        )}

        <div
          className="overflow-auto flex justify-center items-center">
          <ul className={`flex flex-col ${expanded ? "gap-1  w-[275px]" : "gap-1 items-center justify-center w-full"}`}
            style={{
              minHeight: '60px',
              height: customHeight ? `calc(100vh - ${headerRef.current?.offsetHeight || 0}px - ${customHeight}px)` : undefined
            }}
          >
            {navItems.map((nav) => (
              <Link
                key={nav.label}
                reactRouterLink={reactRouterLink}
                to={nav.href}
                onClick={nav.onNavClick}
                reactRouterLinkProps={nav.reactRouterLinkProps}
                className={`rounded-full flex items-center hover:bg-bg-active ${pathname === nav.href && !nav.onNavClick ? "bg-bg-active" : ""
                  } ${expanded ? "w-full px-2 py-2" : "justify-center w-auto p-2"}`}
              >
                <li
                  className={`flex items-center ${expanded ? "justify-between w-full" : "justify-center w-auto"
                    }`}
                >
                  <div
                    className={`flex items-center  ${expanded ? "gap-3" : "justify-center"
                      }`}
                  >
                    <img src={nav.icon} alt={`${nav.label} icon`} />

                    {expanded && (
                      <p className="text-base text-text-secondary font-semibold">
                        {nav.label}
                      </p>
                    )}
                  </div>
                  {expanded && nav.badge}


                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      {footer && (
        <div className="pb-8 flex items-end w-full">
          {expanded && footer}
          {!expanded && collapsedfooter}
        </div>
      )}
    </div>
  );
};

export default SideNav;
