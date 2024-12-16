import React from "react";
import Badge from "../Badge";
import checkIcon from "../../assets/icons/checkIcon.svg"
import star from "../../assets/icons/star.svg";


interface IBillingCardProps {
  title: string;
  description: string;
  features: string[];
  isActive: boolean;
  totalUser: number;
  activeUser: number;
  button?: React.ReactNode;
  featuresTitle:string
}

export const BillingCard: React.FC<IBillingCardProps> = ({
  title,
  description,
  features,
  isActive,
  totalUser,
  activeUser,
  button,
  featuresTitle
}) => {
  return (
    <div className={`p-6 border border-solid border-gray-200 rounded-2xl flex flex-col w-full shadow-sm ${isActive ? 'cursor-default' : 'cursor-not-allowed	'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-base font-semibold text-text-primary">{title}</h2>
          <p className="text-sm text-gray-600 text-secondary-700">{description}</p>
        </div>
        {isActive ? <div className="text-right flex flex-col items-end">
          <span className="text-4xl font-medium pb-2 flex">{activeUser}/{totalUser}</span>
          <Badge color="default">Active Users</Badge>
        </div> : 
        <div className="text-right flex flex-col items-end">
        <Badge color="primary" icon={star}>Coming Soon</Badge>
      </div>
        }
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2 text-secondary-700 text-sm">{featuresTitle}</h3>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <img src={checkIcon} alt="CheckIcon"></img>
              <span className="text-gray-600 text-base pl-2 font-normal">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {button && (
        <div className="flex justify-end text-base">
          {button}
        </div>
      )}
    </div>
  );
};

export default BillingCard;