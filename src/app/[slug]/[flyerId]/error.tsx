"use client";
const ErrorPage = ({ error }: { error: Error & { digest?: string } }) => {
  return <div>{error.digest}</div>;
};

export default ErrorPage;
