import React from "react";
import Avatar from "./Avatar";

export default {
  component: Avatar,
  title: "Components/common/Avatar",
};

export const Primary = () => (
  <Avatar
    imgURL="https://avatars.githubusercontent.com/u/6455767?v=4"
    nickname="발리스타"
  />
);
