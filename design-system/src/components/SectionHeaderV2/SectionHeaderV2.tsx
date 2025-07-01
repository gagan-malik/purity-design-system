import React from "react";

export interface SectionHeaderV2Props {
    title: string;
    subtitle?: string;
}

const SectionHeaderV2: React.FC<SectionHeaderV2Props> = ({ title, subtitle }) => {
    return (
        <div className="inline-flex flex-col items-center justify-start gap-5 w-full h-full">
            <div className="inline-flex justify-start items-start gap-4 w-full max-w-[1024px]">
                <div className="flex flex-col justify-center items-start flex-1 self-stretch">
                    <div className="self-stretch text-text-primary text-[18px] font-inter font-semibold leading-[28px]">
                        {title}
                    </div>
                    {subtitle && (
                        <div className="self-stretch text-text-tertiary text-[14px] font-inter font-normal leading-[20px]">
                            {subtitle}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SectionHeaderV2; 