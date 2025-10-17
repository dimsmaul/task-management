import auth from "@/config/api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTaskStatuses } from "./useTaskBoard";
import { useTaskDetails } from "./useTaskDetails";
import dayjs from "dayjs";

const updateTaskById = async (body: {
  id: string;
  name: string;
  description: string;
  targetDate: string;
  actualDate: string;
  taskStatusId: string;
  taskPriorityId: string;
}) => {
  const {id, ...rest} = body
  const { data } = await auth.patch(`/task-management/${id}`, {
    ...rest,
  });
  return data;
};

const getMasterPriority = async () => {
  const { data } = await auth.get(`/task-priority`);
  return data;
};

const getMasterStatus = async () => {
  const { data } = await auth.get(`/task-status`);
  return data;
};

export interface EditTaskProps {
  taskId: string;
}

export const useEditTaskManagement = (props: EditTaskProps) => {
  const { response } = useTaskDetails(props.taskId);

  const queryClient = useQueryClient();

  /**
   * Get master priority
   * @returns {Promise<any>} - The master priority data
   * @description This function fetches the master priority data from the API.
   */
  const { data: masterPriority } = useQuery({
    queryKey: ["master-task-priority"],
    queryFn: getMasterPriority,
  });

  /**
   * Get master status
   * @returns {Promise<any>} - The master status data
   * @description This function fetches the master status data from the API.
   */

  const { data: masterStatus } = useQuery({
    queryKey: ["master-task-status"],
    queryFn: getMasterStatus,
  });

  /**
   * Initial values for the task status form
   */

  const initialValues = {
    id: response?.id || "",
    name: response?.name || "",
    description: response?.description || "",
    targetDate: dayjs(response?.targetDate).format("YYYY-MM-DD") || "",
    actualDate: dayjs(response?.actualDate).format("YYYY-MM-DD") || "",
    taskStatusId: response?.taskStatus?.id || "",
    taskPriorityId: response?.taskPriority.id || "",
  };

  /**
   * Update task by ID
   * @param {Object} body - The request body
   * @param {string} body.id - The task ID
   * @param {string} body.name - The task name
   * @param {string} body.description - The task description
   * @param {string} body.targetDate - The target date
   * @param {string} body.actualDate - The actual date
   * @param {string} body.taskStatusId - The task status ID
   * @param {string} body.taskPriorityId - The task priority ID
   * @returns {Promise<any>} - The response data
   */

  const updateTask = useMutation({
    mutationFn: updateTaskById,
    onSuccess: () => {
      queryClient.setQueryData(["task-status"], (oldData) => {
        const typedOldData = oldData as Array<typeof updateTaskById>;
        return [...typedOldData];
      });
    },
  });

  const { data: taskStatuses } = useQuery({
    queryKey: ["task-status"],
    queryFn: fetchTaskStatuses,
  });

  return {
    taskStatuses,
    updateTask,
    initialValues,
    masterPriority,
    masterStatus,
  };
};
