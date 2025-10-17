import React from "react";
import { useDrag } from "react-dnd";
import { StatusResponseTaskManagement } from "../types/status-response.types";
import Badge from "@/components/badge/badge";

interface TaskCardProps {
  task: StatusResponseTaskManagement;
  onClick?: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = (props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: props.task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const dragRef = React.useRef<HTMLDivElement>(null);
  drag(dragRef);

  return (
    <div
      ref={dragRef}
      className={`p-3 flex flex-col gap-2 bg-primary-100 rounded-lg border border-support-100/30 cursor-grab transition-all duration-300 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      onClick={() => {
        if (props.onClick) {
          props.onClick(props.task.id);
        }
      }}
    >
      <h4 className="font-semibold text-support-100 transition-all duration-300">
        {props.task.name}
      </h4>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-support-100/50 line-clamp-2">
          {props.task.description}
        </p>
        <Badge
          name={props.task.taskPriority?.name}
          color={props.task.taskPriority?.color}
        />
      </div>
    </div>
  );
};

export default TaskCard;
