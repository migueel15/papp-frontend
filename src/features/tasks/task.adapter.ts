import type { Task } from "./models/task";
import type { TaskDto, TaskPriority, TaskStatus } from "./models/task.dto";

function normalizeStatus(status: TaskDto["status"]): Task["status"] {
  if (status === "COMPLETED") return "done";
  return status.toLowerCase() as Task["status"];
}

function normalizePriority(priority: TaskDto["priority"]): Task["priority"] {
  return priority.toLowerCase() as Task["priority"];
}

export function parseTaskFromApi(dto: TaskDto): Task {
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
  };
}
