import React, { useState } from "react";
import { Drawer } from "./Drawer";
import close from "../../assets/icons/close.svg"


export interface MenuDrawerData {
    heading?: string,
    title?: string,
    img?: string,
    subHeading?: string,
    badge?: string | React.JSX.Element,
    underline?: boolean,
    onClick?: Function,
    imgSize?: string,

}

export const MenuDrawer = ({ datas, childern, style }: { datas: MenuDrawerData[][], childern: React.JSX.Element, style: React.CSSProperties | undefined }) => {
    const [openBottom, setOpenBottom] = useState(false);
    return (
        <div
            className="min-h-screen flex
    items-center justify-center flex-col"
        >
            <div
                onClick={() => setOpenBottom(!openBottom)}
            >
                {childern}
            </div>
            <Drawer open={openBottom} side="bottom" style={style} setOpen={setOpenBottom} children={
                <div className="flex flex-col">
                    <div className="flex justify-end items-end" onClick={() => setOpenBottom(!openBottom)}
                    ><img src={close} /></div>
                    <div className="p-10">
                        {datas.map((data) => (
                            <ul style={{ maxHeight: "350px p-20", overflowY: 'auto' }}>
                                {data.map((menuItem) => {
                                    return (
                                        <li key={menuItem.title} className="first:rounded-t-lg">
                                            <div className={`flex items-center mb-1 p-2 justify-between bg-white ${menuItem.onClick ? 'cursor-pointer' : ''}`} onClick={() => menuItem.onClick && menuItem.onClick(menuItem)}>
                                                <div className="flex items-center">
                                                    {menuItem.img && <img
                                                        src={menuItem.img}
                                                        alt="default-avatar"
                                                        className="w- h-6"
                                                        width={menuItem.imgSize ? menuItem.imgSize : "24"}
                                                        height={menuItem.imgSize ? menuItem.imgSize : "24"}
                                                    />}
                                                    {menuItem.heading && <p className="text-gray-600 text-sm font-medium">{menuItem.heading}</p>}
                                                    {menuItem.title && <div className="ml-2">
                                                        <p className="text-sm font-semibold">{menuItem.title} </p>
                                                        {menuItem.subHeading && <p className="text-xs font-medium text-gray-600 ">{menuItem.subHeading}</p>}
                                                    </div>}
                                                </div>
                                                {menuItem.badge && (typeof menuItem.badge === 'string' ? <img
                                                    src={menuItem.badge}
                                                    alt="star-avatar"
                                                    className="h-6"
                                                    width="24"
                                                    height="24"
                                                /> : menuItem.badge)}
                                            </div>
                                            {menuItem.underline && <div className="border-t-2 border-gray-200"></div>}
                                        </li>
                                    )
                                })}
                            </ul>))}
                    </div>
                </div>
            } />
        </div>
    );
};

