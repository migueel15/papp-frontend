import { fetchAuthorized } from "@/application/utils";
import type { Task } from "@/features/tasks/models/task";
import { parseTaskFromApi } from "@/features/tasks/task.adapter";
const BACKEND_BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";

export const getAllTasks = async (): Promise<Task[]> => {
  const res = await fetchAuthorized(`${BACKEND_BASE_URL}/tasks`);
  const data = await res.json();
  return data.map(parseTaskFromApi);
};

export const deleteTask = async (taskId: Task["id"]): Promise<void> => {
  const res = await fetchAuthorized(`${BACKEND_BASE_URL}/tasks/${taskId}`, {
    method: "delete",
  });
  if (!res.ok) {
    throw Error("Failed to delete");
  }
};
