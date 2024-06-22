import { useAuth } from "../../contexts/authContext";

export default function Dashboard() {
  const { currentUser, loggedInTime } = useAuth();
  const timeInText = new Date(loggedInTime).toString().split("GMT")[0];
  return (
    <div>
      <div>
        Hello{" "}
        <span className="font-bold capitalize">{currentUser?.displayName}</span>
      </div>
      <div>
        Logged in at: <span className="font-bold">{timeInText}</span>
      </div>
    </div>
  );
}
