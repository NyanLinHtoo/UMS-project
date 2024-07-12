import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayoutPage from "../../components/layouts/LayoutPage";
import Login from "../../components/authentication/login/Login";
import Register from "../../components/authentication/register/Register";
import NotFoundPage from "../../components/error-pages/NotFoundPage";
import UserTable from "../../components/user/UserTable";

const Router = () => {
  const config = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <AppLayoutPage />,
      children: [
        {
          path: "/users",
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
