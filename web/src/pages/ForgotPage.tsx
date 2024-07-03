import { ChangeEvent, FormEvent, useState } from "react";
import InputTag from "../components/shared/InputTag";
import { Link } from "react-router-dom";
import { doPasswordReset } from "../firebase/auth";
import { FirebaseError } from "firebase/app";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isResetting) {
      setIsResetting(true);
      await doPasswordReset(email).catch((error: FirebaseError) => {
        console.log(error);
        if (error.message == "Firebase: Error (auth/internal-error).") {
          console.log("No Internet Connection");
        }
        setErrorMessage(error.message);
        // setIsResetting(false);
      });
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {/* TITLE */}
      <div className="md:w-96 sm:mx-auto sm:w-full">
        <img className="mx-auto h-20 w-auto" src="/icon.png" alt="AMS" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot your account password?
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
          {/* SUBMIT BUTTON */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isResetting}
              className={`${
                isResetting ? "pointer-events-none opacity-60" : ""
              } flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
            >
              {isResetting ? "Reset Password Submitted" : "Reset Password"}
            </button>
            <div className="w-full text-sm text-left">
              {isResetting ? " Check your email" : ""}
            </div>
          </div>
        </form>
        {/* HORIZONTAL LINE */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500"> </span>
            </div>
          </div>
        </div>

        {/* LINKS */}
        <div className="mt-6 flex justify-center text-sm">
          <span className="text-gray-500">Go back?</span>
          <Link
            to="/login"
            className="ml-1 font-medium text-primary hover:underline"
          >
            Log in
          </Link>
        </div>

        {/* ERROR INDICATION */}
        {errorMessage && (
          <div className="mt-4 text-sm text-red-600">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}
