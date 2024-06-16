// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import Dashboard from "./components/dashboard/Dashboard";
import Settings from "./components/dashboard/Settings";
import NotFoundPage from "./pages/NotFoundPage";
import { AuthProvider } from "./contexts/authContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        {true && (
          <div className="fixed top-0 bg-blue-200 flex justify-center flex-wrap gap-2 px-2">
            |<Link to="/">Home</Link>|<Link to="/login">Login</Link>|
            <Link to="/register">Register</Link>|
            <Link to="/dashboard">Dashboard</Link>|
            <Link to="/dashboard/settings">Settings</Link>|
            <Link to="/errorpage">Error</Link>|
          </div>
        )}
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
        children: [
          {
            path: "/dashboard/",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/settings",
            element: <Settings />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
