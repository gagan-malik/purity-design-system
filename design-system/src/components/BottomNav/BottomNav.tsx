import React from "react";
import { LinkProps } from "react-router-dom";

import { Link } from "../Link/Link";
import { Loader } from "../index";

export type IBottomNavItem = {
  icon: string;
  iconSelected: string;
  label: string;
  /** Link to open when clicked. Provide atleast one of href and onClick */
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  reactRouterLinkProps?: LinkProps;
};

export interface IPropsBottomNav {
  navItems: IBottomNavItem[];
  activePath?: string;
  reactRouterLink?: React.ComponentType<LinkProps>;
  isLoading?: boolean;
}

export const BottomNav = (props: IPropsBottomNav) => {
  const {
    isLoading,
    navItems,
    activePath: pathname = "/",
    reactRouterLink,
  } = props;

  return (
    <nav className="border-t-nuetralLightN20 flex inset-x-0 bottom:0 h-16 gap-x-1 border-t-2 px-2 justify-around">
      {/* add fixed lg:hidden in the app to show for small screens only */}
      {isLoading ? (
        <div className="w-full flex items-start justify-center h-full">
          <Loader size="sm" />
        </div>
      ) : (
        navItems.map((navItem) =>
          navItem.href ? (
            <Link
              reactRouterLink={reactRouterLink}
              to={navItem.href}
              key={navItem.label}
              reactRouterLinkProps={navItem.reactRouterLinkProps}
              className={`flex flex-col items-center justify-center rounded hover:bg-primary-100 ${
                pathname === navItem.href ? "bg-primary-100" : ""
              }`}
              routerLinkClassname="flex justify-center"
            >
              <img
                src={
                  pathname === navItem.href
                    ? navItem.iconSelected
                    : navItem.icon
                }
                alt={navItem.label}
                className="h-7 w-7 "
              />
              <span className="text-xs font-bold pt-0 pr-1 pb-0 pl-1">{navItem.label}</span>
            </Link>
          ) : (
            <a
              className={`flex flex-col items-center justify-center rounded hover:bg-primary-100 ${
                pathname === navItem.href ? "bg-primary-100" : ""
              }`}
              onClick={navItem.onClick}
              key={navItem.label}
            >
              <img
                src={
                  pathname === navItem.href
                    ? navItem.iconSelected
                    : navItem.icon
                }
                alt={navItem.label}
                className="h-7 w-7"
              />
              <span className="text-xs font-bold">{navItem.label}</span>
            </a>
          )
        )
      )}
    </nav>
  );
};

export default BottomNav;
