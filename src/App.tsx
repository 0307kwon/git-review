import { Header, Main, RootContainer } from "./App.styles";
import Navigation from "./component/Navigation/Navigation";
import UserProvider from "./context/UserProvider/UserProvider";
import Home from "./page/Home/Home";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Setting from "./page/Setting/Setting";
import PullRequestURLProvider from "./context/PullRequestURLProvider/PullRequestURLProvider";
import ModalProvider from "./context/modalProvider/ModalProvider";
import { ReactComponent as Logo } from "./asset/icon/logo.svg";
import FlexContainer from "./component/@common/FlexContainer/FlexContainer";
import SnackbarProvider from "./context/snackbar/SnackbarProvider";
import ErrorBoundary from "./component/@common/ErrorBoundary/ErrorBoundary";
import CodeReviewProvider from "./context/CodeReviewProvider/CodeReviewProvider";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ModalProvider>
          <SnackbarProvider>
            <UserProvider>
              <PullRequestURLProvider>
                <CodeReviewProvider>
                  <Header>
                    <div>
                      <Link to="/">
                        <FlexContainer alignItems="center" gap="0.5rem">
                          <Logo />
                          <h1 className="logo">GitReview</h1>
                        </FlexContainer>
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
                </CodeReviewProvider>
              </PullRequestURLProvider>
            </UserProvider>
          </SnackbarProvider>
        </ModalProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
