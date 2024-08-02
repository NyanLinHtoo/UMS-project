import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import AppLayoutPage from "../components/layouts/LayoutPage";
import Login from "../components/authentication/login/Login";
import Register from "../components/authentication/register/Register";
import NotFoundPage from "../components/error-pages/NotFoundPage";
import UserTable from "../components/user/UserTable";

const Router = () => {
  const config = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" replace />,
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
      path: "/dashboard",
      element: <AppLayoutPage />,
      children: [
        {
          path: "/dashboard/users",
          element: <UserTable />,
        },
      ],
    },
    {
      path: "/*",
      element: <NotFoundPage />,
    },
  ]);
  return <RouterProvider router={config} />;
};

export default Router;
