import React from "react";
import FlexContainer from "../../../component/@common/FlexContainer/FlexContainer";
import {
  DescriptionContainer,
  HelpContainer,
  Img,
} from "./PullRequestHelpModal.styles";
import helpImg1 from "../../../asset/img/prHelpImg1.png";
import helpImg2 from "../../../asset/img/prHelpImg2.png";
import helpImg3 from "../../../asset/img/prHelpImg3.png";
import helpImg4 from "../../../asset/img/prHelpImg4.png";

const PullRequestHelpModal = () => {
  return (
    <HelpContainer>
      <FlexContainer flexDirection="column" gap="0.25rem">
        <h2>📖 도움말</h2>
        <p>pull request url 등록은 어떻게 하나요?</p>
      </FlexContainer>

      <DescriptionContainer>
        <h3>1. 코드리뷰로 가져오고 싶은 repository로 이동합니다.</h3>
        <FlexContainer justifyContent="center">
          <Img src={helpImg1} />
        </FlexContainer>
      </DescriptionContainer>

      <DescriptionContainer>
        <h3>2. 원하는 PR의 링크를 복사해주세요.</h3>
        <FlexContainer justifyContent="center">
          <Img src={helpImg2} />
        </FlexContainer>
      </DescriptionContainer>

      <DescriptionContainer>
        <h3>3. 복사한 링크를 붙여넣고 해당 PR의 별칭을 설정하면 끝!</h3>
        <FlexContainer justifyContent="center">
          <Img src={helpImg3} />
        </FlexContainer>
      </DescriptionContainer>

      <DescriptionContainer>
        <h3>+ github 토큰을 등록하지 않으면 사용량에 제한이 있어요.</h3>
        <p>제한 없이 사용하려면 토큰 등록을 해주세요.</p>
        <FlexContainer justifyContent="center">
          <Img src={helpImg4} />
        </FlexContainer>
      </DescriptionContainer>
    </HelpContainer>
  );
};

export default PullRequestHelpModal;
