import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/auth.hook";
import CreateTaskBottomSheet from "./components/CreateTaskBottomSheet";
import TaskModal from "./components/CreateTaskModal";
import EditTaskModal from "./components/EditTaskModal";
import EditTaskBottomSheet from "./components/EditTaskBottomSheet";
import FloatingActionButton from "./components/FloatingActionButton";
import TasksTable from "./components/TaskTable.tsx";
import useKeyboardShortcut from "./hooks/useKeyboardShortcut";
import useTask from "./useTask";
import type { Task } from "./models/task";
import TaskSectionSelector from "./components/TaskSectionSelector.tsx";
import TaskHeader from "./components/TaskHeader.tsx";

const TaskPage = () => {
	const tasks = useTask();
	const isMobile = window.innerWidth <= 768


	const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
	const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
	const { user } = useAuth();

	// Keyboard shortcut: "Q" para abrir modal de crear tarea
	useKeyboardShortcut({
		key: "q",
		callback: () => setIsTaskModalOpen(true),
	});

	if (tasks.isLoading) return <h1>Loading...</h1>;
	if (tasks.error) return <h1>Error</h1>;


	return (
		<div className="w-full">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Tasks</h1>
			</div>

			<TaskSectionSelector
				currentSection={tasks.currentTaskSection}
				updateSection={tasks.updateTaskSection}
			/>


			<div className="bg-bg-light rounded-lg drop-shadow-md overflow-hidden">
				<TaskHeader
					title={tasks.currentTaskSection}
					onCreateTask={() => setIsTaskModalOpen(true)}
					onFilterTask={tasks.updateTaskFilter}
					labels={tasks.labels}
				/>

				<TasksTable
					tasks={tasks.tasks}
					onDelete={tasks.delTask}
					onEdit={(task) => {
						setTaskToEdit(task);
						setIsTaskModalOpen(true)
					}}
				/>
			</div>


			<TaskModal
				isOpen={isTaskModalOpen}
				isMobile={window.innerWidth <= 768}
				task={taskToEdit}
				onClose={() => {
					if (taskToEdit) {
						setTaskToEdit(undefined)
					}
					setIsTaskModalOpen(false)
				}}
				onSubmit={(taskData) => {
					if (taskToEdit) {
						tasks.editTask(taskToEdit.id, taskData);
					} else {
						tasks.addTask(taskData, user?.id || "")
					}

				}}
			/>

			<FloatingActionButton onClick={() => setIsTaskModalOpen(true)} />
		</div>
	);
};

export default TaskPage;
