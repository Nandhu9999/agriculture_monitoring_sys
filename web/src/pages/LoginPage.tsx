import { FormEvent, useState } from "react";
import { useAuth } from "../contexts/authContext";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { Navigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

export default function LoginPage() {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password).catch(
        (error: FirebaseError) => {
          setErrorMessage(error.message);
        }
      );
    }
  };

  const onGoogleSignIn = (e: FormEvent) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch(() => {
        setIsSigningIn(false);
      });
    }
  };
  return (
    <div>
      {userLoggedIn && <Navigate to={"/dashboard"} replace={true} />}
      <h1>Login</h1>
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
        <button
          type="submit"
          disabled={isSigningIn}
          className={`w-full bg-secondary`}
        >
          {isSigningIn ? "Signing In..." : "Sign In"}
        </button>
      </form>
      <div>{errorMessage}</div>
      <button
        disabled={isSigningIn}
        onClick={(e: FormEvent) => {
          onGoogleSignIn(e);
        }}
        className={`w-full bg-primary`}
      >
        {isSigningIn ? "Signing In..." : "Continue with Google"}
      </button>
    </div>
  );
}
