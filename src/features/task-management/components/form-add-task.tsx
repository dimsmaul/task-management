import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Loaders from "@/components/loading/loaders";
import { useAddTaskManagement } from "../hooks/useAddTaskManagement";

export interface FormAddTaskProps {
  handleSubmitted: () => void;
  handleClose: () => void;
}

const FormAddTask: React.FC<FormAddTaskProps> = ({
  handleSubmitted,
  handleClose,
}) => {
  const { createTask, masterStatus, form, onSubmit } = useAddTaskManagement({
    handleClose,
    handleSubmitted,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 mt-2"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Input task name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Input description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Target Date */}
        <FormField
          control={form.control}
          name="targetDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Actual Date */}
        <FormField
          control={form.control}
          name="actualDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Actual Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name="taskStatusId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {(masterStatus?.data || []).map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Priority (opsional, tinggal aktifkan jika dibutuhkan) */}
        {/* <FormField
          control={form.control}
          name="taskPriorityId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {(masterPriority?.data || []).map((item: any) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <div className="flex justify-end mt-4">
          <Button
            className="btn-primary"
            type="submit"
            disabled={createTask.isPending}
          >
            {createTask.isPending ? <Loaders size={1} /> : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormAddTask;

// import React from "react";
// import { Form, Formik } from "formik";
// import TextInput from "@/components/input/text-input";
// import Loaders from "@/components/loading/loaders";
// import SelectInput from "@/components/input/select-input";
// import { useAddTaskManagement } from "../hooks/useAddTaskManagement";
// import { Button } from "@/components/ui/button";
// import { confirmAPIForm } from "@/components/custom-alert";

// export interface FormAddTaskProps {
//   handleSubmitted: () => void;
//   handleClose: () => void;
// }

// const FormAddTask: React.FC<FormAddTaskProps> = (props) => {
//   const { initialValues, createTask, masterStatus } = useAddTaskManagement();
//   return (
//     <div>
//       <div className="flex flex-col gap-4 mt-0">
//         <Formik
//           initialValues={initialValues}
//           onSubmit={(val) => {
//             props.handleClose();
//             confirmAPIForm({
//               callAPI: () => {
//                 createTask.mutateAsync(val);
//                 // .then(() => {
//                 //   val.name = "";
//                 //   val.description = "";
//                 //   val.targetDate = "";
//                 //   val.actualDate = "";
//                 //   val.taskStatusId = "";
//                 //   val.taskPriorityId = "";

//                 // });
//               },
//               onAlertSuccess() {
//                 props.handleSubmitted();
//               },
//             });
//           }}
//         >
//           {() => (
//             <Form>
//               <div className="flex flex-col gap-5">
//                 <TextInput
//                   name="name"
//                   label="Name"
//                   placeholder="input status name"
//                 />
//                 <TextInput
//                   name="description"
//                   label="Description"
//                   placeholder="input description"
//                 />
//                 <TextInput
//                   name="targetDate"
//                   label="Target Date"
//                   placeholder="input target date"
//                   type="date"
//                 />
//                 <TextInput
//                   name="actualDate"
//                   label="Actual Date"
//                   placeholder="input actual date"
//                   type="date"
//                 />
//                 <SelectInput
//                   name={"taskStatusId"}
//                   label="Status"
//                   options={[
//                     {
//                       label: "Select Status",
//                       value: "",
//                     },
//                     ...(masterStatus?.data || []).map(
//                       (item: { name: string; id: string }) => ({
//                         label: item.name,
//                         value: item.id,
//                       })
//                     ),
//                   ]}
//                 />
//                 {/* <SelectInput
//                   name={"taskPriorityId"}
//                   label="Priority"
//                   options={[
//                     {
//                       label: "Select Priority",
//                       value: "",
//                     },
//                     ...(masterPriority?.data || []).map(
//                       (item: { name: string; id: string }) => ({
//                         label: item.name,
//                         value: item.id,
//                       })
//                     ),
//                   ]}
//                 /> */}
//                 <div className="flex justify-end">
//                   <Button className="btn-primary mt-4 ">
//                     {createTask.isPending ? <Loaders size={1} /> : "Save"}
//                   </Button>
//                 </div>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default FormAddTask;
