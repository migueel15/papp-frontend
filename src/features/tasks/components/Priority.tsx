import type { Task } from "../models/task";
import DotIcon from "@/assets/icons/dot-circle.svg?react";

const Priority = ({ value }: { value: Task["priority"] }) => {
  const colors = {
    low: "bg-priority-low/15 border-priority-low border-1 text-priority-low",
    medium:
      "bg-priority-medium/15 border-priority-medium border-1 text-priority-medium",
    high: "bg-priority-high/15 border-priority-high border-1 text-priority-high",
  };

  const text = {
    low: "Low",
    medium: "Medium",
    high: "High",
  };

  return (
    <p
      className={`${colors[value]} inline-flex items-center rounded-full text-bg text-xs py-1 px-2`}
    >
      <DotIcon className="w-3 h-3 mr-1" />
      {text[value]}
    </p>
  );
};

export default Priority;
