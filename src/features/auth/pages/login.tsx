import TextInput from "@/components/input/text-input";
import { Form, Formik, FormikValues } from "formik";
import React from "react";
import { useLogin } from "../hooks/useLogin";
import Icon from "@mdi/react";
import { mdiEyeOffOutline, mdiEyeOutline } from "@mdi/js";
import { LoginValidationSchema } from "../validation/login-validation";
import Loaders from "@/components/loading/loaders";
import { Link } from "react-router-dom";

const LoginPages = () => {
  const { initialValues, handleSubmit } = useLogin();
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="md:w-[30vw] sm:w-[50vw] w-[90vw] border-[1px] rounded-xl border-support-200/30 bg-primary-100 text-support-100 p-5 ">
        <Formik
          initialValues={initialValues}
          onSubmit={(values: FormikValues) => {
            handleSubmit.mutateAsync({
              email: values.email,
              password: values.password,
            });
          }}
          validationSchema={LoginValidationSchema}
        >
          {() => (
            <Form>
              <div className="flex flex-col gap-7">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-semibold">Login</h1>
                </div>
                <div className="flex flex-col gap-5">
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
                      <button className="btn-primary w-full">Login</button>
                    ) : (
                      <div className="btn-primary w-full cursor-not-allowed">
                        <Loaders size={1} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-center text-sm">
                      Don't have an account?{" "}
                      <Link
                        to="/register"
                        className="text-support-100 underline"
                      >
                        Register
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

export default LoginPages;
