import { useEffect, useMemo, useState } from "react";
import type { Label, Task, TaskFilter, TaskSectionType } from "./models/task";
import {
	createTask,
	deleteTask,
	getAllTasks,
	getLabels,
	updateTask,
} from "./task.service";
import { useAuth } from "@/features/auth/auth.hook";

const sortTasks = (tasks: Task[]): Task[] => {
	return [...tasks].sort((a, b) => {
		const aHasDate = Boolean(a.dueDate);
		const bHasDate = Boolean(b.dueDate);

		if (aHasDate && !bHasDate) return -1;
		if (!aHasDate && bHasDate) return 1;

		if (aHasDate && bHasDate) {
			return new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime();
		}

		// 3. Si ninguna tiene fecha, ordenar por fecha de creación (más reciente primero)
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
	});
};

const useTask = () => {
	const [tasks, setTasks] = useState<Task[] | null>(null);
	const [labels, setLabels] = useState<Label[] | null>(null);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [taskSection, setTaskSection] = useState<TaskSectionType>("overview");
	const [taskFilter, setTaskFilter] = useState<TaskFilter | null>(null);
	const { user } = useAuth();

	// Aplicar filtrado por usuario y ordenamiento automáticamente usando useMemo para performance
	const sortedTasks = useMemo(() => {
		if (!tasks || !user) return null;
		const userTasks = tasks.filter((task) => task.userId === user.id);
		return sortTasks(userTasks);
	}, [tasks, user]);

	// Aplicar filtros adicionales a las tareas ordenadas
	const filteredTasks = useMemo(() => {
		if (!sortedTasks || !taskFilter) return sortedTasks;

		return sortedTasks.filter((task) => {
			// Filtrar por título (búsqueda insensible a mayúsculas)
			if (
				taskFilter.title &&
				!task.title.toLowerCase().includes(taskFilter.title.toLowerCase())
			) {
				return false;
			}

			// Filtrar por descripción (búsqueda insensible a mayúsculas)
			if (
				taskFilter.description &&
				task.description &&
				!task.description
					.toLowerCase()
					.includes(taskFilter.description.toLowerCase())
			) {
				return false;
			}

			// Filtrar por estado (array de estados permitidos)
			if (
				taskFilter.status &&
				taskFilter.status.length > 0 &&
				!taskFilter.status.includes(task.status)
			) {
				return false;
			}

			// Filtrar por prioridad (array de prioridades permitidas)
			if (
				taskFilter.priority &&
				taskFilter.priority.length > 0 &&
				!taskFilter.priority.includes(task.priority)
			) {
				return false;
			}

			// Filtrar por etiquetas (la tarea debe tener al menos una de las etiquetas especificadas)
			if (taskFilter.labels && taskFilter.labels.length > 0) {
				const taskLabelNames = task.labels?.map((label) => label.name) || [];
				const hasMatchingLabel = taskFilter.labels.some((filterLabel) =>
					taskLabelNames.includes(filterLabel),
				);
				if (!hasMatchingLabel) return false;
			}

			// Filtrar por fecha de vencimiento (tareas que vencen en o antes de la fecha especificada)
			if (taskFilter.dueDate && task.dueDate) {
				const taskDueDate = new Date(task.dueDate);
				const filterDueDate = new Date(taskFilter.dueDate);
				if (taskDueDate > filterDueDate) return false;
			}

			// Filtrar por materia (array de materias permitidas)
			if (
				taskFilter.subject &&
				taskFilter.subject.length > 0 &&
				task.subject &&
				!taskFilter.subject.includes(task.subject)
			) {
				return false;
			}

			return true;
		});
	}, [sortedTasks, taskFilter]);

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

	const loadLabels = async () => {
		const result = await getLabels();
		setLabels(result);
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

	const updateTaskSection = (newSection: TaskSectionType) => {
		setTaskSection(newSection);
	};

	const updateTaskFilter = (newFilter: TaskFilter) => {
		setTaskFilter(newFilter);
	};

	const clearTaskFilter = () => {
		setTaskFilter(null);
	};

	useEffect(() => {
		loadTasks();
		loadLabels();
	}, []);

	return {
		tasks: filteredTasks,
		labels: labels,
		isLoading,
		error,
		addTask,
		delTask,
		editTask,
		currentTaskSection: taskSection,
		updateTaskSection: updateTaskSection,
		taskFilter,
		updateTaskFilter,
		clearTaskFilter,
	};
};

export default useTask;
