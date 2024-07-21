import { ErrorBoundary } from "react-error-boundary";

export const Layout = () => {
  return (
    <ErrorBoundary fallback={<h1>Error</h1>}>{/* <App /> */}</ErrorBoundary>
  );
};
