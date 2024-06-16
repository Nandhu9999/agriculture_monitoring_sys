import { useAuth } from "../../contexts/authContext";

export default function Settings() {
  const { currentUser } = useAuth();
  return (
    <div>
      <span>Settings</span>
      <div>Name: {currentUser?.displayName}</div>
      <div>Email: {currentUser?.email}</div>
    </div>
  );
}
