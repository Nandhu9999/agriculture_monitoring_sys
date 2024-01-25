import axios from "axios";
import { Buffer } from "buffer";
import BACKEND from "./config";

export const uploadImageToServer = async (imageUri) => {
  let uploadURL;
  try {
    const response1 = await axios.post(`${BACKEND.url}/image-upload`, {
      isSimulator: true,
    });
    uploadURL = response1.data.uploadURL;
  } catch (err) {
    console.log("Image upload access error");
    return;
  }
  const clientId = "SIMULATOR";
  const timestamp = Math.floor(Date.now() / 1000);
  const timeInText = formatTimestamp(timestamp);
  const data = `{'clientId': ${clientId}, timestamp: ${timestamp}, time_in_text: ${timeInText}}`;

  // const base64ImageBlob = Platform.select({
  //   web: await convertImageToBlob2(imageUri),
  //   default: await convertImageToBlob3(imageUri),
  // });

  const base64ImageBlob = await convertImageToBlob3(imageUri);

  console.log("...");
  const payload = new FormData();
  payload.append("content", data);
  payload.append("file", base64ImageBlob, "simulatorImage.png");
  // console.log(payload);
  try {
    const response2 = await axios.post(uploadURL, payload, {
      params: { wait: true },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response2);

    if (response2.status === 200 || response2.status === 204) {
      console.log("Files sent");
      console.log(response2.data);
    } else {
      console.error(`Failed to send files, ${response2.status}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }

  console.log("Completed..");
};

async function convertImageToBlob(imageUri) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(new Blob([xhr.response], { type: "image/png" }));
    };
    xhr.onerror = function () {
      reject(new Error("Failed to convert image to Blob"));
    };
    xhr.responseType = "arraybuffer";
    xhr.open("GET", imageUri, true);
    xhr.send();
  });
}

async function convertImageToBlob2(base64String) {
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: "image/png" }); // Adjust the type based on your image format
}

async function convertImageToBlob3(base64) {
  const buffer = Buffer.from(base64, "base64");
  return new Blob([buffer], { type: "image/png" });
}

function formatTimestamp(timestamp) {
  const timeObject = new Date(timestamp * 1000);
  const formattedString = timeObject.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  return formattedString;
}
