import React from "react";
import Select from "./Select";

export default {
  component: Select,
  title: "Components/common/Select",
};

export const Default = () => {
  return (
    <div>
      <Select
        onChange={(value) => {
          console.log(value);
        }}
        width="200px"
        labelText="테스트"
      >
        <option value="전체보기">전체보기</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="hamster">Hamster</option>
        <option value="parrot">Parrot</option>
        <option value="spider">Spider</option>
        <option value="goldfish">Goldfish</option>
      </Select>
    </div>
  );
};
