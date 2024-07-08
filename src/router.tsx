import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { LandingPage } from "./pages/LandingPage/LandingPage";
import { NotFoundPage } from "./pages/NotFoundPage";

import { useAuth } from "./AuthContext";
import { Admin } from "./pages/Admin";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { User } from "./pages/User/User";
import { AllCapters } from "./pages/AllCapters/AllCapters";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { VerifyCode } from "./pages/auth/VerifyCode";
import { ChangePassword } from "./pages/auth/ChangePassword";
import { Loading } from "./pages/Loading";
import { Level } from "./pages/Level/Level";
import { Dashboard } from "./pages/Dashboard/Dashboard";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/main" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/recovery-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-code",
    element: <VerifyCode />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
];

const commonRouters: RouteObject[] = [
  {
    path: "/main",
    element: <LandingPage />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
];

const gameRouters: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/all-capters" />,
  },
  {
    path: "/all-capters",
    element: <AllCapters />,
  },
  {
    path: "/level/:id",
    element: <Level />,
  },
];

const adminRouters: RouteObject[] = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];

const Router = () => {
  const { isLogged, isLoading, isAdmin } = useAuth();

  const mainRouters = [...commonRouters, ...gameRouters];

  const routerAuth = isLogged
    ? isAdmin
      ? [...mainRouters, ...adminRouters]
      : [...mainRouters]
    : [...mainRouters, ...publicRoutes];

  if (isLoading) return <Loading />;

  const router = createBrowserRouter(routerAuth);
  return <RouterProvider router={router} />;
};

export default Router;
