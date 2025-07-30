import { useEffect, useState } from "react";
import type { Task } from "./models/task";
import { deleteTask, getAllTasks } from "./task.service";

const useTask = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const result = await getAllTasks();
      setTasks(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const delTask = async (id: Task["id"]) => {
    try {
      await deleteTask(id);
      setTasks(
        (prevTasks) => prevTasks?.filter((task) => task.id !== id) ?? null,
      );
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return { tasks, isLoading, error, delTask };
};

export default useTask;
