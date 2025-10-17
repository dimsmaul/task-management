import auth from "@/config/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { StatusListResponse } from "../types";
import { confirmAPIForm } from "@/components/custom-alert";

export const useStatus = () => {
  const list = useQuery({
    queryKey: ["status-list-one"],
    queryFn: statusList,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: deleteStatus,
    onSuccess: () => {
      list.refetch();
    },
  });

  const handleDelete = (id: string) => {
    confirmAPIForm({
      callAPI: () => mutation.mutateAsync(id),
      onAlertSuccess: () => {},
    });
  };

  return {
    list,
    handleDelete,
  };
};

export const statusList = async () => {
  const response = await auth.get<StatusListResponse>("/task-status");
  return response.data;
};

const deleteStatus = async (id: string) => {
  const response = await auth.delete(`/task-status/${id}`);
  return response.data;
};
