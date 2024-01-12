import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkZvPPOTaVcQC7xigq4AmlTY9ZI_tush4",
  authDomain: "fir-ams-dc65f.firebaseapp.com",
  projectId: "fir-ams-dc65f",
  storageBucket: "fir-ams-dc65f.appspot.com",
  messagingSenderId: "53513861637",
  appId: "1:53513861637:web:da6f0bae97b94ff3803a6c",
  measurementId: "G-W2RMTM8VBH",
};

let persistence;
if (Platform.OS === "web") {
  persistence = browserLocalPersistence;
} else {
  persistence = getReactNativePersistence(AsyncStorage);
}
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: persistence,
});
