import type { Label, Task } from "./models/task";
import type { TaskDto, TaskPriority, TaskStatus } from "./models/task.dto";

function normalizeStatus(status: TaskDto["status"]): Task["status"] {
	if (status === "COMPLETED") return "done";
	return status.toLowerCase() as Task["status"];
}

function normalizePriority(priority: TaskDto["priority"]): Task["priority"] {
	return priority.toLowerCase() as Task["priority"];
}

function denormalizeStatus(status: Task["status"]): TaskDto["status"] {
	if (status === "done") return "COMPLETED";
	if (status === "in_progress") return "IN_PROGRESS";
	return "TODO";
}

function denormalizePriority(priority: Task["priority"]): TaskDto["priority"] {
	return priority.toUpperCase() as TaskDto["priority"];
}

export function parseTaskFromApi(dto: TaskDto): Task {
	const mappedLabels: Label[] = dto.labels.map((l) => {
		return {
			id: l.id,
			name: l.name,
			color: l.color
		}
	})

	return {
		id: dto.id,
		title: dto.title,
		description: dto.description,
		status: normalizeStatus(dto.status),
		priority: normalizePriority(dto.priority),
		dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
		createdAt: new Date(dto.createdAt),
		updatedAt: new Date(dto.updatedAt),
		campusId: dto.campusId,
		subject: dto.subject,
		userId: dto.userId,
		labels: mappedLabels
	};
}

export function parseTaskToApi(
	task: Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">,
): Omit<TaskDto, "id" | "createdAt" | "updatedAt" | "userId"> {
	const labelNames = task.labels.map((l) => {
		return l.name
	})
	return {
		title: task.title,
		description: task.description,
		status: denormalizeStatus(task.status),
		priority: denormalizePriority(task.priority),
		dueDate: task.dueDate?.toISOString(),
		campusId: task.campusId,
		subject: task.subject,
		labelNames: labelNames
	};
}
