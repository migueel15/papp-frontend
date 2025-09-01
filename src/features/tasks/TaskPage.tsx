import { useState } from "react";
import useTask from "./useTask";
import TaskCard from "./components/TaskCard";
import TasksTable from "./components/TaskTable.tsx";
import CreateTaskModal from "./components/CreateTaskModal";
import { useAuth } from "@/features/auth/auth.hook";

const TaskPage = () => {
  const tasks = useTask();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  if (tasks.isLoading) return <h1>Loading...</h1>;
  if (tasks.error) return <h1>Error</h1>;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tareas</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Nueva Tarea
        </button>
      </div>
      
      <TasksTable
        tasks={tasks.tasks}
        onDelete={tasks.delTask}
        onEdit={() => { }}
      />

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(taskData) => tasks.addTask(taskData, user?.id || '')}
      />
    </div>
  );
};

export default TaskPage;
