import React from "react";
import TaskCard from "./task-card";
import { StatusResponseDatum } from "../types/status-response.types";
import { useTaskBoard } from "../hooks/useTaskBoard";
import { useDrop } from "react-dnd";
import clsx from "clsx";

interface TaskColumnProps {
  status: StatusResponseDatum;
  openTaskDetail?: (taskId: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = (props) => {
  const { moveTask } = useTaskBoard();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => {
      moveTask(item.id, props.status.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const dropRef = React.useRef<HTMLDivElement>(null);
  drop(dropRef);

  return (
    <div
      ref={dropRef}
      className={clsx(
        "p-3 rounded-lg transition-all duration-300",
        isOver ? "bg-primary-300" : "bg-primary-100"
      )}
    >
      <h3 className="text-lg w-[250px] font-semibold text-support-100 p-2 rounded-md flex items-center gap-3 transition-all duration-300">
        <div
          style={{ backgroundColor: props.status.color }}
          className="rounded-full h-3 w-3"
        ></div>
        <p className="text-base">{props.status.name}</p>
      </h3>
      <div className="mt-3 space-y-2">
        {props.status.taskManagements.map((task) => (
          <TaskCard key={task.id} task={task} onClick={props.openTaskDetail} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
