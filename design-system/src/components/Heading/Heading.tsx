import React from "react";
import classNames from "classnames";

export interface HeadingProps {
  /** New API */
  breadcrumb?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  /**
   * Size presets.
   * @default "default"
   */
  size?: "small" | "default" | "large";
  /**
   * Title element to render.
   * @default "h2"
   */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties | undefined;

  /** Back-compat (deprecated) */
  breadCrumb?: React.ReactNode;
  heading?: React.ReactNode;
  subHeading?: React.ReactNode;
  action?: React.ReactNode;
  type?: "small" | "default" | "large";
}

const Heading: React.FC<HeadingProps> = ({
  breadcrumb,
  title,
  subtitle,
  actions,
  size,
  as = "h2",
  className,
  style,
  // back-compat
  breadCrumb,
  heading,
  subHeading,
  action,
  type = "default",
}) => {
  const resolvedSize = size || type;
  const resolvedBreadcrumb = breadcrumb ?? breadCrumb;
  const resolvedTitle = title ?? heading;
  const resolvedSubtitle = subtitle ?? subHeading;
  const resolvedActions = actions ?? action;

  const FontSize = {
    small: { heading: "text-lg", subHeading: "text-sm" },
    default: { heading: "text-3xl", subHeading: "text-base" },
    large: { heading: "text-5xl", subHeading: "text-xl" },
  };
  return (
    <div className={classNames(className)}>
      {resolvedBreadcrumb && (
        <div className="w-full pb-6 text-text-primary">{resolvedBreadcrumb}</div>
      )}
      <div>
        <div
          className="flex flex-row justify-between items-center"
          style={style}
        >
          <div
            className={`font-semibold text-text-primary ${FontSize[resolvedSize]["heading"]}`}
          >
            {resolvedTitle ? React.createElement(as as any, { className: "m-0 p-0" }, resolvedTitle) : null}
          </div>
          <div>{resolvedActions}</div>
        </div>
        <div
          className={`font-normal text-text-tertiary ${FontSize[resolvedSize]["subHeading"]}`}
        >
          {resolvedSubtitle}
        </div>
      </div>
    </div>
  );
};

export default Heading;
