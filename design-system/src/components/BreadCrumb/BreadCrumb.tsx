import React from "react";
import { Link } from "../Link/Link";
import slash from "../../assets/icons/slash.svg";
import rightArrow from "../../assets/icons/rightArrow.svg";
import { LinkProps } from "react-router-dom";

type breadCrumbList = {
  name: string;
  link?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};
interface IPropsBreadCrumb {
  reactRouterLink?: React.ComponentType<LinkProps>;
  list: breadCrumbList[];
  reactRouterLinkProps?: LinkProps;
  separator?: "line" | "arrow";
  color?: "primary" | "default";
  variant?: "filled" | "default";
}
const BreadCrumb = (props: IPropsBreadCrumb) => {
  const {
    list,
    reactRouterLink,
    reactRouterLinkProps,
    separator = "line",
    color = "default",
    variant = "default",
  } = props;

  const colorStyles = {
    primary: {
      filled:
        "text-text-secondary bg-bg-brand-primary rounded-full font-medium text-sm py-1 px-2",
      default: "text-text-secondary font-medium text-sm",
    },
    default: {
      filled:
        "text-text-secondary bg-bg-secondary rounded-full font-semibold text-s py-1 px-2",
      default: "text-text-secondary font-semibold text-sm",
    },
  };

  const listStyleDefault = "text-sm font-medium text-tert-600";
  const listSelected = `${colorStyles[color][variant]}`;

  return (
    <div>
      <ul className="flex items-center justify-start gap-3">
        {list.map((currList, ind) => {
          return (
            <>
              <li
                className={
                  ind !== list.length - 1 ? listStyleDefault : listSelected
                }
              >
                {currList.link ? (
                  <Link
                    reactRouterLink={reactRouterLink}
                    to={currList.link}
                    reactRouterLinkProps={reactRouterLinkProps}
                    className="no-underline"
                  >
                    {currList.name}
                  </Link>
                ) : (
                  <span onClick={currList.onClick}>{currList.name}</span>
                )}
              </li>
              {ind !== list.length - 1 ? (
                <>
                  {separator === "line" ? (
                    <img src={slash} alt="/" />
                  ) : (
                    <img src={rightArrow} alt=">" />
                  )}
                </>
              ) : (
                ""
              )}
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default BreadCrumb;
