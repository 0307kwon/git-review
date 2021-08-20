import React from "react";
import { ButtonHTMLAttributes } from "react";
import { RootButton } from "./Button.styles";

const Button = ({
  children,
  className,
  ...option
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <RootButton className={className} {...option}>
      {children}
    </RootButton>
  );
};

export default Button;
