import { useEffect, useState } from "react";
import { getAllUsers } from "../user.service";
import type { User } from "@/features/auth/auth.context";
import UserCard from "./UserCard";

const UserManagementPanel = () => {
	const [users, setUsers] = useState<User[]>();

	useEffect(() => {
		const getUsers = async () => {
			const users = await getAllUsers();
			setUsers(users);
		};
		getUsers();
	}, []);

	const handleUserUpdate = (updatedUser: User) => {
		setUsers((prev) =>
			prev?.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
		);
	};

	const handleUserDelete = (userId: string) => {
		setUsers((prev) => prev?.filter((user) => user.id !== userId));
	};

	return (
		<div className="flex flex-col">
			<h3 className="my-4">Admin Panel</h3>
			{users &&
				users.map((user) => (
					<UserCard
						key={user.id}
						user={user}
						onUserUpdate={handleUserUpdate}
						onUserDelete={handleUserDelete}
					/>
				))}
		</div>
	);
};

export default UserManagementPanel;
