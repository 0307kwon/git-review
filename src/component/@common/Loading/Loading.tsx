import React from "react";
import { LoadingContainer } from "./Loading.styles";

const Loading = ({
  size = "80px",
  thickness = "8px",
}: {
  size?: string;
  thickness?: string;
}) => {
  return (
    <LoadingContainer size={size} thickness={thickness}>
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
