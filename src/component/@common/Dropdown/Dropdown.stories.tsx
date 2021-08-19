import React from "react";

import Dropdown from "./Dropdown";

export default {
  title: "components/common/Dropdown",
  component: Dropdown,
  argTypes: {},
};

export const Default = () => (
  <Dropdown>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </Dropdown>
);
