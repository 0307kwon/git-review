import { Provider } from "react-redux";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Header, Main, RootContainer } from "./App.styles";
import { ReactComponent as Logo } from "./asset/icon/logo.svg";
import ErrorBoundary from "./component/@common/ErrorBoundary/ErrorBoundary";
import FlexContainer from "./component/@common/FlexContainer/FlexContainer";
import UserProfile from "./component/UserProfile/UserProfile";
import CodeReviewProvider from "./context/CodeReviewProvider/CodeReviewProvider";
import ModalProvider from "./context/modalProvider/ModalProvider";
import SnackbarProvider from "./context/snackbar/SnackbarProvider";
import FloatingView from "./FloatingView";
import Home from "./page/Home/Home";
import SearchProvider from "./page/Home/SearchProvider/SearchProvider";
import Setting from "./page/Setting/Setting";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <SnackbarProvider>
            <CodeReviewProvider>
              <ModalProvider>
                <Header>
                  <div>
                    <Link to="/">
                      <FlexContainer alignItems="center" gap="0.5rem">
                        <Logo />
                        <h1 className="logo">GitReview</h1>
                      </FlexContainer>
                    </Link>
                    <UserProfile />
                  </div>
                </Header>
                <RootContainer>
                  <Main>
                    <Switch>
                      <Route exact path="/">
                        <SearchProvider>
                          <Home />
                        </SearchProvider>
                      </Route>
                      <Route path="/setting">
                        <Setting />
                      </Route>
                    </Switch>
                  </Main>
                  <FloatingView />
                </RootContainer>
              </ModalProvider>
            </CodeReviewProvider>
          </SnackbarProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
