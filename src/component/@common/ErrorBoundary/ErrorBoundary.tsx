import { Component, ErrorInfo, ReactNode } from "react";
import { Anchor } from "../Anchor/Anchor";
import { ErrorBoundaryContainer, ErrorMark } from "./ErrorBoundary.styles";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

const defaultFallback = (
  <ErrorBoundaryContainer>
    <ErrorMark />
    <p>
      예기치 못한 에러가 발생했습니다. (
      <Anchor
        target="blank"
        href="https://github.com/0307kwon/git-review/issues"
      >
        문의
      </Anchor>
      )
    </p>
  </ErrorBoundaryContainer>
);

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props?.fallback || defaultFallback;
    }

    return this.props.children;
  }
}
