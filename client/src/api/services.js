import axios from "axios";
import { useUserStore } from "../store";
import BACKEND from "./config";

export const fetchServicesList = async () => {
  const userId = useUserStore.getState().user?.uid;
  const response = await axios.get(`${BACKEND.url}/users/${userId}/services`);
  return response.data;
};

export const fetchService = async () => {
  const serviceId = "";
  const response = await axios.get(`${BACKEND.url}/services/${serviceId}`, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
  return response.data;
};
