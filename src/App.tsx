import { Header, Main } from "./App.styles";
import Home from "./page";
import myGitBookSetting from "./myGitBookSetting.json";
import { getCodeReview } from "./service/pullRequest";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    getCodeReview("https://github.com/woowacourse/react-subway-map/pull/43");
  }, []);

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
