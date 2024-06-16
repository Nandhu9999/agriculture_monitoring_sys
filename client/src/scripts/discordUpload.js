import axios from "axios";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const sendWebhookMessage = async ({ message }) => {
  const payload = new FormData();
  payload.append("content", message);

  const uploadURL =
    "https://discord.com/api/webhooks/1193940594255470692/s8wjAtGkJEqoWB6BukbpJ9vSnctatWqDPo5pktP_dcPhjFqu_f9QJ1uF0Lwmlrb_AGyW";
  try {
    const response = await axios.post(uploadURL, payload, {
      params: { wait: true },
    });
    console.log(response.status, response.data);
  } catch (err) {
    console.error(err);
  }
};

export const sendWebhookFile = async () => {
  async function onImageReceive({ file }) {
    if (!file) {
      alert("Please select a file.");
      return;
    }
    console.log(">>", file);
    const payload = new FormData();
    if (file?.uri) {
      payload.append("file", {
        uri: file.uri,
        type: "image/jpeg",
        name: "image.jpg",
      });
    } else {
      payload.append("file", file);
    }

    const uploadURL =
      "https://discord.com/api/webhooks/1193940594255470692/s8wjAtGkJEqoWB6BukbpJ9vSnctatWqDPo5pktP_dcPhjFqu_f9QJ1uF0Lwmlrb_AGyW";
    try {
      const response = await axios.post(uploadURL, payload, {
        params: { wait: true },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.status, response.data);
    } catch (err) {
      console.error(err);
    }
  }
  if (Platform.OS == "web") {
    await triggerWebFileSelect(onImageReceive);
  } else {
    await triggerNativeFileSelect(onImageReceive);
  }
};

async function triggerWebFileSelect(callback) {
  let input = document.createElement("input");
  input.type = "file";
  input.multiple = false;
  input.accept = ".png,.jpeg,.jpg";
  input.onchange = async (_) => {
    let file = await Array.from(input.files)[0];
    return callback(file);
    // const image = document.createElement('img');
    // image.src = URL.createObjectURL(file);
    // imagePrompt(image, file.name, file.lastModifiedDate, file.size )
  };
  await input.click();
}

async function triggerNativeFileSelect(callback) {
  await ImagePicker.requestMediaLibraryPermissionsAsync();
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [1, 1],
    quality: 1,
  });
  callback(result.assets[0]);
}

export const triggerFileSelect = async () => {
  function returnImageFile(file) {
    return file;
  }
  if (Platform.OS == "web") {
    return await triggerWebFileSelect(returnImageFile);
  } else {
    return await triggerNativeFileSelect(returnImageFile);
  }
};

export const sendWebhookFileRaw = async ({ file, message, uploadURL }) => {
  if (!file) {
    alert("Please select a file.");
    return;
  }
  console.log(">>", file);
  const payload = new FormData();
  payload.append("content", message);
  if (file?.uri) {
    payload.append("file", {
      uri: file.uri,
      type: "image/jpeg",
      name: "image.jpg",
    });
  } else {
    payload.append("file", file);
  }

  try {
    const response = await axios.post(uploadURL, payload, {
      params: { wait: true },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.status, response.data);
    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
};
