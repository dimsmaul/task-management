import auth from "@/config/api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  StatusResponse,
  StatusResponseDatum,
} from "../types/status-response.types";

/**
 * Fetches task statuses from the server.
 * @returns {Promise<StatusResponseDatum[]>} An array of task statuses.
 * @description This function makes a GET request to the "/task-status" endpoint
 * to retrieve the current task statuses.
 */
export const fetchTaskStatuses = async (): Promise<StatusResponseDatum[]> => {
  const { data } = await auth.get<StatusResponse>("/task-status");
  return data.data;
};

/**
 * Updates the status of a task.
 * @param {string} id - The ID of the task to update.
 * @param {string} status - The new status ID to assign to the task.
 * @returns {Promise<StatusResponseDatum>} The updated task status.
 * @description This function makes a PATCH request to the "/task-management/:id"
 */
const updateTaskStatus = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  const { data } = await auth.patch(`/task-management/${id}`, {
    taskStatusId: status,
  });
  return data;
};

const deleteTask = async (id: string) => {
  const { data } = await auth.delete(`/task-management/${id}`);
  return data;
};

export const useTaskBoard = () => {
  const queryClient = useQueryClient();
  const {
    data: taskStatuses = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["task-status"],
    queryFn: fetchTaskStatuses,
  });

  const mutation = useMutation({
    mutationFn: updateTaskStatus,
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["task-status"] });

      /**
       * Optimistically update the task status in the cache.
       * This allows for an immediate UI update while the mutation is in progress.
       */
      const previousStatuses = queryClient.getQueryData<StatusResponseDatum[]>([
        "task-status",
      ]);

      /**
       * Deep clone the previous statuses to avoid direct mutation.
       * This is important to ensure that the original data remains unchanged
       */
      if (previousStatuses) {
        const newStatuses = JSON.parse(JSON.stringify(previousStatuses));

        let taskToMove = null;

        /**
         * Find the task in the current status and remove it from there.
         * This is done by iterating through the statuses and checking if the task exists.
         */
        for (const statusData of newStatuses) {
          const taskIndex = statusData.taskManagements.findIndex(
            (t: { id: string }) => t.id === id
          );
          if (taskIndex !== -1) {
            taskToMove = statusData.taskManagements[taskIndex];
            statusData.taskManagements.splice(taskIndex, 1);
            break;
          }
        }

        /**
         * Find the target status and add the task to it.
         * This is done by finding the status with the matching ID and pushing the task into its taskManagements array.
         */
        if (taskToMove) {
          const targetStatus = newStatuses.find(
            (s: { id: string }) => s.id === status
          );
          if (targetStatus) {
            targetStatus.taskManagements.push(taskToMove);
          }

          /**
           * Update the task's status ID to the new status.
           * This is done by directly modifying the taskToMove object.
           */
          queryClient.setQueryData(["task-status"], newStatuses);
        }
      }

      return { previousStatuses };
    },
    onError: (_, __, context) => {
      /**
       * Rollback the optimistic update if the mutation fails.
       * This is done by resetting the query data to the previous statuses.
       */
      if (context?.previousStatuses) {
        queryClient.setQueryData(["task-status"], context.previousStatuses);
      }
    },
    onSettled: () => {
      /**
       * Invalidate the query to refetch the task statuses after the mutation.
       * This ensures that the UI is always in sync with the server data.
       */
      queryClient.invalidateQueries({ queryKey: ["task-status"] });
    },
  });

  /**
   * Function to move a task to a new status.
   * @param {string} id - The ID of the task to move.
   * @param {string} status - The new status ID to assign to the task.
   */
  const moveTask = (id: string, status: string) => {
    mutation.mutate({ id, status });
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    refetch();
  }

  return {
    taskStatuses,
    isLoading,
    isError,
    moveTask,
    refetch,
    handleDeleteTask,
  };
};
