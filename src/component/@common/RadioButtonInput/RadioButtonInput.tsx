import React, { InputHTMLAttributes } from "react";
import { Label } from "./RadioButtonInput.styles";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  labelText: string;
}

const RadioButtonInput = ({ labelText, ...option }: Props) => {
  return (
    <Label>
      <input className="radio-input" type="radio" {...option}></input>
      <span className="radio-mark">{labelText}</span>
    </Label>
  );
};

export default RadioButtonInput;
