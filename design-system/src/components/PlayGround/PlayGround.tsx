import React, { useState } from "react";
import { MenuPopover } from "../MenuPopover";
import { Button } from "../Button";
import TripleDot from "../../assets/icons/tripleDot.svg";

export const PlayGround = () => {
  const [openPopover, setOpenPopover] = useState<number | null>(null);

  const handlePopoverClick = (index: number) => {
    setOpenPopover(openPopover === index ? null : index);
  };

  return (
    <div className="flex gap-80">
      <MenuPopover
        isOpen={openPopover === 0}
        setIsOpen={() => handlePopoverClick(0)}
        children={
          <Button variant="outlined" color="label" shape="circle">
            <img src={TripleDot} alt="TripleDot" />
          </Button>
        }
        width="200px"
        transform={{ left: 70 }}
        datas={[
          [
            {
              title: "Rename",
              hover: true,
              onClick: () => {},
            },
            {
              title: "Delete ",
              hover: true,
              onClick: () => {},
            }
          ],
        ]}
      />

      <MenuPopover
        isOpen={openPopover === 1}
        setIsOpen={() => handlePopoverClick(1)}
        children={
          <Button variant="outlined" color="label" shape="circle">
            <img src={TripleDot} alt="TripleDot" />
          </Button>
        }
        width="200px"
        transform={{ left: -70 }}
        datas={[
          [
            {
              title: "Rename",
              hover: true,
              onClick: () => {},
            },
            {
              title: "Delete ",
              hover: true,
              onClick: () => {},
            }
          ],
        ]}
      />
    </div>
  );
};

