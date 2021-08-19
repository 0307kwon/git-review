import React from "react";
import { Menu } from "./Dropdown.styles";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Dropdown = ({ children, className }: Props) => {
  return <Menu className={className}>{children}</Menu>;
};

export default Dropdown;
