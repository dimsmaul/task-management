import Preview from "@/components/preview/preview";
import { useTaskDetails } from "../hooks/useTaskDetails";
import Loaders from "@/components/loading/loaders";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

export interface TaskDetailsProps {
  taskId: string;
  openEditTask: (taskId: string) => void;
  openDeleteTask: (taskId: string) => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = (props) => {
  const { data, isLoading } = useTaskDetails(props.taskId);

  if (isLoading)
    return (
      <div className="min-h-[88vh] flex items-center justify-center">
        <Loaders />
      </div>
    );

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 ">
        {data?.map((item, i) => (
          <Preview title={item.label} key={i}>
            {item.value}
          </Preview>
        ))}
      </div>
      <div className="flex flex-row gap-2 mt-5">
        <Button
          className="flex flex-row gap-1 items-center"
          onClick={() => props.openEditTask(props.taskId)}
        >
          <Pencil />
          Edit
        </Button>
        <Button
          variant={"destructive"}
          className="flex flex-row gap-1 items-center"
          onClick={() => props.openDeleteTask(props.taskId)}
        >
          <Trash />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskDetails;
