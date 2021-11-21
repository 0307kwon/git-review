import React, { InputHTMLAttributes } from "react";
import { PALETTE } from "../../../constant/palette";
import { Label } from "./RadioInput.styles";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  labelText: string;
  color?: PALETTE;
}

const RadioInput = ({
  labelText,
  color = PALETTE.PRIMARY_400,
  ...option
}: Props) => {
  return (
    <Label color={color}>
      <input className="radio-input" type="radio" {...option}></input>
      <span className="radio-mark">{labelText}</span>
    </Label>
  );
};

export default RadioInput;
