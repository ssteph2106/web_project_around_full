import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

type ProtectedRouteProps = {
  isLoggedIn: boolean;
  isLoading: boolean;
  children: ReactNode;
};

function ProtectedRoute({
  isLoggedIn,
  isLoading,
  children,
}: ProtectedRouteProps) {
  if (isLoading) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
