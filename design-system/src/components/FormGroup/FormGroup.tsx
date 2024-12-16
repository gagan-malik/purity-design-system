import React from "react";

interface IPropsFormGrop {
  children: React.JSX.Element[];
}

const FormGroup = (props: IPropsFormGrop) => {
  const { children } = props;
  return (
    <div className="flex w-full flex-col items-start justify-center gap-4">
      {children.map((child) => child)}
    </div>
  );
};

export default FormGroup;
