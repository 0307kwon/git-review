import React from "react";
import HelpCardTemplate from "../@common/HelpCardTemplate/HelpCardTemplate";

const FirstVisit = () => {
  return (
    <HelpCardTemplate>
      {{
        title: "🙌 처음이시군요! 환영합니다.",
        subTitle: (
          <>
            깃리뷰는 깃헙 PR의 코드 리뷰를 따로 모아 볼 수 있는 앱입니다.
            <br></br>
            로그인 후 자신만의 코드 리뷰 모음집을 만들어보세요!
          </>
        ),
      }}
    </HelpCardTemplate>
  );
};

export default FirstVisit;
