import React from "react";
import { Navigate } from "react-router-dom";
import { CookiesStorage } from "../../shared/utils/cookie-storage";
import { PATH_NAME } from "../../shared/constants/routes";

interface IAuthGuard {
  children?: React.ReactNode;
}

const AuthGuard = ({ children }: IAuthGuard) => {
  const isAuth = CookiesStorage.getAccessToken();

  if (!isAuth) return <Navigate to={PATH_NAME.Login} replace={true} />;

  return <>{children}</>;
};

export default AuthGuard;
