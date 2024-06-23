import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useEffect, useState } from "react";
import { apiUrl, getUserId, getUserModules, ping } from "../../services/api";
import Snackbar from "../common/Snackbar";
import GitCommit from "../shared/GitCommit";

export default function Settings() {
  const { currentUser } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const showSnackbar = (msg: string) => {
    setSnackbarMessage(msg);
    setTimeout(() => {
      setSnackbarMessage(null);
    }, 3000);
  };

  if (currentUser == null) {
    return <Navigate to={"/login"} replace={true} />;
  }

  useEffect(() => {
    currentUser?.getIdToken().then((t: any) => {
      setToken(t);
    });
  }, []);

  async function pingServer() {
    const response = await ping();
    showSnackbar("PING RESPONSE: " + JSON.stringify(response));
  }
  async function callGetUser() {
    const response = await getUserId();
    showSnackbar("USER: " + JSON.stringify(response));
  }

  async function callGetUserModules() {
    const response = await getUserModules();
    showSnackbar("MODULES: " + JSON.stringify(response));
  }

  return (
    <div className="break-all w-full flex flex-col gap-1">
      <div>
        <span className="font-bold">Name:</span> {currentUser?.displayName}
      </div>
      <div>
        <span className="font-bold">Email:</span> {currentUser?.email}
      </div>
      <div>
        <span className="font-bold">Firebase ID:</span> {currentUser?.uid}
      </div>
      <div>
        <span className="font-bold">API URL:</span> {apiUrl}
      </div>
      <div>
        <span className="font-bold">Ping:</span>{" "}
        <button
          onClick={pingServer}
          className="border-2 px-1 rounded-lg active:scale-95"
        >
          Ping Server
        </button>
      </div>
      <div>
        <span className="font-bold">User:</span>{" "}
        <button
          onClick={callGetUser}
          className="border-2 px-1 rounded-lg active:scale-95"
        >
          Get User
        </button>
      </div>
      <div>
        <span className="font-bold">Modules:</span>{" "}
        <button
          onClick={callGetUserModules}
          className="border-2 px-1 rounded-lg active:scale-95"
        >
          Get Modules
        </button>
      </div>
      <div>
        <span className="font-bold">Token:</span> {token}
      </div>
      <div className="flex justify-center">
        <GitCommit />
      </div>
      {snackbarMessage && <Snackbar message={snackbarMessage} />}
    </div>
  );
}
