import appConfig, { DEV_MODE } from "../appConfig";
import { auth } from "../firebase/firebase";
import { ModuleGroupType, ModuleType } from "../types";
import { delay } from "../utils/utils";
export const apiUrl = appConfig.SERVER_API;

export async function ping() {
  try {
    const token = await auth.currentUser?.getIdToken();
    const response = await fetch(`${apiUrl}/api/ping`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timestamp: Date.now() }),
    });
    return await response.json();
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
export async function getLatestCommit(user: string, repo: string) {
  try {
    const url = `https://api.github.com/users/${user}/events/public?timestamp=${new Date().getTime()}`;
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
      return latestCommit;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

// BUSINESS REQUESTS
export async function getUserId() {
  try {
    const token = await auth.currentUser?.getIdToken();
    const response = await fetch(`${apiUrl}/api/getUserId`, {
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
    const response = await fetch(`${apiUrl}/api/scanImage`, {
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

export async function userJoined() {
  try {
    if (!auth.currentUser) {
      throw new Error("No authenticated user found");
    }
    const token = await auth.currentUser.getIdToken();
    const { uid: firebaseId, email, displayName: name } = auth.currentUser;
    const response = await fetch(`${apiUrl}/api/userJoined`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firebaseId, email, name }),
    });

    if (!response.ok) {
      throw new Error(`Failed to join as user: ${response.statusText}`);
    }

    return await response.json();
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message || "An error occurred" };
  }
}

type UserModuleResultType =
  | { success: true; modules: ModuleType[] }
  | { success: false; error: any };
export async function getUserModules(): Promise<UserModuleResultType> {
  if (DEV_MODE.isActive) {
    await delay(500);
    return { success: true, modules: DEV_MODE.userModules };
  }

  try {
    if (!auth.currentUser) {
      throw new Error("No authenticated user found");
    }
    const token = await auth.currentUser.getIdToken();
    const response = await fetch(`${apiUrl}/api/userModules`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err: any) {
    return { success: false, error: err };
  }
}

export async function updateUserModules(moduleId: number) {
  try {
    if (!auth.currentUser) {
      throw new Error("No authenticated user found");
    }
    const token = await auth.currentUser.getIdToken();
    const response = await fetch(`${apiUrl}/api/userModule/${moduleId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}
type ModuleGroupResultType =
  | { success: true; groups: ModuleGroupType[] }
  | { success: false; error: any };
export async function getModuleGroups(): Promise<ModuleGroupResultType> {
  if (DEV_MODE.isActive) {
    await delay(500);
    return { success: true, groups: DEV_MODE.moduleGroups };
  }
  try {
    if (!auth.currentUser) {
      throw new Error("No authenticated user found");
    }
    const token = await auth.currentUser.getIdToken();
    const response = await fetch(`${apiUrl}/api/moduleGroups`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err: any) {
    return { success: false, error: err };
  }
}
