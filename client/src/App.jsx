import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RootLayout from "./layout/rootLayout";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function App() {
  const { authUser } = useContext(AuthContext);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: authUser ? <HomePage /> : <LoginPage />,
        },
        {
          path: "/login",
          element: !authUser ? <LoginPage /> : <Navigate to="/" />,
        },
        {
          path: "/profile",
          element: authUser ? <ProfilePage /> : <LoginPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
}
export default App;
