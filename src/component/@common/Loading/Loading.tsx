import React from "react";
import { LoadingContainer } from "./Loading.styles";

const Loading = () => {
  return (
    <LoadingContainer>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </LoadingContainer>
  );
};

export default Loading;
