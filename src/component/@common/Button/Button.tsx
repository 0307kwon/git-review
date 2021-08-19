import React, { HTMLAttributes } from "react";
import { RootButton } from "./Button.styles";

const Button = ({
  children,
  className,
  ...option
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <RootButton className={className} {...option}>
      {children}
    </RootButton>
  );
};

export default Button;
