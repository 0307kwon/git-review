import React, { InputHTMLAttributes } from "react";
import { StyledInput } from "./Input.styles";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
}

const Input = ({ width, ...option }: Props) => {
  return <StyledInput width={width} {...option} />;
};

export default Input;
