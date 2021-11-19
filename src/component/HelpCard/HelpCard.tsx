import React from "react";
import useCodeReviews from "../../context/CodeReviewProvider/useCodeReviews";
import useUser from "../../context/UserProvider/useUser";
import useSearch from "../../page/Home/SearchProvider/useSearch";
import { CardContainer } from "./HelpCard.styles";
import CodeReviewNotExist from "./helpCards/CodeReviewNotExist";
import FirstVisit from "./helpCards/FirstVisit";
import LoginMode from "./helpCards/LoginMode";
import OfflineMode from "./helpCards/OfflineMode";
import SearchResultsNotExist from "./helpCards/SearchResultsNotExist";

interface Props {
  //codeReviews -> isCodeReviewExist 로 수정
  searchKeyword: string;
}

const HelpCard = ({ searchKeyword }: Props) => {
  const user = useUser();
  const { codeReviews } = useCodeReviews();
  const { searchedReviews } = useSearch();

  const getCardToShow = (): React.ReactNode => {
    if (searchedReviews.length === 0 && searchKeyword.length > 0) {
      return <SearchResultsNotExist />;
    }

    if (!user.isLogin && codeReviews.length === 0) {
      return <FirstVisit />;
    }

    if (!user.isLogin) {
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
