export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";
export type TaskPriority = "HIGH" | "MEDIUM" | "LOW";

export type Label = {
	name: string
	id: string
	color: string
	user: string
}

export type TaskDto = {
	id: string;
	title: string;
	description?: string;
	status: TaskStatus;
	priority: TaskPriority;
	labels?: Label[];
	labelNames?: string[];
	dueDate?: string;
	createdAt: string;
	updatedAt: string;
	campusId?: string;
	subject?: string;
	userId: string;
};
