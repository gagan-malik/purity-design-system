import React from "react";
import "./loader.css";
import classNames from "classnames";
interface ILoaderProps {
  fullPage?: boolean;
  size?: "sm" | "md" | "lg";
}
const Loader: React.FC<ILoaderProps> = ({ fullPage = false, size = "md" }) => {
  return (
    <div
      className={classNames("flex justify-center items-center", {
        "fixed inset-0 bg-blackTransparent z-[1100]": fullPage,
      })}
    >
      <div
        className={classNames(
          "spinner border-4 border-solid border-t-primary-600 rounded-full",
          { "w-10 h-10": size === "md" },
          { "w-8 h-8": size === "sm" },
          { "w-12 h-12": size === "lg" }
        )}
      ></div>
    </div>
  );
};

export default Loader;
