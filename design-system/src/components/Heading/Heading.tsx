import React from "react";

const Heading: React.FC = ({
  breadCrumb,
  heading,
  subHeading,
  action,
  style,
  type = "default",
}: {
  breadCrumb?: React.JSX.Element;
  heading?: string | React.JSX.Element;
  subHeading?: string | React.JSX.Element;
  action?: string | React.JSX.Element;
  style?: React.CSSProperties | undefined;
  type?: "small" | "default" | "large";
}) => {
  const FontSize = {
    small: { heading: "text-lg", subHeading: "text-sm" },
    default: { heading: "text-3xl", subHeading: "text-base" },
    large: { heading: "text-5xl", subHeading: "text-xl" },
  };
  return (
    <div>
      {breadCrumb && (
        <div className="w-full pb-6 text-text-primary">{breadCrumb}</div>
      )}
      <div>
        <div
          className="flex flex-row justify-between items-center"
          style={style}
        >
          <div
            className={`font-semibold text-text-primary ${FontSize[type]["heading"]}`}
          >
            {heading}
          </div>
          <div>{action}</div>
        </div>
        <div
          className={`font-normal text-text-tertiary ${FontSize[type]["subHeading"]}`}
        >
          {subHeading}
        </div>
      </div>
    </div>
  );
};

export default Heading;
