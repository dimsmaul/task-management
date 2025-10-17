import React from "react";
import { useTaskBoard } from "../hooks/useTaskBoard";
import Loaders from "@/components/loading/loaders";
// import Drawer from "@/components/drawer/drawer";
import TaskBoard from "../components/task-board";
import { useTaskManagement } from "../hooks/useTaskManagement";
import TaskDetails from "../components/task-details";
import FormAddTask from "../components/form-add-task";
// import FormEditTask from "../components/form-edit-task";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const TaskManagemt: React.FC = () => {
  const { taskStatuses, isLoading, isError, refetch, handleDeleteTask } =
    useTaskBoard();
  const {
    taskAdd,
    setTaskAdd,
    openDetailTask,
    openEditTask,
    setOpenEditTask,
    setOpenDetailTask,
    renderDrawerComponents,
    setRenderDrawerComponents,
  } = useTaskManagement();

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loaders />
      </div>
    );
  if (isError) return <p>Error fetching tasks.</p>;

  return (
    <div className="flex flex-col gap-1 overflow-x-hidden ">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-lg font-semibold">Task Management</h1>
        <Button
          className="flex items-center gap-1"
          variant={"outline"}
          onClick={() => {
            setTaskAdd({ ...taskAdd, task: true });
            setRenderDrawerComponents({ components: "TaskAddTask" });
          }}
        >
          <Plus />
          <p className="md:block hidden">Add Task</p>
        </Button>
      </div>

      <div className="w-full overflow-auto">
        <div className="">
          <TaskBoard
            taskStatuses={taskStatuses}
            openTaskDetail={(taskId) => {
              setOpenDetailTask({ open: true, taskId });
              setRenderDrawerComponents({ components: "TaskDetails" });
            }}
          />
        </div>
      </div>

      <Dialog
        open={taskAdd.task || openDetailTask.open || openEditTask.open}
        onOpenChange={() => {
          setTaskAdd({
            ...taskAdd,
            task: false,
          });
          setOpenDetailTask({ ...openDetailTask, open: false });
          setOpenEditTask({ ...openEditTask, open: false });
        }}
        // pl="right"
        // title={
        //   renderDrawerComponents.components === "TaskDetails"
        //     ? "Task Details"
        //     : renderDrawerComponents.components === "TaskAddTask"
        //     ? "Add Task"
        //     : "Edit Task"
        // }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {renderDrawerComponents.components === "TaskDetails"
                ? "Task Details"
                : renderDrawerComponents.components === "TaskAddTask"
                ? "Add Task"
                : "Edit Task"}
            </DialogTitle>
          </DialogHeader>
          {
            {
              TaskDetails: (
                <TaskDetails
                  taskId={openDetailTask.taskId}
                  openEditTask={function (taskId: string): void {
                    setOpenEditTask({ ...openEditTask, open: true, taskId });
                    setRenderDrawerComponents({ components: "TaskEdit" });
                  }}
                  openDeleteTask={(id) => {
                    setOpenDetailTask({ ...openDetailTask, open: false });
                    handleDeleteTask(id).then(() => {
                      refetch();
                    });
                  }}
                />
              ),
              TaskAddTask: (
                <div>
                  <FormAddTask
                    handleClose={() => {
                      setTaskAdd({ ...taskAdd, task: false });
                    }}
                    handleSubmitted={() => {
                      refetch();
                      setTaskAdd({ ...taskAdd, task: false });
                    }}
                  />
                </div>
              ),
              TaskEdit: (
                <FormAddTask
                  handleClose={() => {
                    setOpenEditTask({ ...openEditTask, open: false });
                    setOpenDetailTask({ ...openDetailTask, open: false });
                  }}
                  handleSubmitted={() => {
                    refetch();
                    setOpenEditTask({ ...openEditTask, open: false });
                    setOpenDetailTask({ ...openDetailTask, open: false });
                  }}
                  id={openDetailTask.taskId}
                />
              ),
            }[renderDrawerComponents.components]
          }
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskManagemt;
