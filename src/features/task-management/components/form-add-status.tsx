import React, { useRef } from "react";
import { useTaskStatus } from "../hooks/useTaskStatus";
import { Form, Formik } from "formik";
import TextInput from "@/components/input/text-input";
import Loaders from "@/components/loading/loaders";

export interface FormAddStatusProps {
  lengthOfStatus: number;
  handleSubmitted: () => void;
}

const FormAddStatus: React.FC<FormAddStatusProps> = (props) => {
  const { initialValues, createTaskStatus } = useTaskStatus();
  const colorPicker = useRef<HTMLInputElement>(null);
  return (
    <div>
      <div className="flex flex-col gap-4 mt-0">
        <h1 className="font-semibold text-xl">Add Task Status</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(val) => {
            createTaskStatus
              .mutateAsync({
                name: val.name,
                description: val.description,
                sequence: props.lengthOfStatus.toString(),
                color: val.color,
              })
              .then(() => {
                // Reset the form after successful submission
                val.name = "";
                val.description = "";
                val.color = "#000000";

                props.handleSubmitted();
              });
          }}
        >
          {({ values }) => (
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
                <div>
                  <TextInput
                    name="color"
                    label="Color"
                    type="text"
                    prefix={
                      <div className="flex flex-row gap-2 items-center">
                        <div
                          className="w-5 h-5"
                          style={{ backgroundColor: values.color }}
                          onClick={() => {
                            if (colorPicker.current) {
                              colorPicker.current.click();
                            }
                          }}
                        ></div>
                      </div>
                    }
                  />
                  <TextInput
                    name="color"
                    type="color"
                    className="!p-0 opacity-0 !w-0 !h-0"
                    ref={colorPicker}
                  />
                </div>

                <div>
                  <button className="btn-primary mt-4 w-full">
                    {createTaskStatus.isPending ? <Loaders size={1} /> : "Save"}
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

export default FormAddStatus;
