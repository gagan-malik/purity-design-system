import React from "react";

interface IIconsProps {
  name:
    | "clock-stopwatch"
    | "dataflow-03"
    | "default-assistant"
    | "presto-ai"
    | "close";
  size: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "custom";
  color?: string;
  height?: string;
  width?: string;
  background?: string;
}

export const Icons: React.FC<IIconsProps> = ({
  name,
  size = "md",
  color = "text-fg-quaternary group-hover:text-fg-quaternary_hover",
  height,
  width,
  background,
}) => {
  let sizeClass = {
    xxs: {
      height: "12",
      width: "12",
      padding: "p-1",
    },
    xs: {
      height: "16",
      width: "16",
      padding: "p-1",
    },
    sm: {
      height: "20",
      width: "20",
      padding: "p-1.5",
    },
    md: {
      height: "24",
      width: "24",
      padding: "p-2",
    },
    lg: {
      height: "28",
      width: "28",
      padding: "p-2.5",
    },
    xl: {
      height: "32",
      width: "32",
      padding: "p-3",
    },
    "2xl": {
      height: "32",
      width: "32",
      padding: "p-4",
    },
    custom: {
      height: height,
      width: width,
      padding: "p-2",
    },
  };

  return (
    <div
      className={`${background} ${
        background ? sizeClass[size].padding : ""
      } h-fit w-fit rounded-full group`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={sizeClass[size].width}
        height={sizeClass[size].height}
        viewBox="0 0 24 24"
        fill="none"
      >
        {name == "clock-stopwatch" ? (
          <path
            d="M12 9.5V13.5L14.5 15M12 5C7.30558 5 3.5 8.80558 3.5 13.5C3.5 18.1944 7.30558 22 12 22C16.6944 22 20.5 18.1944 20.5 13.5C20.5 8.80558 16.6944 5 12 5ZM12 5V2M10 2H14M20.329 5.59204L18.829 4.09204L19.579 4.84204M3.67102 5.59204L5.17102 4.09204L4.42102 4.84204"
            stroke="currentColor"
            className={color}
            stroke-width="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : name == "dataflow-03" ? (
          <path
            d="M11 4.5H18.3C19.4201 4.5 19.9802 4.5 20.408 4.71799C20.7843 4.90973 21.0903 5.21569 21.282 5.59202C21.5 6.01984 21.5 6.57989 21.5 7.7V9C21.5 9.93188 21.5 10.3978 21.3478 10.7654C21.1448 11.2554 20.7554 11.6448 20.2654 11.8478C19.8978 12 19.4319 12 18.5 12M13 19.5H5.7C4.5799 19.5 4.01984 19.5 3.59202 19.282C3.21569 19.0903 2.90973 18.7843 2.71799 18.408C2.5 17.9802 2.5 17.4201 2.5 16.3V15C2.5 14.0681 2.5 13.6022 2.65224 13.2346C2.85523 12.7446 3.24458 12.3552 3.73463 12.1522C4.10218 12 4.56812 12 5.5 12M10.3 14.5H13.7C13.98 14.5 14.12 14.5 14.227 14.4455C14.3211 14.3976 14.3976 14.3211 14.4455 14.227C14.5 14.12 14.5 13.98 14.5 13.7V10.3C14.5 10.02 14.5 9.87996 14.4455 9.773C14.3976 9.67892 14.3211 9.60243 14.227 9.5545C14.12 9.5 13.98 9.5 13.7 9.5H10.3C10.02 9.5 9.87996 9.5 9.773 9.5545C9.67892 9.60243 9.60243 9.67892 9.5545 9.773C9.5 9.87996 9.5 10.02 9.5 10.3V13.7C9.5 13.98 9.5 14.12 9.5545 14.227C9.60243 14.3211 9.67892 14.3976 9.773 14.4455C9.87996 14.5 10.02 14.5 10.3 14.5ZM17.8 22H21.2C21.48 22 21.62 22 21.727 21.9455C21.8211 21.8976 21.8976 21.8211 21.9455 21.727C22 21.62 22 21.48 22 21.2V17.8C22 17.52 22 17.38 21.9455 17.273C21.8976 17.1789 21.8211 17.1024 21.727 17.0545C21.62 17 21.48 17 21.2 17H17.8C17.52 17 17.38 17 17.273 17.0545C17.1789 17.1024 17.1024 17.1789 17.0545 17.273C17 17.38 17 17.52 17 17.8V21.2C17 21.48 17 21.62 17.0545 21.727C17.1024 21.8211 17.1789 21.8976 17.273 21.9455C17.38 22 17.52 22 17.8 22ZM2.8 7H6.2C6.48003 7 6.62004 7 6.727 6.9455C6.82108 6.89757 6.89757 6.82108 6.9455 6.727C7 6.62004 7 6.48003 7 6.2V2.8C7 2.51997 7 2.37996 6.9455 2.273C6.89757 2.17892 6.82108 2.10243 6.727 2.0545C6.62004 2 6.48003 2 6.2 2H2.8C2.51997 2 2.37996 2 2.273 2.0545C2.17892 2.10243 2.10243 2.17892 2.0545 2.273C2 2.37996 2 2.51997 2 2.8V6.2C2 6.48003 2 6.62004 2.0545 6.727C2.10243 6.82108 2.17892 6.89757 2.273 6.9455C2.37996 7 2.51997 7 2.8 7Z"
            stroke="currentColor"
            className={color}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        ) : name == "default-assistant" ? (
          <g clip-path="url(#clip0_15583_12334)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.85 2.25C6.54806 2.25 2.25 6.54806 2.25 11.85V21.45H11.85C17.1519 21.45 21.45 17.1519 21.45 11.85C21.45 6.54806 17.1519 2.25 11.85 2.25ZM8.78087 14.3753C8.43586 13.944 7.80657 13.8741 7.37531 14.2191C6.94404 14.5641 6.87412 15.1934 7.21913 15.6247C9.67012 18.6884 14.3299 18.6884 16.7809 15.6247C17.1259 15.1934 17.056 14.5641 16.6247 14.2191C16.1934 13.8741 15.5641 13.944 15.2191 14.3753C13.5688 16.4382 10.4312 16.4382 8.78087 14.3753Z"
              fill="currentColor"
              className={color}
            />
            <defs>
              <clipPath id="clip0_15583_12334">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </g>
        ) : name == "presto-ai" ? (
          <g clip-path="url(#clip0_11357_18187)">
            <path
              d="M2.25 11.85C2.25 6.54806 6.54806 2.25 11.85 2.25C17.1519 2.25 21.45 6.54806 21.45 11.85C21.45 17.1519 17.1519 21.45 11.85 21.45H2.25V11.85Z"
              fill="currentColor"
              className={color}
            />
            <path
              d="M16.35 8.84985L10.1625 15.0374L7.35004 12.2249"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        ) : name == "close" ? (
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            className={color}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        ) : null}
      </svg>
    </div>
  );
};

export default Icons;
