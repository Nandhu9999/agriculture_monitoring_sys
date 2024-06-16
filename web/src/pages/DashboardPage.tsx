import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function DashboardPage() {
  const { userLoggedIn } = useAuth();
  if (!userLoggedIn) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return (
    <div>
      <div>DashboardPage</div>
      <Outlet />
    </div>
  );
}
