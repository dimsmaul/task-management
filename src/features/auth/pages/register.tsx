import React from "react";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import Loaders from "@/components/loading/loaders";
import { useRegister } from "../hooks/useRegister";
import { Form, Formik, FormikValues } from "formik";
import TextInput from "@/components/input/text-input";
import { mdiEyeOffOutline, mdiEyeOutline } from "@mdi/js";
import { LoginValidationSchema } from "../validation/login-validation";

const RegisterPages = () => {
  const { initialValues, handleSubmit } = useRegister();
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="md:w-[30vw] sm:w-[50vw] w-[95vw] border-[1px] rounded-xl border-support-200/30 text-support-100 p-5">
        <Formik
          initialValues={initialValues}
          onSubmit={(values: FormikValues) => {
            handleSubmit.mutateAsync({
              name: values.name,
              email: values.email,
              password: values.password,
            });
          }}
          validationSchema={LoginValidationSchema}
        >
          {() => (
            <Form>
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-semibold">Register</h1>
                </div>
                <div className="flex flex-col gap-4">
                  <TextInput
                    type={"text"}
                    name="name"
                    placeholder="Input Name"
                  />
                  <TextInput
                    type={"email"}
                    name="email"
                    placeholder="Input Email"
                  />

                  <TextInput
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Input Password"
                    suffix={
                      <button
                        type="button"
                        className="cursor-pointer flex items-center justify-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon
                          path={showPassword ? mdiEyeOffOutline : mdiEyeOutline}
                          size={1}
                          color={"var(--color-support-100)"}
                        />
                      </button>
                    }
                  />

                  <div>
                    {!handleSubmit.isPending ? (
                      <button className="btn-primary w-full">Register</button>
                    ) : (
                      <div className="btn-primary w-full cursor-not-allowed">
                        <Loaders size={1} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-center text-sm">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-support-100 underline"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPages;
