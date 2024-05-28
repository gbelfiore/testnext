import { Component, ErrorInfo } from "react";
import {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from "~/utilities/error-boundary/typings";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) return null;

    return this.props.children;
  }
}

export { ErrorBoundary };
