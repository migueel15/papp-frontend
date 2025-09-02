import type { Task } from "../models/task";
import Status from "./Status.tsx";
import Priority from "./Priority.tsx";
import TaskCard from "./TaskCard.tsx";

import DeleteIcon from "@/assets/icons/trash.svg?react";
import EditIcon from "@/assets/icons/edit.svg?react";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";

const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];

const TasksTable = ({
  tasks,
  onDelete,
  onEdit,
}: {
  tasks: Task[];
  onDelete: (id: Task["id"]) => void;
  onEdit: () => void;
}) => {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  return (
    <div className="bg-bg-light rounded-lg drop-shadow-md overflow-hidden">
      <h2 className="p-4">All Tasks</h2>
      
      {/* Vista de tabla - solo en desktop */}
      <div className="hidden md:block">
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
                  <input type="text" defaultValue={task.title} />
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
                  <Listbox
                    value={task.status}
                    defaultValue={task.status}
                    onChange={(v) => {
                      task.status = v;
                    }}
                  >
                    <ListboxButton>
                      <Status value={task.status} />
                    </ListboxButton>
                    <ListboxOptions anchor="bottom" className="bg-bg-dark">
                      <ListboxOption key={"todo"} value={"todo"}>
                        <Status value="todo" />
                      </ListboxOption>

                      <ListboxOption key={"done"} value={"done"}>
                        <Status value="done" />
                      </ListboxOption>

                      <ListboxOption key={"inprogress"} value={"inprogress"}>
                        <Status value="in_progress" />
                      </ListboxOption>
                    </ListboxOptions>
                  </Listbox>
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

      {/* Vista de tarjetas - solo en móvil */}
      <div className="md:hidden p-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default TasksTable;
