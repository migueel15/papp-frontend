import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import type { Task } from "../models/task";

interface CreateTaskBottomSheetProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (
		taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">,
	) => void;
}

const CreateTaskBottomSheet = ({
	isOpen,
	onClose,
	onSubmit,
}: CreateTaskBottomSheetProps) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		status: "todo" as Task["status"],
		priority: "medium" as Task["priority"],
		dueDate: "",
		campusId: "",
		subject: "",
	});

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
			className="relative z-50 md:hidden"
		>
			<DialogBackdrop className="fixed inset-0 bg-black/50" />

			<div className="fixed inset-x-0 bottom-0">
				<DialogPanel className="bg-bg-light rounded-t-2xl max-h-[85vh] overflow-y-auto transform transition-transform duration-300 ease-out data-[closed]:translate-y-full">
					{/* Header con título y botón cerrar */}
					<div className="sticky top-0 bg-bg-light border-b border-border-muted px-6 py-4 rounded-t-2xl">
						<div className="flex items-center justify-between">
							<DialogTitle className="font-bold text-lg text-text">
								Nueva Tarea
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
								autoFocus
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
									Crear Tarea
								</button>
							</div>
						</div>
					</form>
				</DialogPanel>
			</div>
		</Dialog>
	);
};

export default CreateTaskBottomSheet;
