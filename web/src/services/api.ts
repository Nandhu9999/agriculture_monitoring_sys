import { auth } from "../firebase/firebase";
export const apiUrl = "http://localhost:9980/api";

export async function ping() {
  try {
    const token = await auth.currentUser?.getIdToken();
    const response = await fetch(`${apiUrl}/ping`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timestamp: Date.now() }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

export async function getUserId() {
  try {
    const token = await auth.currentUser?.getIdToken();
    const response = await fetch(`${apiUrl}/getUserId`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

export async function scanUploadImage(file: File) {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("isSimulator", "true");
  formData.append("serviceId", "xxx");

  try {
    const response = await fetch(`${apiUrl}/scan-image`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Upload failed");
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  } finally {
    return { success: false };
  }
}
