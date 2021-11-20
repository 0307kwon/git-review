import React, { InputHTMLAttributes } from "react";
import { Label } from "./CheckboxInput.styles";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  labelText: string;
}

const CheckboxInput = ({ labelText, ...option }: Props) => {
  return (
    <Label>
      <input className="radio-input" type="checkbox" {...option}></input>
      <span className="radio-mark">{labelText}</span>
    </Label>
  );
};

export default CheckboxInput;
