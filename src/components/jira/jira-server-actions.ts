"use server";

import { myServerProvider } from "@/services/my-server/my-server-provider";

// Server Action: updateTaskKey
export async function updateTaskKey(formData: FormData) {
  const newKey = formData.get("key") as string;

  // Implement your update logic here.
  // For example, make a fetch request to update the key value on your server.
  const task = await myServerProvider.getTaskById(newKey);
  console.log("Task key updated to:", newKey);
  return task;
}
