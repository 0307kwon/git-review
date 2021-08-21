import React from "react";
import HelpCardTemplate from "../HelpCardTemplate/HelpCardTemplate";

const OfflineMode = () => {
  return (
    <HelpCardTemplate>
      {{
        title: "💤 오프라인 모드입니다.",
        subTitle: "저장된 PR 목록이 최신이 아닐 수 있습니다.",
      }}
    </HelpCardTemplate>
  );
};

export default OfflineMode;
