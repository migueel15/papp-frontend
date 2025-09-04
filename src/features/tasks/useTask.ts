import { useEffect, useMemo, useState } from "react";
import type { Task } from "./models/task";
import {
	createTask,
	deleteTask,
	getAllTasks,
	updateTask,
} from "./task.service";
import { useAuth } from "@/features/auth/auth.hook";

// Función para ordenar tareas por fecha y prioridad
const sortTasks = (tasks: Task[]): Task[] => {
	return [...tasks].sort((a, b) => {
		// 1. Tareas con fecha van primero
		const aHasDate = Boolean(a.dueDate);
		const bHasDate = Boolean(b.dueDate);

		if (aHasDate && !bHasDate) return -1;
		if (!aHasDate && bHasDate) return 1;

		// 2. Si ambas tienen fecha, ordenar por fecha (más cercana primero)
		if (aHasDate && bHasDate) {
			return new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime();
		}

		// 3. Si ninguna tiene fecha, ordenar por fecha de creación (más reciente primero)
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
	});
};

const useTask = () => {
	const [tasks, setTasks] = useState<Task[] | null>(null);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const { user } = useAuth();

	// Aplicar filtrado por usuario y ordenamiento automáticamente usando useMemo para performance
	const sortedTasks = useMemo(() => {
		if (!tasks || !user) return null;
		const userTasks = tasks.filter(task => task.userId === user.id);
		return sortTasks(userTasks);
	}, [tasks, user]);

	const loadTasks = async () => {
		try {
			setLoading(true);
			const result = await getAllTasks();
			setTasks(result);
			setError(null);
		} catch (err) {
			setError(err as Error);
		} finally {
			setLoading(false);
		}
	};

	const delTask = async (id: Task["id"]) => {
		try {
			await deleteTask(id);
			setTasks(
				(prevTasks) => prevTasks?.filter((task) => task.id !== id) ?? null,
			);
		} catch (error) {
			console.error("Failed to delete task:", error);
		}
	};

	const addTask = async (
		taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">,
		userId: string,
	) => {
		try {
			const newTask = await createTask(taskData, userId);
			setTasks((prevTasks) => [...(prevTasks ?? []), newTask]);
		} catch (error) {
			console.error("Failed to create task:", error);
			throw error;
		}
	};

	const editTask = async (
		taskId: Task["id"],
		taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">,
	) => {
		try {
			const updatedTask = await updateTask(taskId, taskData);
			setTasks(
				(prevTasks) =>
					prevTasks?.map((task) => (task.id === taskId ? updatedTask : task)) ??
					null,
			);
		} catch (error) {
			console.error("Failed to update task:", error);
			throw error;
		}
	};

	useEffect(() => {
		loadTasks();
	}, []);

	return { tasks: sortedTasks, isLoading, error, delTask, addTask, editTask };
};

export default useTask;
