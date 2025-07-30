import type { Task } from "../models/task";
import Status from "./Status.tsx";
import Priority from "./Priority.tsx";

import DeleteIcon from "@/assets/icons/trash.svg?react";
import EditIcon from "@/assets/icons/edit.svg?react";

const TasksTable = ({
  tasks,
  onDelete,
  onEdit,
}: {
  tasks: Task[];
  onDelete: (id: Task["id"]) => void;
  onEdit: () => void;
}) => {
  return (
    <div className="bg-bg-light rounded-lg drop-shadow-md overflow-hidden">
      <h2 className="p-4">All Tasks</h2>
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
                <input type="text" value={task.title} />
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
                <Status value={task.status} />
              </td>
              <td className="p-2">
                <Priority value={task.priority} />
              </td>
              <td className="p-2">
                <div className="flex gap-2">
                  <EditIcon className="w-4 h-4" onClick={onEdit} />
                  <DeleteIcon
                    className="w-4 h-4"
                    onClick={() => {
                      onDelete(task.id);
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;
