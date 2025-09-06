export type Label = {
	name: string
	id: string
	color: string
}

export type Task = {
	id: string;
	title: string;
	description?: string;
	status: "todo" | "in_progress" | "done";
	priority: "high" | "medium" | "low";
	labels?: Label[]
	dueDate?: Date;
	createdAt: Date;
	updatedAt: Date;
	campusId?: string;
	subject?: string;
	userId: string;
};

export type TaskSectionType = "overview" | "upcoming" | "today" | "campus"
export type TaskViewType = "table" | "kanban" | "calendar"

export type TaskFilter = {
	title?: string
	description?: string
	status?: Task["status"][]
	priority?: Task["priority"][]
	labels?: Label["name"][]
	dueDate?: Date
	subject?: Task["subject"][]
}
