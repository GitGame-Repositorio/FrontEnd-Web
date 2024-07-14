import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { LandingPage } from "./pages/LandingPage/LandingPage";
import { NotFoundPage } from "./pages/NotFoundPage";

import { useAuth } from "./AuthContext";
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
    path: "/main",
    element: <LandingPage />,
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

const loggedRouters: RouteObject[] = [
  {
    path: "/user",
    element: <User />,
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
  const { isLogged, isLoading, isAdmin, user } = useAuth();

  const mainRouters = [
    user ? gameRouters : publicRoutes,
    {
      path: "/*",
      element: <NotFoundPage />,
    },
  ].flat();

  const routerAuth = isLogged
    ? [...mainRouters, ...loggedRouters]
    : mainRouters;

  const routerPermission = isAdmin
    ? [...adminRouters, ...routerAuth]
    : routerAuth;

  if (isLoading) return <Loading />;

  const router = createBrowserRouter(routerPermission);
  return <RouterProvider router={router} />;
};

export default Router;
