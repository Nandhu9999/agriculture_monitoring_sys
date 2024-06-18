// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const Services = lazy(() => import("./components/dashboard/Services"));
const ServiceItem = lazy(
  () => import("./components/dashboard/service/ServiceItem")
);
const Simulation = lazy(() => import("./components/dashboard/Simulation"));
const Reports = lazy(() => import("./components/dashboard/Reports"));
const Settings = lazy(() => import("./components/dashboard/Settings"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        {true && (
          <div className="fixed top-0 bg-blue-200 hidden justify-center flex-wrap gap-2 px-2">
            |<Link to="/">Home</Link>|<Link to="/login">Login</Link>|
            <Link to="/register">Register</Link>|
            <Link to="/dashboard">Dashboard</Link>|
            <Link to="/dashboard/settings">Settings</Link>|
            <Link to="/errorpage">Error</Link>|
          </div>
        )}
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </AuthProvider>
      </>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardPage />
          </Suspense>
        ),
        children: [
          {
            path: "/dashboard/",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: "/dashboard/services",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Services />
              </Suspense>
            ),
          },
          {
            path: "/dashboard/service/:serviceId",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <ServiceItem />
              </Suspense>
            ),
          },
          {
            path: "/dashboard/simulation",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Simulation />
              </Suspense>
            ),
          },
          {
            path: "/dashboard/reports",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Reports />
              </Suspense>
            ),
          },
          {
            path: "/dashboard/settings",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Settings />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NotFoundPage />
          </Suspense>
        ),
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
