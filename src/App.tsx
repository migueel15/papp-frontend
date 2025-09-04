import { useState } from "react";
import "./App.css";
import { fetchAuthorized } from "./application/utils";
import { useAuth } from "./features/auth/auth.hook";
import { getAllTasks } from "./features/tasks/task.service";

function App() {
	const auth = useAuth();

	return (
		<div>
			<div className="flex gap-3 items-center">
				<img
					src={auth.user.picture}
					alt="profile pic"
					className="rounded-full w-10"
				/>
				<h1 className="text-3xl font-bold underline">
					Hello, {auth.user?.name}
				</h1>
			</div>
			<p>UserId: {auth.user.id}</p>
			<p>Email: {auth.user.email}</p>
			<p>Is authorized: {auth.user.isAuthorized.toString()}</p>
			<p>Is admin: {auth.user.isAdmin.toString()}</p>
		</div>
	);
}

export default App;
