import React from "react";
import profileImage from "../../../assets/icons/dummyProfilePic.svg";

const arr = [1, 2, 3];

const ImageGroup = () => {
  const getImageStyle = (ind: number) => {
    if (ind > 0)
      return { border: "1px solid white", right: ind * 5, zIndex: ind * 5 };
    else return {};
  };

  return (
    <div className="flex">
      {arr.map((data, index) => {
        return (
          <img
            style={getImageStyle(index)}
            className={`rounded-[50%] w-[21px] h-[21px] relative`}
            src={profileImage}
            alt=""
          />
        );
      })}
    </div>
  );
};

export default ImageGroup;
