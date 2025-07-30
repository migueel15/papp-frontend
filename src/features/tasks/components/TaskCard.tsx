import type { Task } from "../models/task";

const TaskCard = ({ task }: { task: Task }) => {
  return <h1>{task.title}</h1>;
};

export default TaskCard;
