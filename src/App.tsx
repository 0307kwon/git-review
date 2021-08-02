import { Header, Main } from "./App.styles";
import { RootContainer } from "./index.styles";
import Home from "./page";

function App() {
  return (
    <>
      <Header>
        <div>
          <h1>📖 gitBook</h1>
        </div>
      </Header>
      <RootContainer>
        <div>
          <Main>
            <Home />
          </Main>
        </div>
      </RootContainer>
    </>
  );
}

export default App;
