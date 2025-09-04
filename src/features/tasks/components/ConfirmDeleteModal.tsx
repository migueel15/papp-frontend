import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";

interface ConfirmDeleteModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	taskTitle: string;
}

const ConfirmDeleteModal = ({
	isOpen,
	onClose,
	onConfirm,
	taskTitle,
}: ConfirmDeleteModalProps) => {
	return (
		<Dialog open={isOpen} onClose={onClose} className="relative z-50">
			<DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

			<div className="fixed inset-0 flex items-center justify-center p-4">
				<DialogPanel className="bg-bg-light rounded-xl p-6 max-w-sm w-full shadow-2xl border border-border-muted/30">
					{/* Header con icono y título */}
					<div className="flex items-center gap-3 mb-4">
						<div className="w-10 h-10 bg-danger/10 rounded-full flex items-center justify-center">
							<svg
								className="w-5 h-5 text-danger"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</div>
						<div>
							<DialogTitle className="font-semibold text-text">
								Eliminar tarea
							</DialogTitle>
							<p className="text-sm text-text-muted">
								Esta acción no se puede deshacer
							</p>
						</div>
					</div>

					{/* Información de la tarea */}
					<div className="mb-6 p-3 bg-bg rounded-lg border border-border-muted/20">
						<p className="text-sm text-text-muted mb-1">Tarea a eliminar:</p>
						<p className="font-medium text-text line-clamp-2">"{taskTitle}"</p>
					</div>

					{/* Botones de acción */}
					<div className="flex gap-3">
						<button
							onClick={onClose}
							className="flex-1 px-4 py-2 text-text-muted hover:text-text transition-colors font-medium"
						>
							Cancelar
						</button>
						<button
							onClick={onConfirm}
							className="flex-1 px-4 py-2 bg-danger text-white rounded-lg hover:bg-danger/90 transition-colors font-medium shadow-lg"
						>
							Eliminar
						</button>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
};

export default ConfirmDeleteModal;
