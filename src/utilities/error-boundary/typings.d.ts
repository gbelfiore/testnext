interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export { ErrorBoundaryProps, ErrorBoundaryState };
