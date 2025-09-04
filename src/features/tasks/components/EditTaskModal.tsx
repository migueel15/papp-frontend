import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import type { Task } from "../models/task";

interface EditTaskModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (
		taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">,
	) => void;
	task?: Task;
}

const formatDateTimeForInput = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const EditTaskModal = ({
	isOpen,
	onClose,
	onSubmit,
	task,
}: EditTaskModalProps) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		status: "todo" as Task["status"],
		priority: "medium" as Task["priority"],
		dueDate: "",
		campusId: "",
		subject: "",
	});

	const titleInputRef = useRef<HTMLInputElement>(null);

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

			{/* Desktop: centered modal */}
			<div className="hidden md:flex fixed inset-0 w-screen items-center justify-center p-4">
				<DialogPanel className="max-w-md w-full bg-bg-light rounded-xl p-6 shadow-2xl border border-border-muted/30">
					{/* Header limpio */}
					<div className="flex items-center justify-between mb-6">
						<DialogTitle className="text-lg font-semibold text-text">
							Editar tarea
						</DialogTitle>
						<button
							onClick={handleClose}
							className="p-1 rounded-md hover:bg-bg transition-colors text-text-muted hover:text-text"
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

					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Campo título - prominente con autofocus */}
						<input
							ref={titleInputRef}
							type="text"
							value={formData.title}
							onChange={(e) =>
								setFormData({ ...formData, title: e.target.value })
							}
							placeholder="¿Qué necesitas hacer?"
							required
							className="w-full text-lg px-0 py-3 bg-transparent border-0 border-b border-border-muted focus:outline-none focus:border-primary placeholder-text-muted font-medium"
						/>

						{/* Descripción sin marco */}
						<textarea
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
							placeholder="Agregar descripción..."
							rows={3}
							className="w-full px-4 py-3 bg-bg rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-text-muted resize-none"
						/>

						{/* Grid para status y priority */}
						<div className="grid grid-cols-2 gap-3">
							<select
								value={formData.status}
								onChange={(e) =>
									setFormData({
										...formData,
										status: e.target.value as Task["status"],
									})
								}
								className="w-full px-4 py-3 bg-bg rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
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
								className="w-full px-4 py-3 bg-bg rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
							>
								<option value="low">🟢 Prioridad Baja</option>
								<option value="medium">🟡 Prioridad Media</option>
								<option value="high">🔴 Prioridad Alta</option>
							</select>
						</div>

						{/* Fecha sin marco */}
						<input
							type="datetime-local"
							value={formData.dueDate}
							onChange={(e) =>
								setFormData({ ...formData, dueDate: e.target.value })
							}
							className="w-full px-4 py-3 bg-bg rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
						/>

						{/* Campos opcionales colapsables */}
						<details className="group">
							<summary className="cursor-pointer text-sm text-primary hover:text-primary/80 transition-colors py-2">
								Más opciones
							</summary>
							<div className="mt-3 space-y-3 group-open:animate-fade-in">
								<input
									type="text"
									value={formData.subject}
									onChange={(e) =>
										setFormData({ ...formData, subject: e.target.value })
									}
									placeholder="📚 Materia (ej. Matemáticas)"
									className="w-full px-4 py-3 bg-bg rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-text-muted"
								/>

								<input
									type="text"
									value={formData.campusId}
									onChange={(e) =>
										setFormData({ ...formData, campusId: e.target.value })
									}
									placeholder="🏫 Campus ID"
									className="w-full px-4 py-3 bg-bg rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-text-muted"
								/>
							</div>
						</details>

						{/* Botones de acción mejorados */}
						<div className="flex gap-3 justify-end pt-6">
							<button
								type="button"
								onClick={handleClose}
								className="px-5 py-2.5 text-text-muted hover:text-text transition-colors font-medium"
							>
								Cancelar
							</button>
							<button
								type="submit"
								disabled={!formData.title.trim()}
								className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
							>
								Guardar
							</button>
						</div>
					</form>
				</DialogPanel>
			</div>

			{/* Mobile: bottom sheet */}
			<div className="md:hidden fixed inset-x-0 bottom-0">
				<DialogPanel className="bg-bg-light rounded-t-2xl max-h-[85vh] overflow-y-auto transform transition-transform duration-300 ease-out data-[closed]:translate-y-full">
					{/* Header con título y botón cerrar */}
					<div className="sticky top-0 bg-bg-light border-b border-border-muted px-6 py-4 rounded-t-2xl">
						<div className="flex items-center justify-between">
							<DialogTitle className="font-bold text-lg text-text">
								Editar tarea
							</DialogTitle>
							<button
								onClick={handleClose}
								className="p-2 -mr-2 rounded-full hover:bg-bg transition-colors"
								aria-label="Cerrar"
							>
								<svg
									className="w-5 h-5 text-text-muted"
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
					</div>

					{/* Form content */}
					<form onSubmit={handleSubmit} className="px-6 py-4 space-y-6">
						{/* Título - Campo principal */}
						<div>
							<input
								type="text"
								value={formData.title}
								onChange={(e) =>
									setFormData({ ...formData, title: e.target.value })
								}
								placeholder="¿Qué necesitas hacer?"
								required
								className="w-full text-lg px-0 py-3 bg-transparent border-0 border-b border-border-muted focus:outline-none focus:border-primary placeholder-text-muted"
							/>
						</div>

						{/* Descripción */}
						<div>
							<textarea
								value={formData.description}
								onChange={(e) =>
									setFormData({ ...formData, description: e.target.value })
								}
								placeholder="Agregar descripción..."
								rows={3}
								className="w-full px-3 py-3 bg-bg border border-border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none placeholder-text-muted"
							/>
						</div>

						{/* Quick actions - Estado y Prioridad */}
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-text-muted mb-2">
									Estado
								</label>
								<select
									value={formData.status}
									onChange={(e) =>
										setFormData({
											...formData,
											status: e.target.value as Task["status"],
										})
									}
									className="w-full px-3 py-3 bg-bg border border-border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
								>
									<option value="todo">Por Hacer</option>
									<option value="in_progress">En Progreso</option>
									<option value="done">Completada</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-text-muted mb-2">
									Prioridad
								</label>
								<select
									value={formData.priority}
									onChange={(e) =>
										setFormData({
											...formData,
											priority: e.target.value as Task["priority"],
										})
									}
									className="w-full px-3 py-3 bg-bg border border-border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
								>
									<option value="low">🟢 Baja</option>
									<option value="medium">🟡 Media</option>
									<option value="high">🔴 Alta</option>
								</select>
							</div>
						</div>

						{/* Fecha de vencimiento */}
						<div>
							<label className="block text-sm font-medium text-text-muted mb-2">
								📅 Fecha de vencimiento
							</label>
							<input
								type="datetime-local"
								value={formData.dueDate}
								onChange={(e) =>
									setFormData({ ...formData, dueDate: e.target.value })
								}
								className="w-full px-3 py-3 bg-bg border border-border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
							/>
						</div>

						{/* Campos adicionales colapsables */}
						<details className="group">
							<summary className="cursor-pointer text-sm font-medium text-primary hover:text-primary/80 transition-colors">
								📚 Más opciones
							</summary>
							<div className="mt-4 space-y-4 group-open:animate-fade-in">
								<div>
									<label className="block text-sm font-medium text-text-muted mb-2">
										Materia
									</label>
									<input
										type="text"
										value={formData.subject}
										onChange={(e) =>
											setFormData({ ...formData, subject: e.target.value })
										}
										placeholder="ej. Matemáticas"
										className="w-full px-3 py-3 bg-bg border border-border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-text-muted mb-2">
										Campus ID
									</label>
									<input
										type="text"
										value={formData.campusId}
										onChange={(e) =>
											setFormData({ ...formData, campusId: e.target.value })
										}
										placeholder="Identificador del campus"
										className="w-full px-3 py-3 bg-bg border border-border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
									/>
								</div>
							</div>
						</details>

						{/* Botones de acción */}
						<div className="sticky bottom-0 bg-bg-light pt-4 -mx-6 px-6 pb-6">
							<div className="flex gap-3">
								<button
									type="button"
									onClick={handleClose}
									className="flex-1 px-4 py-3 text-text-muted border border-border-muted rounded-md hover:bg-bg transition-colors font-medium"
								>
									Cancelar
								</button>
								<button
									type="submit"
									disabled={!formData.title.trim()}
									className="flex-1 px-4 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
								>
									Guardar
								</button>
							</div>
						</div>
					</form>
				</DialogPanel>
			</div>
		</Dialog>
	);
};

export default EditTaskModal;
