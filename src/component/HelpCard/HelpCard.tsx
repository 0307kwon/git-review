import React from "react";
import FirstVisit from "./FirstVisit/FirstVisit";
import { CardContainer } from "./HelpCard.styles";

const HelpCard = () => {
  return (
    <CardContainer>
      <FirstVisit />
    </CardContainer>
  );
};

export default HelpCard;
