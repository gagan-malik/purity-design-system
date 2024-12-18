import React, { useState } from "react";
import { MenuPopover } from "../MenuPopover";
import { Button } from "../Button";
import TripleDot from "../../assets/icons/tripleDot.svg";

import {Table} from "../Table";

export const PlayGround = ({playGround} : {playGround : number}) => {
  const [openPopover, setOpenPopover] = useState<number | null>(null);

  const handlePopoverClick = (index: number) => {
    setOpenPopover(openPopover === index ? null : index);
  };



  return (
    <>
    {playGround == 1 && <div className="flex h-20">


      {[0,1,2,3,4,5,6,7].map((item)=>{
        return <MenuPopover
        // isOpen={openPopover === item}
        // setIsOpen={() => handlePopoverClick(item)}
        key={item.toString()}
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
      })}
    </div>}
    </>
  );
};

