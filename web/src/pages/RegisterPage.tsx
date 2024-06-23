import { ChangeEvent, FormEvent, useState } from "react";
import GoogleIcon from "../assets/google_icon.png";
import { useAuth } from "../contexts/authContext";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { FirebaseError } from "firebase/app";
import { Link, Navigate } from "react-router-dom";
import InputTag from "../components/shared/InputTag";

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
          if (error.message == "Firebase: Error (auth/internal-error).") {
            console.log("No Internet Connection");
          }
          setErrorMessage(error.message);
        }
      );
      setIsRegistering(false); // Reset isRegistering after completion
    }
  };

  const onGoogleSignIn = (e: FormEvent) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      doSignInWithGoogle().catch((error: FirebaseError) => {
        console.log(error);
        if (error.message == "Firebase: Error (auth/internal-error).") {
          console.log("No Internet Connection");
        }
        setIsRegistering(false);
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
            Create your new account
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

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <InputTag
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="confirm-password"
                  required
                  value={confirmPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isRegistering}
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {isRegistering ? "Registering..." : "Sign up"}
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
                disabled={isRegistering}
                className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <img className="h-6 w-6 mr-2" src={GoogleIcon} alt="Google" />
                <span>{isRegistering ? "Signing in..." : "Google"}</span>
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-center text-sm">
            <span className="text-gray-500">Already have an account?</span>
            <Link
              to="/login"
              className="ml-1 font-medium text-primary hover:underline"
            >
              Log in
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
