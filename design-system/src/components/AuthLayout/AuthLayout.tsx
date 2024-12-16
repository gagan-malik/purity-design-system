import React, { useEffect, useState } from "react";
import AuthHeader from "./Header";
import classNames from "classnames";

interface IPropsAuthLayout {
  header: React.ReactNode;
  headerTitle?: string;
  headerDescription?: React.ReactNode;
  headerImageUrl?: string;
  children?: React.ReactNode;
  footer: React.ReactNode;
  shadow: boolean;
}

const AuthLayout = (props: IPropsAuthLayout) => {
  const {
    headerTitle,
    headerDescription,
    headerImageUrl,
    children,
    footer,
    header,
    shadow,
  } = props;

  const [style, setStyle] = useState({});

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setStyle({
          // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        });
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const authLayoutClass = classNames("flex flex-col gap-8 w-[360px]", {
    "md:p-4 md:rounded-md md:sh": shadow,
  });
  return (
    <div style={style} className={authLayoutClass}>
      {header ? (
        header
      ) : headerTitle ? (
        <AuthHeader
          imageUrl={headerImageUrl}
          title={headerTitle}
          description={headerDescription}
        />
      ) : (
        <></>
      )}

      {children}
      {footer}
    </div>
  );
};

export default AuthLayout;
