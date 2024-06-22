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

export async function getLatestCommit(user: string, repo: string) {
  try {
    const url = `https://api.github.com/users/${user}/events/public`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const events = await response.json();

    // Find the latest push event for the specified repository
    const pushEvent = events.find(
      (event: any) => event.type === "PushEvent" && event.repo.name === repo
    );

    if (pushEvent) {
      // Get the latest commit from the push event
      const latestCommit = pushEvent.payload.commits[0];
      console.log("Latest Commit: ", latestCommit);
      return latestCommit;
    } else {
      console.log("No push events found for the specified repository.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}
