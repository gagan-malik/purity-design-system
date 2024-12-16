import React from "react";
import { Link } from "react-router-dom";
interface IAuthFooter {
  description?: string;
  link?: { text: string; link: string };
}
const AuthFooter = (props: IAuthFooter) => {
  const { description, link } = props;

  return (
    <div className="flex items-center justify-center gap-1 text-sm font-normal">
      {description && <p className="text-sm font-normal">{description}</p>}
      {link && (
        <a href={link.link}>
          <p className="font-semibold text-sm text-blue-700"> {link.text}</p>
        </a>
      )}
    </div>
  );
};

export default AuthFooter;
