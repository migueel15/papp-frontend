import { fetchAuthorized } from "@/application/utils";
const BACKEND_BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";

export const getAllTasks = async () => {
  const res = await fetchAuthorized(`${BACKEND_BASE_URL}/tasks`);
  const data = await res.json();
  return data;
};
