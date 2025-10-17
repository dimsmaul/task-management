import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import auth from "@/config/api/auth";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { confirmAPIForm } from "@/components/custom-alert";
import { useEffect } from "react";

const queryClient = new QueryClient();

export const useStatusAction = ({
  isCreate,
  statusId,
  open,
}: {
  isCreate: boolean;
  statusId?: string;
  open: boolean;
}) => {
  const details = useQuery({
    queryKey: ["status-details", statusId, open],
    queryFn: () => getDetails(statusId!),
    enabled: !!statusId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      color: "#",
      description: "",
      sequence: "0",
    },
  });

  useEffect(() => {
    if (details.data) {
      form.setValue("name", details.data?.data.name);
      form.setValue("color", details.data?.data.color);
      form.setValue("description", details.data?.data.description || "");
    }
  }, [details.data, form, open]);

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      if (isCreate) return createStatus(data);
      if (statusId) return editStatus(statusId, data);
      throw new Error("Status ID is required for editing");
    },
    onSuccess: () => {},
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    confirmAPIForm({
      callAPI() {
        return mutation.mutateAsync(data);
      },
      async onAlertSuccess() {
        await queryClient.invalidateQueries({ queryKey: ["status-list-one"] });
        form.reset();
      },
    });
  };

  return {
    form,
    handleSubmit,
  };
};

const getDetails = async (statusId: string) => {
  const response = await auth.get(`/task-status/${statusId}`);
  return response.data;
};

const createStatus = async (data: z.infer<typeof formSchema>) => {
  const response = await auth.post("/task-status", data);
  return response.data;
};

const editStatus = async (
  statusId: string,
  data: z.infer<typeof formSchema>
) => {
  const response = await auth.patch(`/task-status/${statusId}`, data);
  return response.data;
};

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  color: z.string().min(1, { message: "Color is required" }),
  description: z.string().optional(),
  sequence: z.string().optional(),
});
