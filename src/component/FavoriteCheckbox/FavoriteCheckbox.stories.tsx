import React from "react";
import FavoriteCheckbox from "./FavoriteCheckbox";

export default {
  component: FavoriteCheckbox,
  title: "Components/common/FavoriteCheckbox",
};

export const Default = () => {
  return <FavoriteCheckbox labelText="좋아요" />;
};
