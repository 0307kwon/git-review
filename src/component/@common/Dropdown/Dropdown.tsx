import React from "react";
import { forwardRef } from "react";
import { Menu } from "./Dropdown.styles";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Dropdown = forwardRef<HTMLDivElement, Props>(
  ({ children, className }, ref) => {
    return (
      <Menu ref={ref} className={className}>
        {children}
      </Menu>
    );
  }
);

export default Dropdown;
