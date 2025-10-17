import React from "react";
import { Form, Formik } from "formik";
import TextInput from "@/components/input/text-input";
import Loaders from "@/components/loading/loaders";
import SelectInput from "@/components/input/select-input";
import { useEditTaskManagement } from "../hooks/useEditTaskManagement";

export interface FormEditTaskProps {
  id: string;
  handleSubmitted: () => void;
}

const FormEditTask: React.FC<FormEditTaskProps> = (props) => {
  const { initialValues, updateTask, masterPriority, masterStatus } =
    useEditTaskManagement({
      taskId: props.id,
    });
  return (
    <div>
      <div className="flex flex-col gap-4 mt-0">
        <Formik
          initialValues={initialValues}
          onSubmit={(val) => {
            updateTask.mutateAsync(val).then(() => {
              val.name = "";
              val.description = "";
              val.targetDate = "";
              val.actualDate = "";
              val.taskStatusId = "";
              val.taskPriorityId = "";

              props.handleSubmitted();
            });
          }}
        >
          {() => (
            <Form>
              <div className="flex flex-col gap-5">
                <TextInput
                  name="name"
                  label="Name"
                  placeholder="input status name"
                />
                <TextInput
                  name="description"
                  label="Description"
                  placeholder="input description"
                />
                <TextInput
                  name="targetDate"
                  label="Target Date"
                  placeholder="input target date"
                  type="date"
                />
                <TextInput
                  name="actualDate"
                  label="Actual Date"
                  placeholder="input actual date"
                  type="date"
                />
                <SelectInput
                  name={"taskStatusId"}
                  label="Status"
                  options={[
                    {
                      label: "Select Status",
                      value: "",
                    },
                    ...(masterStatus?.data || []).map(
                      (item: { name: string; id: string }) => ({
                        label: item.name,
                        value: item.id,
                      })
                    ),
                  ]}
                />
                <SelectInput
                  name={"taskPriorityId"}
                  label="Priority"
                  options={[
                    {
                      label: "Select Priority",
                      value: "",
                    },
                    ...(masterPriority?.data || []).map(
                      (item: { name: string; id: string }) => ({
                        label: item.name,
                        value: item.id,
                      })
                    ),
                  ]}
                />
                <div>
                  <button className="btn-primary mt-4 w-full">
                    {updateTask.isPending ? <Loaders size={1} /> : "Save"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormEditTask;
