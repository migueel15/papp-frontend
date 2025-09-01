import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react';
import { useState } from 'react';
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
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 bg-bg-light rounded-lg p-6 shadow-lg">
          <DialogTitle className="font-bold text-lg">Crear Nueva Tarea</DialogTitle>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-text mb-2">
                Título *
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-3 py-2 border border-text-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-text mb-2">
                Descripción
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-text-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-text mb-2">
                  Estado
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
                  className="w-full px-3 py-2 border border-text-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="todo">Por Hacer</option>
                  <option value="in_progress">En Progreso</option>
                  <option value="done">Completada</option>
                </select>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-text mb-2">
                  Prioridad
                </label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                  className="w-full px-3 py-2 border border-text-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="low">Baja</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-text mb-2">
                Fecha de Vencimiento
              </label>
              <input
                id="dueDate"
                type="datetime-local"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-text-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-text mb-2">
                Materia
              </label>
              <input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 border border-text-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="campusId" className="block text-sm font-medium text-text mb-2">
                Campus ID
              </label>
              <input
                id="campusId"
                type="text"
                value={formData.campusId}
                onChange={(e) => setFormData({ ...formData, campusId: e.target.value })}
                className="w-full px-3 py-2 border border-text-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-text-muted border border-text-muted rounded-md hover:bg-bg-dark transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Crear Tarea
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CreateTaskModal;