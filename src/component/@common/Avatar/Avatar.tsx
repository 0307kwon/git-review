import React from "react";
import { AvatarContainer, AvatarImg } from "./Avatar.styles";

interface Props {
  imgURL: string;
  nickname?: string;
  className?: string;
}

const Avatar = ({ imgURL, nickname, className }: Props) => {
  return (
    <AvatarContainer>
      <AvatarImg className={className} imgURL={imgURL} />
      {nickname && <span>{nickname}</span>}
    </AvatarContainer>
  );
};

export default Avatar;
