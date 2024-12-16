import React from "react";
import plusIcon from "../../assets/icons/plus.svg";
import tripleDot from "../../assets/icons/tripleDot.svg";

interface IPropsHeader {
  title: string;
  onCreate?: () => {};
}
const SectionHeader = (props: IPropsHeader) => {
  const { title, onCreate } = props;
  return (
    <>
      <div className="rounded-lg bg-cardbg p-4 flex items-center justify-between relative w-full">
        <span className="absolute top-2 right-14 cursor-pointer">
          <img src={tripleDot} alt="" />
        </span>
        <p className="text-base font-semibold">{title}</p>
        <div className="cursor-pointer">
          <img src={plusIcon} alt="add" />
        </div>
      </div>
    </>
  );
};

export default SectionHeader;
