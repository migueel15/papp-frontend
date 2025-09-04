export type Task = {
	id: string;
	title: string;
	description?: string;
	status: "todo" | "in_progress" | "done";
	priority: "high" | "medium" | "low";
	dueDate?: Date;
	createdAt: Date;
	updatedAt: Date;
	campusId?: string;
	subject?: string;
	userId: string;
};
