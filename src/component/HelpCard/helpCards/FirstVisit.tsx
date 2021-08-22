import React from "react";
import HelpCardTemplate from "../@common/HelpCardTemplate/HelpCardTemplate";

const FirstVisit = () => {
  return (
    <HelpCardTemplate>
      {{
        title: "🙌 처음이시군요! 환영합니다.",
        subTitle: "로그인 후 자신만의 코드 리뷰 모음집을 만들어보세요!",
      }}
    </HelpCardTemplate>
  );
};

export default FirstVisit;
