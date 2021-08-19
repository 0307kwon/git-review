import React from "react";
import { AvatarContainer, AvatarImg } from "./Avatar.styles";

interface Props {
  imgURL: string;
  nickname: string;
}

const Avatar = ({ imgURL, nickname }: Props) => {
  return (
    <AvatarContainer>
      <AvatarImg imgURL={imgURL} />
      <span>{nickname}</span>
    </AvatarContainer>
  );
};

export default Avatar;
