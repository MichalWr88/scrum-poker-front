"use server";

import { myServerProvider } from "@/src/services/my-server/my-server-provider";
import { Task } from "./models/jira-task";

export async function updateTaskKey(
  formData: FormData
): Promise<Task | { error: string }> {
  try {
    const newKey = formData.get("key") as string;
    if (!newKey) {
      throw new Error("No key provided");
    }
    const updatedTask = await myServerProvider.getTaskById(newKey);
    return updatedTask;
  } catch (error: unknown) {
    console.error("Error in updateTaskKey:", error);
    // Return an error object instead of throwing
    return { error: "Failed to update task" };
  }
}
