import auth from "@/config/api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTaskStatuses } from "./useTaskBoard";

const insertTaskStatus = async (body: {
  name: string;
  description: string;
  sequence: string;
  color: string;
}) => {
  const { data } = await auth.post(`/task-status`, {
    ...body,
  });
  return data;
};

export const useTaskStatus = () => {
  const queryClient = useQueryClient();

  /**
   * Initial values for the task status form
   */

  const initialValues = {
    name: "",
    description: "",
    sequence: "0",
    color: "#000000",
  };

  /**
   * Create a new task status
   * @param {string} name - The name of the task status
   * @param {string} description - The description of the task status
   * @param {number} sequence - The sequence number of the task status
   * @param {string} color - The color of the task status
   * @returns {Promise<any>} - The created task status
   */

  const createTaskStatus = useMutation({
    mutationFn: insertTaskStatus,
    onSuccess: () => {
      queryClient.setQueryData(["task-status"], (oldData) => {
        const typedOldData = oldData as Array<typeof insertTaskStatus>;
        return [...typedOldData];
      });
    },
  });

  //   const createTaskStatus = async (body: {
  //     name: string;
  //     description: string;
  //     sequence: number;
  //     color: string;
  //   }) => {
  //     const { data } = await insertTaskStatus(body);
  //     queryClient.setQueryData(["task-status"], (oldData) => {
  //       const typedOldData = oldData as Array<typeof data>;
  //       return [...typedOldData, data];
  //     });
  //     return data;
  //   };

  const { data: taskStatuses } = useQuery({
    queryKey: ["task-status"],
    queryFn: fetchTaskStatuses,
  });

  return {
    taskStatuses,
    createTaskStatus,
    initialValues,
  };
};
