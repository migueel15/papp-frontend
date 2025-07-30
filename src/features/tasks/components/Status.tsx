import type { Task } from "../models/task";

const Status = ({ value }: { value: Task["status"] }) => {
  const colors = {
    todo: "bg-card-todo/15 border-card-todo border-1 text-card-todo",
    in_progress:
      "bg-card-inprogress/15 border-card-inprogress border-1 text-card-inprogress",
    done: "bg-card-done/15 border-card-done border-1 text-card-done",
  };

  const text = {
    todo: "Todo",
    in_progress: "In progress",
    done: "Done",
  };

  return (
    <p
      className={`${colors[value]} inline-block text-bg rounded-full text-center text-xs py-1 px-2`}
    >
      {text[value]}
    </p>
  );
};

export default Status;
