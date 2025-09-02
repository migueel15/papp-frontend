import type { Task } from "../models/task";
import Status from "./Status";
import Priority from "./Priority";
import DeleteIcon from "@/assets/icons/trash.svg?react";
import EditIcon from "@/assets/icons/edit.svg?react";

interface TaskCardProps {
  task: Task;
  onDelete: (id: Task["id"]) => void;
  onEdit: () => void;
}

const TaskCard = ({ task, onDelete, onEdit }: TaskCardProps) => {
  return (
    <div className="bg-bg-light rounded-lg p-4 mb-3 shadow-sm border border-border-muted">
      {/* Header con checkbox, título y acciones */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start gap-3 flex-1">
          <input type="checkbox" className="accent-primary mt-1" />
          <h3 className="font-medium text-text flex-1">{task.title}</h3>
        </div>
        <div className="flex gap-2 ml-2">
          <EditIcon className="w-4 h-4 text-text-muted cursor-pointer hover:text-text" onClick={onEdit} />
          <DeleteIcon className="w-4 h-4 text-text-muted cursor-pointer hover:text-danger" onClick={() => onDelete(task.id)} />
        </div>
      </div>

      {/* Fecha de vencimiento */}
      {task.dueDate && (
        <div className="text-sm text-text-muted mb-2">
          📅 {task.dueDate.toLocaleString("es-ES", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </div>
      )}

      {/* Status y Priority */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">Estado:</span>
          <Status value={task.status} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">Prioridad:</span>
          <Priority value={task.priority} />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
