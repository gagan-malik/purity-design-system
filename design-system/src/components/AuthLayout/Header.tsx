import React from "react";

interface IPropsHeader {
  imageUrl?: string;
  title?: string;
  description?: React.ReactNode;
}

const AuthHeader = (props: IPropsHeader) => {
  const { imageUrl, title, description } = props;

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="logo" />
        </div>
      )}

      {title && (
        <div className="flex flex-col items-center justify-center gap-3">
          {title && (
            <p className="text-3xl font-semibold text-text-primary">{title}</p>
          )}
          {description && description}
        </div>
      )}
    </div>
  );
};

export default AuthHeader;
