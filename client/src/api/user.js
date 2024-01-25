import axios from "axios";
import BACKEND from "./config";

export const createUser = async (uid, email) => {
  const response = await axios.post(`${BACKEND.url}/users`, {
    uid,
    email,
    profileName: email.split("@")[0],
  });
  return response.data || undefined;
};

export const fetechUser = async () => {
  const userId = "";
  const response = await axios.get(`${BACKEND.url}/users/${userId}`);
  return response.data || undefined;
};
