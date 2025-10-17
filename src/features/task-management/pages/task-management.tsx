import React from "react";
import { useTaskBoard } from "../hooks/useTaskBoard";
import Loaders from "@/components/loading/loaders";
// import Drawer from "@/components/drawer/drawer";
import TaskBoard from "../components/task-board";
import { useTaskManagement } from "../hooks/useTaskManagement";
import TaskDetails from "../components/task-details";
import FormAddTask from "../components/form-add-task";
import FormEditTask from "../components/form-edit-task";
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
      <div className="min-h-[88vh] flex items-center justify-center">
        <Loaders />
      </div>
    );
  if (isError) return <p>Error fetching tasks.</p>;

  return (
    <div className="p-5 flex flex-col gap-1 overflow-x-hidden ">
      <div className="flex flex-row justify-between items-center">
        <Button
          className="flex items-center gap-1"
          onClick={() => {
            setTaskAdd({ ...taskAdd, task: true });
            setRenderDrawerComponents({ components: "TaskAddTask" });
          }}
        >
          <Plus />
          <p className="md:block hidden">Add Task</p>
        </Button>
      </div>

      <div className="overflow-x-auto overflow-y-auto">
        {/* <div className="min-w-[90vw] min-h-[90vh]"> */}
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
                <FormEditTask
                  id={openDetailTask.taskId}
                  handleSubmitted={() => {
                    refetch();
                    setOpenDetailTask({ ...openDetailTask, open: false });
                  }}
                />
              ),
            }[renderDrawerComponents.components]
          }
        </DialogContent>
      </Dialog>
      {/* <Drawer
        isOpen={taskAdd.task || openDetailTask.open}
        onClose={() => {
          setTaskAdd({
            ...taskAdd,
            task: false,
          });
          setOpenDetailTask({ ...openDetailTask, open: false });
        }}
        placement="right"
        title={
          renderDrawerComponents.components === "TaskDetails"
            ? "Task Details"
            : renderDrawerComponents.components === "TaskAddTask"
            ? "Add Task"
            : "Edit Task"
        }
      >
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
                  handleSubmitted={() => {
                    refetch();
                    setTaskAdd({ ...taskAdd, task: false });
                  }}
                />
              </div>
            ),
            TaskEdit: (
              <FormEditTask
                id={openDetailTask.taskId}
                handleSubmitted={() => {
                  refetch();
                  setOpenDetailTask({ ...openDetailTask, open: false });
                }}
              />
            ),
          }[renderDrawerComponents.components]
        }
      </Drawer> */}
    </div>
  );
};

export default TaskManagemt;
