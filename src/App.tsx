import { Header, Main } from "./App.styles";
import Home from "./page";

function App() {
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
