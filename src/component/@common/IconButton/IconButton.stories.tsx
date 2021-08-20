import React from "react";
import IconButton from "./IconButton";
import { ReactComponent as ModifyIcon } from "../../../icon/modify.svg";

export default {
  component: IconButton,
  title: "Components/common/IconButton",
};

export const Primary = () => (
  <IconButton size="2rem">
    <ModifyIcon />
  </IconButton>
);
