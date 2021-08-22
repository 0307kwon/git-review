import React from "react";
import HelpCardTemplate from "../@common/HelpCardTemplate/HelpCardTemplate";

const CodeReviewNotExist = () => {
  return (
    <HelpCardTemplate>
      {{
        title: "🚧 코드 리뷰 목록이 아직 등록되지 않았어요",
        subTitle: "프로필 - 설정을 클릭해 리뷰 목록을 업데이트 해보세요!",
      }}
    </HelpCardTemplate>
  );
};

export default CodeReviewNotExist;
