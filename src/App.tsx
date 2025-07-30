import { useState } from "react";
import "./App.css";
import { useAuth } from "./features/auth/auth.hook";
import { getAllTasks } from "./features/tasks/task.service";

function App() {
  const auth = useAuth();
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    const tasks = await getAllTasks();
    console.log(tasks);
    setTasks(tasks);
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">
          Hello, {auth.user?.name}
        </h1>

        <button
          type="button"
          onClick={() => {
            auth.logout();
          }}
        >
          LOG OUT
        </button>
        <button
          type="button"
          onClick={() => {
            getData();
          }}
        >
          GET TASKS
        </button>
        {tasks && (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                {task.title} - {task.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
