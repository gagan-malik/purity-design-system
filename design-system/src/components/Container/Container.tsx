import React from "react";

interface IPropsContainer {
  children: string | React.ReactNode;
  height?: string;
}

const Container = (props: IPropsContainer) => {
  const { children, height } = props;
  const containerStyle = height ? { height: height } : {};
  return (
    <div
      style={containerStyle}
      className="px-4 md:px-8 flex flex-col dark:bg-[#0D1117] dark:text-white items-center justify-center g-8 mx-auto"
    >
      {children}
    </div>
  );
};

export default Container;
