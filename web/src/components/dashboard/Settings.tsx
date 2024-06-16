import { useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";

export default function Settings() {
  const navigate = useNavigate();
  const { currentUser, userLoggedIn } = useAuth();
  return (
    <div>
      <span>Settings</span>
      <div>Name: {currentUser?.displayName}</div>
      <div>Email: {currentUser?.email}</div>
      <div>
        {userLoggedIn && (
          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/login");
              });
            }}
            className="w-full bg-primary"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
