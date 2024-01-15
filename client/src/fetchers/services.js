import axios from "axios";

const SERVER_URL = "http://127.0.0.1:9980/api";

export const fetchServicesList = async () => {
  const userId = "";
  const response = await axios.get(`${SERVER_URL}/users/${userId}/services`);
  return response.data;
};

export const fetchService = async () => {
  const serviceId = "";
  const response = await axios.get(`${SERVER_URL}/services/${serviceId}`, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
  return response.data;
};
