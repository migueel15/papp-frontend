import { fetchAuthorized } from "@/application/utils";
import type { Label } from "./models/task.ts";
import type { Task } from "@/features/tasks/models/task";
import {
	parseTaskFromApi,
	parseTaskToApi,
} from "@/features/tasks/task.adapter";

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

export const createTask = async (
	taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">,
	userId: string,
): Promise<Task> => {
	const apiData = parseTaskToApi(taskData);
	const res = await fetchAuthorized(`${BACKEND_BASE_URL}/tasks`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ ...apiData, userId: userId }),
	});
	if (!res.ok) {
		throw Error("Failed to create task");
	}
	const data = await res.json();
	return parseTaskFromApi(data);
};

export const updateTask = async (
	taskId: Task["id"],
	taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">,
): Promise<Task> => {
	const apiData = parseTaskToApi(taskData);
	const res = await fetchAuthorized(`${BACKEND_BASE_URL}/tasks/${taskId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(apiData),
	});
	if (!res.ok) {
		throw Error("Failed to update task");
	}
	const data = await res.json();
	return parseTaskFromApi(data);
};

export const getLabels = async (): Promise<Label[]> => {
	const res = await fetchAuthorized(`${BACKEND_BASE_URL}/labels`)
	const data: Label[] = await res.json()

	const formatedData: Label[] = data.map((l) => {
		return {
			id: l.id,
			name: l.name,
			color: l.color
		}
	})
	return formatedData
}
