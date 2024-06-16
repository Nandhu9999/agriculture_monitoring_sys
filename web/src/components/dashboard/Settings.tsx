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
          <>
            <button
              onClick={() => {
                doSignOut().then(() => {
                  navigate("/login");
                });
              }}
              className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {"Logout"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
