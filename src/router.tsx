import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { LandingPage } from "./pages/LandingPage";
import { NotFoundPage } from "./pages/NotFoundPage";

import { useAuth } from "./AuthContext";
import { Admin } from "./pages/Admin";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Activity } from "./pages/game/Activity";
import { AllCapters } from "./pages/AllCapters";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { VerifyCode } from "./pages/auth/VerifyCode";
import { ChangePassword } from "./pages/auth/ChangePassword";
import { Loading } from "./pages/Loading";
import { Level } from "./pages/game/Level";

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
  {
    path: "/activity",
    element: <Activity />,
  },
];

const commonRouters: RouteObject[] = [
  {
    path: "/main",
    element: <LandingPage />,
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
    path: "/",
    element: <Admin />,
  },
];

const Router = () => {
  const { isLogged, isLoading } = useAuth();

  const routerAuth = isLogged
    ? [...commonRouters, ...gameRouters]
    : [...commonRouters, ...publicRoutes, ...gameRouters];

  if (isLoading) return <Loading />;

  const router = createBrowserRouter(routerAuth);
  return <RouterProvider router={router} />;
};

export default Router;
