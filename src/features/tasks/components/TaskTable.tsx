import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import EditIcon from "@/assets/icons/edit.svg?react";
import DeleteIcon from "@/assets/icons/trash.svg?react";
import type { Task } from "../models/task";
import ConfirmDeleteModal from "./ConfirmDeleteModal.tsx";
import Priority from "./Priority.tsx";
import Status from "./Status.tsx";
import TaskCard from "./TaskCard.tsx";

const TasksTable = ({
	tasks,
	onDelete,
	onEdit,
}: {
	tasks: Task[];
	onDelete: (id: Task["id"]) => void;
	onEdit: (task: Task) => void;
}) => {
	// Estado para el modal de confirmación de eliminación
	const [deleteModal, setDeleteModal] = useState<{
		isOpen: boolean;
		task: Task | null;
	}>({ isOpen: false, task: null });

	// Función para abrir modal de confirmación
	const handleDeleteClick = (task: Task) => {
		setDeleteModal({ isOpen: true, task });
	};

	// Función para confirmar eliminación
	const handleDeleteConfirm = () => {
		if (deleteModal.task) {
			onDelete(deleteModal.task.id);
			setDeleteModal({ isOpen: false, task: null });
		}
	};

	// Función para cerrar modal
	const handleDeleteCancel = () => {
		setDeleteModal({ isOpen: false, task: null });
	};
	return (
		<div className="bg-bg-light rounded-lg drop-shadow-md overflow-hidden">
			<h2 className="p-4">All Tasks</h2>

			{/* Vista de tabla - solo en desktop */}
			<div className="hidden md:block">
				<table className="w-full text-sm text-left table-auto">
					<thead className="bg-bg-dark text-muted-foreground border-b-2 border-text-muted">
						<tr className="">
							<th className="p-2 pl-4">
								<input type="checkbox" />
							</th>
							<th className="p-2 text-sm">Title</th>
							<th className="p-2 text-sm">Due date</th>
							<th className="p-2 text-sm">Status</th>
							<th className="p-2 text-sm">Priority</th>
							<th className="p-2 text-sm"> </th>
						</tr>
					</thead>
					<tbody>
						{tasks.map((task) => (
							<tr
								key={task.id}
								className="bg-bg-light odd:bg-bg even:bg-bg-light"
							>
								<td className="p-2 pl-4">
									<input type="checkbox" className="accent-primary" />
								</td>
								<td className="p-2">
									<input type="text" defaultValue={task.title} />
								</td>
								<td className="p-2">
									{task.dueDate
										? task.dueDate.toLocaleString("es-ES", {
											dateStyle: "medium",
											timeStyle: "short",
										})
										: ""}
								</td>
								<td className="p-2">
									<Listbox
										value={task.status}
										defaultValue={task.status}
										onChange={(v) => {
											task.status = v;
										}}
									>
										<ListboxButton>
											<Status value={task.status} />
										</ListboxButton>
										<ListboxOptions anchor="bottom" className="bg-bg-dark">
											<ListboxOption key={"todo"} value={"todo"}>
												<Status value="todo" />
											</ListboxOption>

											<ListboxOption key={"done"} value={"done"}>
												<Status value="done" />
											</ListboxOption>

											<ListboxOption key={"inprogress"} value={"inprogress"}>
												<Status value="in_progress" />
											</ListboxOption>
										</ListboxOptions>
									</Listbox>
								</td>
								<td className="p-2">
									<Priority value={task.priority} />
								</td>
								<td className="p-2">
									<div className="flex gap-2">
										<EditIcon
											className="w-4 h-4 cursor-pointer hover:text-primary transition-colors"
											onClick={() => onEdit(task)}
										/>
										<DeleteIcon
											className="w-4 h-4 cursor-pointer hover:text-danger transition-colors"
											onClick={() => handleDeleteClick(task)}
										/>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Vista de tarjetas - solo en móvil */}
			<div className="md:hidden p-4">
				{tasks.map((task) => (
					<TaskCard
						key={task.id}
						task={task}
						onDelete={(taskId) => {
							const taskToDelete = tasks.find((t) => t.id === taskId);
							if (taskToDelete) {
								handleDeleteClick(taskToDelete);
							}
						}}
						onEdit={() => onEdit(task)}
					/>
				))}
			</div>

			{/* Modal de confirmación para eliminar tareas */}
			<ConfirmDeleteModal
				isOpen={deleteModal.isOpen}
				onClose={handleDeleteCancel}
				onConfirm={handleDeleteConfirm}
				taskTitle={deleteModal.task?.title || ""}
			/>
		</div>
	);
};

export default TasksTable;
