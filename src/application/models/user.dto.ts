import type { Task } from "@/features/tasks/models/task"

export type UserDTO = {
	name: string | null;
	id: string;
	email: string;
	googleId: string | null;
	googleAccessToken: string | null;
	googleRefreshToken: string | null;
	isAuthorized: boolean;
	isAdmin: boolean;
	createdAt: Date;
	updatedAt: Date;
}
