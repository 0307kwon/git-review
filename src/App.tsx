import { Header, Main } from "./App.styles";
import Navigation from "./component/Navigation/Navigation";
import UserProvider from "./context/user/UserProvider";
import { RootContainer } from "./index.styles";
import Home from "./page/Home/Home";

function App() {
  return (
    <UserProvider>
      <Header>
        <div>
          <h1>📖 gitBook</h1>
          <Navigation />
        </div>
      </Header>
      <RootContainer>
        <div>
          <Main>
            <Home />
          </Main>
        </div>
      </RootContainer>
    </UserProvider>
  );
}

export default App;
