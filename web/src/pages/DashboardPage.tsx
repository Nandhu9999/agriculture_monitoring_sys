import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function DashboardPage() {
  const { userLoggedIn } = useAuth();
  return (
    <div>
      {!userLoggedIn && <Navigate to={"/login"} replace={true} />}
      <div>DashboardPage</div>
      <Outlet />
    </div>
  );
}
