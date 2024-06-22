import { FormEvent, useState } from "react";
import { useAuth } from "../contexts/authContext";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { Link, Navigate } from "react-router-dom";
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
          console.log(error);
          if (error.message == "Firebase: Error (auth/internal-error).") {
            console.log("No Internet Connection");
          }
          setErrorMessage(error.message);
          setIsSigningIn(false);
        }
      );
    }
  };

  const onGoogleSignIn = (e: FormEvent) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((error: FirebaseError) => {
        console.log(error);
        if (error.message == "Firebase: Error (auth/internal-error).") {
          console.log("No Internet Connection");
        }
        setIsSigningIn(false);
      });
    }
  };
  if (userLoggedIn) {
    return <Navigate to={"/app/dashboard"} replace={true} />;
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex flex-1 justify-start">
              <Link
                to={"/"}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                <span aria-hidden="true">&larr;</span> {" Home"}
              </Link>
            </div>
          </nav>
        </header>
        <div className="md:w-96 sm:mx-auto sm:w-full">
          <img className="mx-auto h-20 w-auto" src="/icon.png" alt="AMS" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onSubmit} className="space-y-2">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isSigningIn}
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {isSigningIn ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={onGoogleSignIn}
                disabled={isSigningIn}
                className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <img
                  className="h-6 w-6 mr-2"
                  src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-pks9lbdv.png"
                  alt="Google"
                />
                <span>{isSigningIn ? "Signing in..." : "Google"}</span>
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-center text-sm">
            <span className="text-gray-500">Don't have an account?</span>
            <Link
              to="/register"
              className="ml-1 font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>

          {errorMessage && (
            <div className="mt-4 text-sm text-red-600">{errorMessage}</div>
          )}
        </div>
      </div>
    </>
  );
}
