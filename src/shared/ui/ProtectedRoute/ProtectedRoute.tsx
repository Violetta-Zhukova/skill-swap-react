import { type ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Пока нет авторизации, просто возвращаем children
  // В будущем здесь можно добавить проверку авторизации
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  return <>{children}</>;
};
