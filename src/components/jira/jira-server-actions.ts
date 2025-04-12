"use server";

import { myServerProvider } from "@/src/services/my-server/my-server-provider";
import { Task } from "./models/jira-task";
import scrumBackendService from "@/src/services/scrum-backend/scrum-backend.provider";

export async function updateTaskKey(
  formData: FormData
): Promise<Task | { error: string }> {
  try {
    const newKey = formData.get("key") as string;
    const roomId = formData.get("roomId") as string;
    if (!roomId) {
      throw new Error("No roomId provided");
    }
    if (!newKey) {
      throw new Error("No key provided");
    }
    const updatedTask = await myServerProvider.getTaskById(newKey);
    await scrumBackendService.editRoom(roomId, { lastSubject: newKey });
    await scrumBackendService.addSubject(newKey, { jiraId: newKey });
    return updatedTask;
  } catch (error: unknown) {
    console.error("Error in updateTaskKey:", error);
    // Return an error object instead of throwing
    return { error: "Failed to update task" };
  }
}
