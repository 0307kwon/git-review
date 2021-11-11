import React from "react";
import PWAAddButton from "./component/PWAAddButton/PWAAddButton";
import { FloatingContainer } from "./FloatingView.styles";

const FloatingView = () => {
  return (
    <FloatingContainer>
      <PWAAddButton className="button-for-pwa" />
    </FloatingContainer>
  );
};

export default FloatingView;
