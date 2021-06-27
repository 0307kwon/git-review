import React from "react";
import { VFC } from "react";
import Search from "../component/Search/Search";
import { HomeContents } from "./index.styles";

const Home: VFC = () => {
  return (
    <div>
      <Search />
      <HomeContents>될까용~</HomeContents>
    </div>
  );
};

export default Home;
