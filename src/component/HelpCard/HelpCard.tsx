import React from "react";
import usePullRequestURL from "../../context/PullRequestURLProvider/usePullRequestURL";
import useUser from "../../context/UserProvider/useUser";
import { CodeReview } from "../../util/types";
import FirstVisit from "./FirstVisit/FirstVisit";
import { CardContainer } from "./HelpCard.styles";
import LoginMode from "./LoginMode/LoginMode";
import OfflineMode from "./OfflineMode/OfflineMode";

interface Props {
  codeReviews: CodeReview[];
}

const HelpCard = ({ codeReviews }: Props) => {
  const user = useUser();

  const getCardToShow = (): React.ReactNode => {
    if (!user.isLogin && codeReviews.length === 0) {
      return <FirstVisit />;
    }

    if (!user.isLogin) {
      return <OfflineMode />;
    }

    return <LoginMode />;
  };

  return <CardContainer>{getCardToShow()}</CardContainer>;
};

export default HelpCard;
