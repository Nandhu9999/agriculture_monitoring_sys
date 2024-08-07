import { ChangeEvent, FormEvent, useState } from "react";
import GoogleIcon from "../assets/google_icon.png";
import { useAuth } from "../contexts/authContext";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { Link, Navigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import InputTag from "../components/shared/InputTag";

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
    return (
      <Navigate
        to={"/app/dashboard"}
        state={{ fromHome: true }}
        replace={true}
      />
    );
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {/* FIXED HEADER NAV */}
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

        {/* TITLE */}
        <div className="md:w-96 sm:mx-auto sm:w-full">
          <img className="mx-auto h-20 w-auto" src="/icon.png" alt="AMS" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onSubmit} className="space-y-2">
            {/* EMAIL INPUT TAG */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <InputTag
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
              </div>
            </div>

            {/* PASSWORD INPUT TAG */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <Link
                  to="/forgot"
                  className="text-sm text-primary hover:text-secondary"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="mt-2">
                <InputTag
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
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

          {/* GOOGLE AUTH SERVICE */}
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
                <img className="h-6 w-6 mr-2" src={GoogleIcon} alt="Google" />
                <span>{isSigningIn ? "Signing in..." : "Google"}</span>
              </button>
            </div>
          </div>

          {/* LINKS */}
          <div className="mt-6 flex justify-center text-sm">
            <span className="text-gray-500">Don't have an account?</span>
            <Link
              to="/register"
              className="ml-1 font-medium text-primary hover:underline"
            >
              Register
            </Link>
          </div>

          {/* ERROR INDICATION */}
          {errorMessage && (
            <div className="mt-4 text-sm text-red-600">{errorMessage}</div>
          )}
        </div>
      </div>
    </>
  );
}
