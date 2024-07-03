// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  Link,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ForgotPage = lazy(() => import("./pages/ForgotPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const Groups = lazy(() => import("./components/dashboard/Groups"));
const GroupsItem = lazy(() => import("./components/dashboard/GroupsItem"));
const Modules = lazy(() => import("./components/dashboard/Modules"));
const ModulesItem = lazy(() => import("./components/dashboard/ModulesItem"));
const Simulate = lazy(() => import("./components/dashboard/Simulate"));
const Reports = lazy(() => import("./components/dashboard/Reports"));
const Settings = lazy(() => import("./components/dashboard/Settings"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function LoadingComponent() {
  return <div>Loading...</div>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        {true && (
          <div className="fixed top-0 bg-blue-200 hidden justify-center flex-wrap gap-2 px-2">
            |<Link to="/">Home</Link>|<Link to="/login">Login</Link>|
            <Link to="/register">Register</Link>|
            <Link to="/app/dashboard">Dashboard</Link>|
            <Link to="/app/settings">Settings</Link>|
            <Link to="/errorpage">Error</Link>|
          </div>
        )}
        <AuthProvider>
          <Suspense fallback={<LoadingComponent />}>
            <Outlet />
          </Suspense>
        </AuthProvider>
      </>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: "/forgot",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <ForgotPage />
          </Suspense>
        ),
      },
      {
        path: "/app",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <DashboardPage />
          </Suspense>
        ),
        children: [
          {
            path: "/app/",
            element: <Navigate to={"/app/dashboard"} replace={true} />,
          },
          {
            path: "/app/dashboard",
            element: (
              <Suspense fallback={<LoadingComponent />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: "/app/groups",
            element: (
              <Suspense fallback={<LoadingComponent />}>
                <Groups />
              </Suspense>
            ),
          },
          {
            path: "/app/group/:groupId",
            element: (
              <Suspense fallback={<LoadingComponent />}>
                <GroupsItem />
              </Suspense>
            ),
          },
          {
            path: "/app/modules",
            element: (
              <Suspense fallback={<LoadingComponent />}>
                <Modules />
              </Suspense>
            ),
          },
          {
            path: "/app/module/:moduleId",
            element: (
              <Suspense fallback={<LoadingComponent />}>
                <ModulesItem />
              </Suspense>
            ),
          },
          {
            path: "/app/simulate",
            element: (
              <Suspense fallback={<LoadingComponent />}>
                <Simulate />
              </Suspense>
            ),
          },
          {
            path: "/app/reports",
            element: (
              <Suspense fallback={<LoadingComponent />}>
                <Reports />
              </Suspense>
            ),
          },
          {
            path: "/app/settings",
            element: (
              <Suspense fallback={<LoadingComponent />}>
                <Settings />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<LoadingComponent />}>
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
