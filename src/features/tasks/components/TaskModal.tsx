import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import type { Task } from "../models/task";

const formatDateTimeForInput = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	return `${year}-${month}-${day}T${hours}:${minutes}`;
};

interface TaskModalProps {
	isOpen: boolean;
	isMobile: boolean;
	task?: Task;
	onClose: () => void;
	onSubmit: (
		taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">,
	) => void;
}

const TaskModal = ({
	isOpen,
	isMobile = false,
	task,
	onClose,
	onSubmit,
}: TaskModalProps) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		status: "todo" as Task["status"],
		priority: "medium" as Task["priority"],
		dueDate: "",
		campusId: "",
		subject: "",
	});

	useEffect(() => {
		if (task && isOpen) {
			setFormData({
				title: task.title,
				description: task.description || "",
				status: task.status,
				priority: task.priority,
				dueDate: task.dueDate ? formatDateTimeForInput(task.dueDate) : "",
				campusId: task.campusId || "",
				subject: task.subject || "",
			});
		}
	}, [task, isOpen]);

	const titleInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "userId"> = {
			title: formData.title,
			description: formData.description || undefined,
			status: formData.status,
			priority: formData.priority,
			dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
			campusId: formData.campusId || undefined,
			subject: formData.subject || undefined,
		};

		onSubmit(taskData);
		handleClose();
	};

	const handleClose = () => {
		setFormData({
			title: "",
			description: "",
			status: "todo",
			priority: "medium",
			dueDate: "",
			campusId: "",
			subject: "",
		});
		onClose();
	};

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			className="relative z-50"
			initialFocus={titleInputRef}
		>
			<DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-[2px]" />

			<div
				className={`fixed flex w-screen ${isMobile
					? "inset-x-0 bottom-0"
					: "inset-0 items-center justify-center p-4"
					}`}
			>
				<DialogPanel
					className={`w-full bg-bg-light shadow-2xl ${isMobile
						? "rounded-t-2xl max-h-[85vh] overflow-y-auto transform transition-transform duration-300 ease-out data-[closed]:translate-y-full"
						: "max-w-md rounded-xl p-6 border border-border-muted/30"
						}`}
				>
					<div
						className={`flex items-center justify-between ${isMobile
							? "sticky top-0 bg-bg-light border-b border-border-muted px-6 py-4 rounded-t-2xl"
							: "mb-6"
							}`}
					>
						<DialogTitle
							className={`text-lg text-text ${isMobile ? "font-bold" : "font-semibold"
								}`}
						>
							{task ? "Editar tarea" : "Nueva tarea"}
						</DialogTitle>
						<button
							onClick={handleClose}
							className={`rounded-md transition-colors text-text-muted hover:text-text ${isMobile
								? "p-2 -mr-2 rounded-full hover:bg-bg"
								: "p-1 hover:bg-bg"
								}`}
						>
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					<form
						onSubmit={handleSubmit}
						className={`space-y-4 ${isMobile ? "px-6 py-4 space-y-6" : ""}`}
					>
						<input
							ref={titleInputRef}
							type="text"
							value={formData.title}
							onChange={(e) =>
								setFormData({ ...formData, title: e.target.value })
							}
							placeholder="¿Qué necesitas hacer?"
							required
							className={`w-full bg-transparent border-0 border-b border-border-muted focus:outline-none focus:border-primary placeholder-text-muted ${isMobile ? "text-lg px-0 py-3" : "text-lg px-0 py-3 font-medium"
								}`}
							autoFocus={isMobile}
						/>

						<textarea
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
							placeholder="Agregar descripción..."
							rows={3}
							className={`w-full placeholder-text-muted resize-none focus:outline-none ${isMobile
								? "px-3 py-3 bg-bg border border-border-muted rounded-md focus:ring-2 focus:ring-primary"
								: "px-4 py-3 bg-bg rounded-lg border-0 focus:ring-2 focus:ring-primary/20"
								}`}
						/>

						<div
							className={`grid grid-cols-2 gap-3 ${isMobile ? "gap-4" : ""}`}
						>
							<select
								value={formData.status}
								onChange={(e) =>
									setFormData({
										...formData,
										status: e.target.value as Task["status"],
									})
								}
								className={`w-full focus:outline-none ${isMobile
									? "px-3 py-3 bg-bg border border-border-muted rounded-md focus:ring-2 focus:ring-primary"
									: "px-4 py-3 bg-bg rounded-lg border-0 focus:ring-2 focus:ring-primary/20"
									}`}
							>
								<option value="todo">📋 Por Hacer</option>
								<option value="in_progress">⚡ En Progreso</option>
								<option value="done">✅ Completada</option>
							</select>

							<select
								value={formData.priority}
								onChange={(e) =>
									setFormData({
										...formData,
										priority: e.target.value as Task["priority"],
									})
								}
								className={`w-full focus:outline-none ${isMobile
									? "px-3 py-3 bg-bg border border-border-muted rounded-md focus:ring-2 focus:ring-primary"
									: "px-4 py-3 bg-bg rounded-lg border-0 focus:ring-2 focus:ring-primary/20"
									}`}
							>
								<option value="low">🟢 Prioridad Baja</option>
								<option value="medium">🟡 Prioridad Media</option>
								<option value="high">🔴 Prioridad Alta</option>
							</select>
						</div>

						<input
							type="datetime-local"
							value={formData.dueDate}
							onChange={(e) =>
								setFormData({ ...formData, dueDate: e.target.value })
							}
							className={`w-full focus:outline-none ${isMobile
								? "px-3 py-3 bg-bg border border-border-muted rounded-md focus:ring-2 focus:ring-primary"
								: "px-4 py-3 bg-bg rounded-lg border-0 focus:ring-2 focus:ring-primary/20"
								}`}
						/>

						<details className="group">
							<summary
								className={`cursor-pointer text-primary hover:text-primary/80 transition-colors py-2 ${isMobile ? "text-sm font-medium" : "text-sm"
									}`}
							>
								{isMobile ? "📚 Más opciones" : "Más opciones"}
							</summary>
							<div
								className={`mt-3 space-y-3 group-open:animate-fade-in ${isMobile ? "mt-4 space-y-4" : ""
									}`}
							>
								<input
									type="text"
									value={formData.subject}
									onChange={(e) =>
										setFormData({ ...formData, subject: e.target.value })
									}
									placeholder="📚 Materia (ej. Matemáticas)"
									className={`w-full placeholder-text-muted focus:outline-none ${isMobile
										? "px-3 py-3 bg-bg border border-border-muted rounded-md focus:ring-2 focus:ring-primary"
										: "px-4 py-3 bg-bg rounded-lg border-0 focus:ring-2 focus:ring-primary/20"
										}`}
								/>

								<input
									type="text"
									value={formData.campusId}
									onChange={(e) =>
										setFormData({ ...formData, campusId: e.target.value })
									}
									placeholder="🏫 Campus ID"
									className={`w-full placeholder-text-muted focus:outline-none ${isMobile
										? "px-3 py-3 bg-bg border border-border-muted rounded-md focus:ring-2 focus:ring-primary"
										: "px-4 py-3 bg-bg rounded-lg border-0 focus:ring-2 focus:ring-primary/20"
										}`}
								/>
							</div>
						</details>

						<div
							className={`flex gap-3 ${isMobile
								? "sticky bottom-0 bg-bg-light pt-4 -mx-6 px-6 pb-6"
								: "justify-end pt-6"
								}`}
						>
							<button
								type="button"
								onClick={handleClose}
								className={`font-medium transition-colors ${isMobile
									? "flex-1 px-4 py-3 text-text-muted border border-border-muted rounded-md hover:bg-bg"
									: "px-5 py-2.5 text-text-muted hover:text-text"
									}`}
							>
								Cancelar
							</button>
							<button
								type="submit"
								disabled={!formData.title.trim()}
								className={`font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isMobile
									? "flex-1 px-4 py-3 bg-primary text-white rounded-md hover:bg-primary/90"
									: "px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 shadow-lg"
									}`}
							>
								{task
									? isMobile
										? "Guardar"
										: "Editar tarea"
									: isMobile
										? "Crear Tarea"
										: "Crear tarea"}
							</button>
						</div>
					</form>
				</DialogPanel>
			</div>
		</Dialog>
	);
};

export default TaskModal;
