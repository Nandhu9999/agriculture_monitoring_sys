import axios from "axios";
import { Buffer } from "buffer";
import BACKEND from "./config";
import { sendWebhookFileRaw } from "../scripts/discordUpload";

export const uploadImageToServer = async (file) => {
  let uploadURL;
  try {
    const response1 = await axios.post(`${BACKEND.url}/image-upload`, {
      isSimulator: true,
    });
    uploadURL = response1.data.uploadURL;
    console.log(uploadURL);
  } catch (err) {
    console.log("Image upload access error");
    return;
  }
  console.log("...");
  const clientId = "SIMULATOR";
  const timestamp = Math.floor(Date.now() / 1000);
  const timeInText = formatTimestamp(timestamp);
  const data = `{'clientId': ${clientId}, timestamp: ${timestamp}, time_in_text: ${timeInText}}`;

  const response2 = await sendWebhookFileRaw({
    file: file,
    message: data,
    uploadURL: uploadURL,
  });
  console.log(">>", response2);

  if (response2.status != 200 || response2.status != 204) {
    console.log("Error occurred while uploading image");
    return;
  }

  console.log("Completed..");
};

function formatTimestamp(timestamp) {
  const timeObject = new Date(timestamp * 1000);
  const formattedString = timeObject.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  return formattedString;
}
