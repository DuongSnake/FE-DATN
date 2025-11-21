import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import ErrorBoundary from './error-boundary';

export const ErrorBoundaryRoute = ({ element: Element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        <ErrorBoundary>
          <Element />
        </ErrorBoundary>
      }
    />
  );
};

export default ErrorBoundaryRoute;
