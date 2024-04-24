import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LandingPage } from "./pages/LandingPage";
import { NotFoundPage } from "./pages/NotFoundPage.js";

import { useAuth } from "./AuthContext.js";
import { Admin } from "./pages/Admin.js";
import { Login } from "./pages/Login.js";

const publicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  //   {
  //     path: "/register",
  //     element: <Register />,
  //   },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
]);

const privateRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Admin />,
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
]);

const Router = () => {
  //   const { isLogged } = useAuth();
  return <RouterProvider router={publicRoutes} />;
};

export default Router;
