import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react';
import { useState, useRef } from 'react';
import type { Task } from '../models/task';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => void;
}

const CreateTaskModal = ({ isOpen, onClose, onSubmit }: CreateTaskModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo' as Task['status'],
    priority: 'medium' as Task['priority'],
    dueDate: '',
    campusId: '',
    subject: ''
  });

  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'> = {
      title: formData.title,
      description: formData.description || undefined,
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      campusId: formData.campusId || undefined,
      subject: formData.subject || undefined
    };

    onSubmit(taskData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: '',
      campusId: '',
      subject: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50" initialFocus={titleInputRef}>
      <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-md w-full bg-bg-light rounded-xl p-6 shadow-2xl border border-border-muted/30">
          {/* Header limpio */}
          <div className="flex items-center justify-between mb-6">
            <DialogTitle className="text-lg font-semibold text-text">
              Nueva tarea
            </DialogTitle>
            <button
              onClick={handleClose}
              className="p-1 rounded-md hover:bg-bg transition-colors text-text-muted hover:text-text"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo título - prominente con autofocus */}
            <input
              ref={titleInputRef}
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="¿Qué necesitas hacer?"
              required
              className="w-full text-lg px-0 py-3 bg-transparent border-0 border-b border-border-muted focus:outline-none focus:border-primary placeholder-text-muted font-medium"
            />

            {/* Descripción sin marco */}
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Agregar descripción..."
              rows={3}
              className="w-full px-4 py-3 bg-bg rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-text-muted resize-none"
            />

            {/* Grid para status y priority */}
            <div className="grid grid-cols-2 gap-3">
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
                className="w-full px-4 py-3 bg-bg rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="todo">📋 Por Hacer</option>
                <option value="in_progress">⚡ En Progreso</option>
                <option value="done">✅ Completada</option>
              </select>

              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
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
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="📚 Materia (ej. Matemáticas)"
                  className="w-full px-4 py-3 bg-bg rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-text-muted"
                />

                <input
                  type="text"
                  value={formData.campusId}
                  onChange={(e) => setFormData({ ...formData, campusId: e.target.value })}
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
                Crear tarea
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CreateTaskModal;