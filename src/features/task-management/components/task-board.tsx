import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "./task-column";
import { StatusResponseDatum } from "../types/status-response.types";

export interface TaskBoardProps {
  taskStatuses: StatusResponseDatum[];
  openTaskDetail: (taskId: string) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = (props) => {
  return (
    <div className="w-fit overflow-x-auto">
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-row">
          {props.taskStatuses?.map((status) => (
            <TaskColumn
              key={status.id}
              status={status}
              openTaskDetail={props.openTaskDetail}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default TaskBoard;
