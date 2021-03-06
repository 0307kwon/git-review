import React from "react";
import useCodeReviews from "../../context/CodeReviewProvider/useCodeReviews";
import useUserInfo from "../../hook/userInfo/useUserInfo";
import useSearch from "../../page/Home/SearchProvider/useSearch";
import { CardContainer } from "./HelpCard.styles";
import CodeReviewNotExist from "./helpCards/CodeReviewNotExist";
import FirstVisit from "./helpCards/FirstVisit";
import LoginMode from "./helpCards/LoginMode";
import OfflineMode from "./helpCards/OfflineMode";
import SearchResultsNotExist from "./helpCards/SearchResultsNotExist";

const HelpCard = () => {
  const user = useUserInfo();
  const { codeReviews } = useCodeReviews();
  const { searchedReviews } = useSearch();

  const getCardToShow = (): React.ReactNode => {
    if (searchedReviews?.length === 0) {
      return <SearchResultsNotExist />;
    }

    if (!user.data && codeReviews.length === 0) {
      return <FirstVisit />;
    }

    if (!user.data) {
      return <OfflineMode />;
    }

    if (codeReviews.length === 0) {
      return <CodeReviewNotExist />;
    }

    return <LoginMode />;
  };

  return <CardContainer>{getCardToShow()}</CardContainer>;
};

export default HelpCard;
