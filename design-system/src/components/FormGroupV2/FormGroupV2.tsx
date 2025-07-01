import React, { useState } from "react";
import classNames from "classnames";
import EyeCloseIcon from "../../assets/icons/eyeClose.svg";
import EyeOpenIcon from "../../assets/icons/eyeOpen.svg";
import { ToolTip } from "../ToolTip";

export interface FormGroupV2Props {
    className?: string;
}

const inputPropsDefault = {
    type: "text",
    showHelpTooltip: false,
    helpText: "",
    iconUrl: "",
    rounded: true,
    showCopyButton: false,
    onCopy: undefined,
    required: false,
    readOnly: false,
    placeholder: "",
};

const FormGroupV2: React.FC<FormGroupV2Props> = ({ className }) => {
    // Internal state for each field
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [designation, setDesignation] = useState("");
    const [nameType, setNameType] = useState("text");
    const [emailType, setEmailType] = useState("text");
    const [designationType, setDesignationType] = useState("text");
    const [nameShowPassword, setNameShowPassword] = useState(false);
    const [emailShowPassword, setEmailShowPassword] = useState(false);
    const [designationShowPassword, setDesignationShowPassword] = useState(false);
    const [nameCopied, setNameCopied] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);
    const [designationCopied, setDesignationCopied] = useState(false);

    // Classes (do not change layout)
    const inputWrapperClass = "self-stretch w-full max-w-full flex flex-col items-start justify-start gap-2";
    const inputContainerClass = "self-stretch flex-1 flex flex-row items-start justify-start py-3 pl-0 pr-4";
    const labelClass = "flex-1 items-center overflow-hidden text-ellipsis whitespace-nowrap h-[22px] text-[#232326] flex";
    const inputClass =
        "flex-1 min-w-0 h-full relative leading-5 text-[#737373] flex items-center bg-transparent border-none outline-none focus:outline-none focus:ring-0 truncate";

    // Copy logic
    const handleCopy = (value: string, setCopied: (v: boolean) => void, onCopy?: () => void) => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        onCopy && onCopy();
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={classNames("w-full flex flex-col items-start justify-start gap-0", className)}>
            {/* Full Name input: only top corners rounded */}
            <div className={inputWrapperClass}>
                <div className="self-stretch rounded-t-2xl rounded-b-none bg-[#F5F6F7] h-11 flex flex-row items-center justify-between py-0 pl-4 pr-0 box-border">
                    <div className={inputContainerClass + " h-11 items-center"}>
                        <div className={labelClass}>
                            Full Name
                        </div>
                        {/* Icon */}
                        {inputPropsDefault.iconUrl && (
                            <img src={inputPropsDefault.iconUrl} alt="icon" className="w-5 h-5 mr-2" />
                        )}
                        {/* Input */}
                        <input
                            className={inputClass}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            readOnly={inputPropsDefault.readOnly}
                            placeholder={"Enter your name"}
                            type={nameType}
                        />
                        {/* Password toggle (if type is password) */}
                        {nameType === "password" && (
                            <div
                                onClick={() => setNameShowPassword(!nameShowPassword)}
                                className="absolute right-4 opacity-70 z-[9999]"
                            >
                                <img src={nameShowPassword ? EyeOpenIcon : EyeCloseIcon} alt="" />
                            </div>
                        )}
                        {/* Help tooltip */}
                        {inputPropsDefault.showHelpTooltip && (
                            <div className="absolute right-4 z-[9999]">
                                <ToolTip text={inputPropsDefault.helpText || "Sample Info"}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_13336_71)">
                                            <path d="M6.05992 5.99998C6.21665 5.55442 6.52602 5.17872 6.93322 4.9394C7.34042 4.70009 7.81918 4.61261 8.2847 4.69245C8.75022 4.7723 9.17246 5.01433 9.47664 5.37567C9.78081 5.737 9.94729 6.19433 9.94659 6.66665C9.94659 7.99998 7.94659 8.66665 7.94659 8.66665M7.99992 11.3333H8.00659M14.6666 7.99998C14.6666 11.6819 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6819 1.33325 7.99998C1.33325 4.31808 4.31802 1.33331 7.99992 1.33331C11.6818 1.33331 14.6666 4.31808 14.6666 7.99998Z" stroke="#AFB8C1" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_13336_71">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </ToolTip>
                            </div>
                        )}
                        {/* Copy button */}
                        {inputPropsDefault.showCopyButton && (
                            <button
                                onClick={() => handleCopy(name, setNameCopied, inputPropsDefault.onCopy)}
                                className="px-4 h-full flex items-center justify-center hover:bg-[#E8E9EA] transition-colors"
                            >
                                {nameCopied ? (
                                    <span className="text-[#4CAF50] text-sm">Copied!</span>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z" stroke="#737373" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M3.33333 10H2.66667C2.31305 10 1.97391 9.85953 1.72386 9.60948C1.47381 9.35943 1.33334 9.02029 1.33334 8.66667V2.66667C1.33334 2.31305 1.47381 1.97391 1.72386 1.72386C1.97391 1.47381 2.31305 1.33334 2.66667 1.33334H8.66667C9.02029 1.33334 9.35943 1.47381 9.60948 1.72386C9.85953 1.97391 10 2.31305 10 2.66667V3.33334" stroke="#737373" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {/* Email input: no rounded corners */}
            <div className={inputWrapperClass}>
                <div className="self-stretch rounded-none bg-[#F5F6F7] h-11 flex flex-row items-center justify-between py-0 pl-4 pr-0 box-border">
                    <div className={inputContainerClass + " h-11 items-center"}>
                        <div className={labelClass}>
                            Email
                        </div>
                        {/* Icon */}
                        {inputPropsDefault.iconUrl && (
                            <img src={inputPropsDefault.iconUrl} alt="icon" className="w-5 h-5 mr-2" />
                        )}
                        {/* Input */}
                        <input
                            className={inputClass}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            readOnly={inputPropsDefault.readOnly}
                            placeholder={"Enter your email"}
                            type={emailType}
                        />
                        {/* Password toggle (if type is password) */}
                        {emailType === "password" && (
                            <div
                                onClick={() => setEmailShowPassword(!emailShowPassword)}
                                className="absolute right-4 opacity-70 z-[9999]"
                            >
                                <img src={emailShowPassword ? EyeOpenIcon : EyeCloseIcon} alt="" />
                            </div>
                        )}
                        {/* Help tooltip */}
                        {inputPropsDefault.showHelpTooltip && (
                            <div className="absolute right-4 z-[9999]">
                                <ToolTip text={inputPropsDefault.helpText || "Sample Info"}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_13336_71)">
                                            <path d="M6.05992 5.99998C6.21665 5.55442 6.52602 5.17872 6.93322 4.9394C7.34042 4.70009 7.81918 4.61261 8.2847 4.69245C8.75022 4.7723 9.17246 5.01433 9.47664 5.37567C9.78081 5.737 9.94729 6.19433 9.94659 6.66665C9.94659 7.99998 7.94659 8.66665 7.94659 8.66665M7.99992 11.3333H8.00659M14.6666 7.99998C14.6666 11.6819 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6819 1.33325 7.99998C1.33325 4.31808 4.31802 1.33331 7.99992 1.33331C11.6818 1.33331 14.6666 4.31808 14.6666 7.99998Z" stroke="#AFB8C1" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_13336_71">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </ToolTip>
                            </div>
                        )}
                        {/* Copy button */}
                        {inputPropsDefault.showCopyButton && (
                            <button
                                onClick={() => handleCopy(email, setEmailCopied, inputPropsDefault.onCopy)}
                                className="px-4 h-full flex items-center justify-center hover:bg-[#E8E9EA] transition-colors"
                            >
                                {emailCopied ? (
                                    <span className="text-[#4CAF50] text-sm">Copied!</span>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z" stroke="#737373" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M3.33333 10H2.66667C2.31305 10 1.97391 9.85953 1.72386 9.60948C1.47381 9.35943 1.33334 9.02029 1.33334 8.66667V2.66667C1.33334 2.31305 1.47381 1.97391 1.72386 1.72386C1.97391 1.47381 2.31305 1.33334 2.66667 1.33334H8.66667C9.02029 1.33334 9.35943 1.47381 9.60948 1.72386C9.85953 1.97391 10 2.31305 10 2.66667V3.33334" stroke="#737373" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {/* Designation input: only bottom corners rounded */}
            <div className={inputWrapperClass}>
                <div className="self-stretch rounded-t-none rounded-b-2xl bg-[#F5F6F7] h-11 flex flex-row items-center justify-between py-0 pl-4 pr-0 box-border">
                    <div className={inputContainerClass + " h-11 items-center"}>
                        <div className={labelClass}>
                            Designation
                        </div>
                        {/* Icon */}
                        {inputPropsDefault.iconUrl && (
                            <img src={inputPropsDefault.iconUrl} alt="icon" className="w-5 h-5 mr-2" />
                        )}
                        {/* Input */}
                        <input
                            className={inputClass}
                            value={designation}
                            onChange={e => setDesignation(e.target.value)}
                            readOnly={inputPropsDefault.readOnly}
                            placeholder={"Enter your designation"}
                            type={designationType}
                        />
                        {/* Password toggle (if type is password) */}
                        {designationType === "password" && (
                            <div
                                onClick={() => setDesignationShowPassword(!designationShowPassword)}
                                className="absolute right-4 opacity-70 z-[9999]"
                            >
                                <img src={designationShowPassword ? EyeOpenIcon : EyeCloseIcon} alt="" />
                            </div>
                        )}
                        {/* Help tooltip */}
                        {inputPropsDefault.showHelpTooltip && (
                            <div className="absolute right-4 z-[9999]">
                                <ToolTip text={inputPropsDefault.helpText || "Sample Info"}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_13336_71)">
                                            <path d="M6.05992 5.99998C6.21665 5.55442 6.52602 5.17872 6.93322 4.9394C7.34042 4.70009 7.81918 4.61261 8.2847 4.69245C8.75022 4.7723 9.17246 5.01433 9.47664 5.37567C9.78081 5.737 9.94729 6.19433 9.94659 6.66665C9.94659 7.99998 7.94659 8.66665 7.94659 8.66665M7.99992 11.3333H8.00659M14.6666 7.99998C14.6666 11.6819 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6819 1.33325 7.99998C1.33325 4.31808 4.31802 1.33331 7.99992 1.33331C11.6818 1.33331 14.6666 4.31808 14.6666 7.99998Z" stroke="#AFB8C1" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_13336_71">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </ToolTip>
                            </div>
                        )}
                        {/* Copy button */}
                        {inputPropsDefault.showCopyButton && (
                            <button
                                onClick={() => handleCopy(designation, setDesignationCopied, inputPropsDefault.onCopy)}
                                className="px-4 h-full flex items-center justify-center hover:bg-[#E8E9EA] transition-colors"
                            >
                                {designationCopied ? (
                                    <span className="text-[#4CAF50] text-sm">Copied!</span>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z" stroke="#737373" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M3.33333 10H2.66667C2.31305 10 1.97391 9.85953 1.72386 9.60948C1.47381 9.35943 1.33334 9.02029 1.33334 8.66667V2.66667C1.33334 2.31305 1.47381 1.97391 1.72386 1.72386C1.97391 1.47381 2.31305 1.33334 2.66667 1.33334H8.66667C9.02029 1.33334 9.35943 1.47381 9.60948 1.72386C9.85953 1.97391 10 2.31305 10 2.66667V3.33334" stroke="#737373" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormGroupV2;
