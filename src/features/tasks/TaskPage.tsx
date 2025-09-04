import { useState } from "react";
import { useAuth } from "@/features/auth/auth.hook";
import CreateTaskBottomSheet from "./components/CreateTaskBottomSheet";
import CreateTaskModal from "./components/CreateTaskModal";
import EditTaskModal from "./components/EditTaskModal";
import EditTaskBottomSheet from "./components/EditTaskBottomSheet";
import FloatingActionButton from "./components/FloatingActionButton";
import TasksTable from "./components/TaskTable.tsx";
import useKeyboardShortcut from "./hooks/useKeyboardShortcut";
import useTask from "./useTask";
import type { Task } from "./models/task";

const TaskPage = () => {
	const tasks = useTask();
	const [isDesktopModalOpen, setIsDesktopModalOpen] = useState(false);
	const [isMobileBottomSheetOpen, setIsMobileBottomSheetOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isEditBottomSheetOpen, setIsEditBottomSheetOpen] = useState(false);
	const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
	const { user } = useAuth();

	// Keyboard shortcut: "Q" para abrir modal de crear tarea
	useKeyboardShortcut({
		key: "q",
		callback: () => setIsDesktopModalOpen(true),
	});

	if (tasks.isLoading) return <h1>Loading...</h1>;
	if (tasks.error) return <h1>Error</h1>;

	return (
		<div className="w-full">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Tareas</h1>
				<button
					onClick={() => setIsDesktopModalOpen(true)}
					className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors hidden md:block"
				>
					Nueva Tarea
				</button>
			</div>

			<TasksTable
				tasks={tasks.tasks}
				onDelete={tasks.delTask}
				onEdit={(task) => {
					setTaskToEdit(task);
					// Desktop: usar modal, Mobile: usar bottom sheet
					if (window.innerWidth >= 768) {
						setIsEditModalOpen(true);
					} else {
						setIsEditBottomSheetOpen(true);
					}
				}}
			/>

			{/* Modal para desktop */}
			<CreateTaskModal
				isOpen={isDesktopModalOpen}
				onClose={() => setIsDesktopModalOpen(false)}
				onSubmit={(taskData) => tasks.addTask(taskData, user?.id || "")}
			/>

			{/* Modal de edición para desktop */}
			<EditTaskModal
				isOpen={isEditModalOpen}
				onClose={() => {
					setIsEditModalOpen(false);
					setTaskToEdit(undefined);
				}}
				onSubmit={(taskData) => {
					if (taskToEdit) {
						tasks.editTask(taskToEdit.id, taskData);
					}
				}}
				task={taskToEdit}
			/>

			{/* Bottom Sheet de edición para móvil */}
			<EditTaskBottomSheet
				isOpen={isEditBottomSheetOpen}
				onClose={() => {
					setIsEditBottomSheetOpen(false);
					setTaskToEdit(undefined);
				}}
				onSubmit={(taskData) => {
					if (taskToEdit) {
						tasks.editTask(taskToEdit.id, taskData);
					}
				}}
				task={taskToEdit}
			/>

			{/* Bottom Sheet para móvil */}
			<CreateTaskBottomSheet
				isOpen={isMobileBottomSheetOpen}
				onClose={() => setIsMobileBottomSheetOpen(false)}
				onSubmit={(taskData) => tasks.addTask(taskData, user?.id || "")}
			/>

			{/* Floating Action Button para móvil */}
			<FloatingActionButton onClick={() => setIsMobileBottomSheetOpen(true)} />
		</div>
	);
};

export default TaskPage;
