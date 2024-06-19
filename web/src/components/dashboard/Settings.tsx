import { useAuth } from "../../contexts/authContext";

export default function Settings() {
  const { currentUser } = useAuth();
  return (
    <div>
      <div>
        <span className="font-bold">Name:</span> {currentUser?.displayName}
      </div>
      <div>
        <span className="font-bold">Email:</span> {currentUser?.email}
      </div>
    </div>
  );
}
