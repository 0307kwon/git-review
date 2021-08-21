import { Header, Main, RootContainer } from "./App.styles";
import Navigation from "./component/Navigation/Navigation";
import UserProvider from "./context/UserProvider/UserProvider";
import Home from "./page/Home/Home";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Setting from "./page/Setting/Setting";
import PullRequestURLProvider from "./context/PullRequestURLProvider/PullRequestURLProvider";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <PullRequestURLProvider>
          <Header>
            <div>
              <Link to="/">
                <h1>📖 gitBook</h1>
              </Link>
              <Navigation />
            </div>
          </Header>
          <RootContainer>
            <div>
              <Main>
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/setting">
                    <Setting />
                  </Route>
                </Switch>
              </Main>
            </div>
          </RootContainer>
        </PullRequestURLProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
