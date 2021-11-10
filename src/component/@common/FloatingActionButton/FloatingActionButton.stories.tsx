import React from "react";
import FloatingActionButton from "./FloatingActionButton";
import { ReactComponent as Logo } from "../../../asset/icon/logo.svg";

export default {
  component: FloatingActionButton,
  title: "Components/common/FloatingActionButton",
};

export const Primary = () => (
  <FloatingActionButton size="5rem" color="">
    <Logo />
  </FloatingActionButton>
);
