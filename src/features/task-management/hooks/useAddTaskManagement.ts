import auth from "@/config/api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTaskStatuses } from "./useTaskBoard";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormAddTaskProps } from "../components/form-add-task";
import { confirmAPIForm } from "@/components/custom-alert";
import { statusList } from "@/features/status/hooks/useStatus";


export type TaskFormType = z.infer<typeof formSchema>;

/**
 * API: Insert new task
 */
const insertTask = async (body: TaskFormType) => {
  const { data } = await auth.post(`/task-management`, body);
  return data;
};

/**
 * API: Update existing task
 */
const updateTask = async ({ id, body }: { id: string; body: TaskFormType }) => {
  const { data } = await auth.patch(`/task-management/${id}`, body);
  return data;
};



/**
 * API: Get task detail (for edit mode)
 */
const getTaskDetail = async (id: string) => {
  const { data } = await auth.get(`/task-management/${id}`);
  return data;
};

// const getMasterPriority = async () => {
//   const { data } = await auth.get(`/task-priority`);
//   return data;
// };

// const getMasterStatus = async () => {
//   const { data } = await auth.get(`/task-status`);
//   return data;
// };

export const useAddTaskManagement = ({
  handleClose,
  handleSubmitted,
}: FormAddTaskProps) => {
  const queryClient = useQueryClient();

  /**
   * Get master priority
   * @returns {Promise<any>} - The master priority data
   * @description This function fetches the master priority data from the API.
   */
  // const { data: masterPriority } = useQuery({
  //   queryKey: ["master-task-priority"],
  //   queryFn: getMasterPriority,
  // });

  /**
   * Get master status
   * @returns {Promise<any>} - The master status data
   * @description This function fetches the master status data from the API.
   */

  const { data: masterStatus } = useQuery({
    queryKey: ["master-task-status"],
    queryFn: statusList,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  /**
   * Initial values for the task status form
   */

  const initialValues = {
    name: "",
    description: "",
    targetDate: "",
    actualDate: "",
    taskStatusId: "",
    taskPriorityId: "",
  };

  /**
   * Create a new task status
   * @param {string} name - The name of the task status
   * @param {string} description - The description of the task status
   * @param {number} sequence - The sequence number of the task status
   * @param {string} color - The color of the task status
   * @returns {Promise<any>} - The created task status
   */

  const createTask = useMutation({
    mutationFn: insertTask,
    onSuccess: () => {
      queryClient.setQueryData(["task-status"], (oldData) => {
        const typedOldData = oldData as Array<typeof insertTask>;
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
  //     const { data } = await insertTask(body);
  //     queryClient.setQueryData(["task-status"], (oldData) => {
  //       const typedOldData = oldData as Array<typeof data>;
  //       return [...typedOldData, data];
  //     });
  //     return data;
  //   };

  const { data: taskStatuses } = useQuery({
    queryKey: ["task-status"],
    queryFn: fetchTaskStatuses,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleClose();

    confirmAPIForm({
      callAPI: () => createTask.mutateAsync(values),
      onAlertSuccess: () => handleSubmitted(),
    });
  };

  return {
    taskStatuses,
    createTask,
    initialValues,
    // masterPriority,
    masterStatus,
    form,
    onSubmit,
  };
};

// ✅ Schema Validasi Zod
export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  targetDate: z.string().min(1, "Target date is required"),
  actualDate: z.string().optional(),
  taskStatusId: z.string().min(1, "Status is required"),
  taskPriorityId: z.string().optional(),
});
