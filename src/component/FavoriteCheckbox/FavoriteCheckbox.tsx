import React, { InputHTMLAttributes } from "react";
import { ReactComponent as HeartSvg } from "../../asset/icon/heart.svg";
import { ReactComponent as EmptyHeartSvg } from "../../asset/icon/emptyHeart.svg";
import { Label } from "./FavoriteCheckbox.styles";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  labelText: string;
}

const FavoriteCheckbox = ({ labelText, ...option }: Props) => {
  return (
    <Label>
      <span className="visually-hidden">{labelText}</span>
      <input className="visually-hidden" type="checkbox" {...option} />
      <EmptyHeartSvg className="unchecked" />
      <HeartSvg className="checked" />
    </Label>
  );
};

export default FavoriteCheckbox;
