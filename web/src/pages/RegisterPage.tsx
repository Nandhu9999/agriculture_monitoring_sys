import { FormEvent, useState } from "react";
import { useAuth } from "../contexts/authContext";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { FirebaseError } from "firebase/app";
import { Navigate } from "react-router-dom";

export default function RegisterPage() {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(email, password).catch(
        (error: FirebaseError) => {
          console.log(error);
          setErrorMessage(error.message);
        }
      );
    }
  };
  const onGoogleSignIn = (e: FormEvent) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      doSignInWithGoogle().catch((error: FirebaseError) => {
        console.log(error);
        setIsRegistering(false);
      });
    }
  };
  return (
    <div>
      {userLoggedIn && <Navigate to={"/dashboard"} replace={true} />}
      <h1>Register</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-full"
        />
        <input
          type="password"
          autoComplete="current-password"
          placeholder="password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-full"
        />
        <input
          type="password"
          autoComplete="confirm-password"
          placeholder="confirm password"
          required
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          className="w-full"
        />
        <button
          type="submit"
          disabled={isRegistering}
          className={`w-full bg-secondary`}
        >
          {isRegistering ? "Registering..." : "Sign up"}
        </button>
      </form>
      <div>{errorMessage}</div>
      <div className="w-full flex justify-center">
        <button
          disabled={isRegistering}
          onClick={(e: FormEvent) => {
            onGoogleSignIn(e);
          }}
          className={`w-16 h-16 rounded-2xl shadow-lg`}
        >
          <img
            src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-pks9lbdv.png"
            className={`w-full h-full rounded-full ${isRegistering ? "" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}
