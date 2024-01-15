import axios from "axios";

const SERVER_URL = "http://127.0.0.1:9980/api";

export const createUser = async (email, profileName) => {
  const response = await axios.post(`${SERVER_URL}/users`, {
    email: email,
    profileName: profileName
  });
  return response.data || undefined;
};

export const fetechUser = async () => {
  const userId = "";
  const response = await axios.get(`${SERVER_URL}/users/${userId}`);
  return response.data || undefined;
};
