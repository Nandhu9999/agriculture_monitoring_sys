// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import appConfig from "../appConfig";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: appConfig.FB_APIKEY,
  authDomain: appConfig.FB_AUTHDOMAIN,
  projectId: appConfig.FB_PROJECTID,
  storageBucket: appConfig.FB_STORAGEBUCKET,
  messagingSenderId: appConfig.FB_MSGSENDERID,
  appId: appConfig.FB_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
