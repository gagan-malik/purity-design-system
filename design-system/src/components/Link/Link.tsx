import React from "react";
import { LinkProps } from "react-router-dom";

interface ILinkProps {
  children: React.ReactNode;
  to?: string;
  newTab?: boolean;
  disabled?: boolean;
  reactRouterLink?: React.ComponentType<LinkProps>;
  reactRouterLinkProps?: LinkProps;
  className?: string;
  routerLinkClassname?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}
export const Link: React.FC<ILinkProps> = ({
  children,
  to,
  disabled,
  newTab,
  reactRouterLinkProps,
  reactRouterLink: RouterLink,
  onClick,
  className,
  routerLinkClassname,
}) => {
  return (
    <>
      {RouterLink ? (
        <RouterLink
          to={to || ""}
          {...reactRouterLinkProps}
          className={routerLinkClassname}
          onClick={onClick}
        >
          <span
            className={
              className
                ? className
                : "text-subtlest text-sm font-medium underline"
            }
          >
            {children}
          </span>
        </RouterLink>
      ) : (
        <a
          target={newTab ? "_blank" : ""}
          aria-disabled={disabled}
          className={className ? className : "text-sm font-medium underline"}
          href={to? to: undefined}
          onClick={onClick}
        >
          <span className="text-subtlest w-full"> {children}</span>
        </a>
      )}
    </>
  );
};
