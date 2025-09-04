import { fetchAuthorized } from "@/application/utils";
import type { User } from "../auth/auth.context";
import { parseUserFromApi } from "@/application/adapters/user.adapter";

const BACKEND_BASE_URL =
	import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";

export const getAllUsers = async (): Promise<User[]> => {
	const res = await fetchAuthorized(`${BACKEND_BASE_URL}/users`);
	const data = await res.json();
	return data.map(parseUserFromApi);
};

export const updateUser = async (
	userId: string,
	updates: Partial<User>,
): Promise<User> => {
	const res = await fetchAuthorized(`${BACKEND_BASE_URL}/users/${userId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(updates),
	});
	const data = await res.json();
	return parseUserFromApi(data);
};

export const deleteUser = async (userId: string): Promise<void> => {
	await fetchAuthorized(`${BACKEND_BASE_URL}/users/${userId}`, {
		method: "DELETE",
	});
};
