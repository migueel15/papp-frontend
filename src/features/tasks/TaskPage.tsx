import { useEffect } from "react";
import useTask from "./useTask";
import TaskCard from "./components/TaskCard";
import TasksTable from "./components/TaskTable.tsx";

const TaskPage = () => {
  const tasks = useTask();
  if (tasks.isLoading) return <h1>Loading...</h1>;
  if (tasks.error) return <h1>Error</h1>;

  return (
    <div className="w-full">
      <TasksTable
        tasks={tasks.tasks}
        onDelete={tasks.delTask}
        onEdit={() => { }}
      />
    </div>
  );
};

export default TaskPage;
