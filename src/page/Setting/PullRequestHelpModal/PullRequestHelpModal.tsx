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
        <h2>๐ ๋์๋ง</h2>
        <p>pull request url ๋ฑ๋ก์ ์ด๋ป๊ฒ ํ๋์?</p>
      </FlexContainer>

      <DescriptionContainer>
        <h3>1. ์ฝ๋๋ฆฌ๋ทฐ๋ก ๊ฐ์ ธ์ค๊ณ  ์ถ์ repository๋ก ์ด๋ํฉ๋๋ค.</h3>
        <FlexContainer justifyContent="center">
          <Img src={helpImg1} />
        </FlexContainer>
      </DescriptionContainer>

      <DescriptionContainer>
        <h3>2. ์ํ๋ PR์ ๋งํฌ๋ฅผ ๋ณต์ฌํด์ฃผ์ธ์.</h3>
        <FlexContainer justifyContent="center">
          <Img src={helpImg2} />
        </FlexContainer>
      </DescriptionContainer>

      <DescriptionContainer>
        <h3>3. ๋ณต์ฌํ ๋งํฌ๋ฅผ ๋ถ์ฌ๋ฃ๊ณ  ํด๋น PR์ ๋ณ์นญ์ ์ค์ ํ๋ฉด ๋!</h3>
        <FlexContainer justifyContent="center">
          <Img src={helpImg3} />
        </FlexContainer>
      </DescriptionContainer>

      <DescriptionContainer>
        <h3>+ github ํ ํฐ์ ๋ฑ๋กํ์ง ์์ผ๋ฉด ์ฌ์ฉ๋์ ์ ํ์ด ์์ด์.</h3>
        <p>์ ํ ์์ด ์ฌ์ฉํ๋ ค๋ฉด ํ ํฐ ๋ฑ๋ก์ ํด์ฃผ์ธ์.</p>
        <FlexContainer justifyContent="center">
          <Img src={helpImg4} />
        </FlexContainer>
      </DescriptionContainer>
    </HelpContainer>
  );
};

export default PullRequestHelpModal;
