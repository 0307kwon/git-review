import { useEffect, useState } from "react";
import { Header, Main } from "./App.styles";
import { setIDBCodeReview } from "./database/indexedDB";
import myGitBookSetting from "./myGitBookSetting.json";
import Home from "./page";
import { getCodeReview } from "./service/pullRequest";
import { CodeReview } from "./util/types";

function App() {
  const [codeReviews, setCodeReview] = useState<CodeReview[]>([]);

  useEffect(() => {
    loadCodeReview();
  }, []);

  const loadCodeReview = async () => {
    //codeReview를 가져와서 컴포넌트 state에 set해야함
    const codeReviewPromises = myGitBookSetting.url.map((url) =>
      getCodeReview(url)
    );
    let codeReviews: CodeReview[] = [];

    //TODO: 하나라도 실패하면 로드에 실패함 => 수정해야함
    (await Promise.all(codeReviewPromises)).forEach((reviews) => {
      codeReviews.push(...reviews);
    });

    setCodeReview(codeReviews);
  };

  return (
    <div>
      <Header>
        <h1>📖 gitBook</h1>
      </Header>
      <Main>
        <Home />
      </Main>
    </div>
  );
}

export default App;
