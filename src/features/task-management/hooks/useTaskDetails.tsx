import { useQuery } from "@tanstack/react-query";
import auth from "@/config/api/auth";
import {
  TaskBoardResponseById,
  TaskBoardResponseDatum,
} from "../types/task-response.types";
import Badge from "@/components/badge/badge";
import dayjs from "dayjs";

export interface MappingDataTypes {
  label: string;
  value: string | number | React.ReactNode;
}

const fetchTaskDetails = async (id: string): Promise<TaskBoardResponseDatum> => {
  const { data } = await auth.get<TaskBoardResponseById>(`/task-management/${id}`);
  return data.data;
};

export const useTaskDetails = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["task-details", id],
    queryFn: () => fetchTaskDetails(id),
    enabled: !!id,
  });

  const mappingData: MappingDataTypes[] = data
    ? [
        // { label: "Task ID", value: data.id },
        { label: "Task Name", value: data.name },
        { label: "Task Description", value: data.description },
        { label: "Target Date", value: data.targetDate ? dayjs(data.targetDate).format("DD MMM YYYY") : "N/A" },
        { label: "Actual Date", value: data.actualDate ? dayjs(data.actualDate).format("DD MMM YYYY") : "N/A" },
        { label: "Task Status", value: data.taskStatus ? <Badge name={data.taskStatus.name} color={data.taskStatus.color} /> : "N/A" },
        // { label: "Task Priority", value: data.taskPriority ? <Badge name={data.taskPriority.name} color={data.taskPriority.color} /> : "N/A" },
        { label: "Created At", value: dayjs(data.createdAt).format("DD MMM YYYY ") },
        // { label: "Last Updated", value: dayjs(data.updatedAt).format("DD MMM YYYY HH:mm:ss") },
      ]
    : [];

  return { data: mappingData, isLoading, isError, response: data };
};
