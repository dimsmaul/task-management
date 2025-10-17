import React, { useState } from "react";

export const useTaskManagement = () => {
  const [taskAdd, setTaskAdd] = React.useState<{
    task: boolean;
  }>({
    task: false,
  });
  const [openDetailTask, setOpenDetailTask] = React.useState<{
    open: boolean;
    taskId: string;
  }>({
    open: false,
    taskId: "",
  });

  const [openEditTask, setOpenEditTask] = React.useState<{
    open: boolean;
    taskId: string;
  }>({
    open: false,
    taskId: "",
  });

  const [renderDrawerComponents, setRenderDrawerComponents] = useState<{
    components: "TaskDetails" | "TaskAddTask" | "TaskEdit";
  }>({
    components: "TaskDetails",
  });

  return {
    taskAdd,
    setTaskAdd,
    openEditTask,
    setOpenEditTask,
    openDetailTask,
    setOpenDetailTask,
    renderDrawerComponents,
    setRenderDrawerComponents,
  };
};