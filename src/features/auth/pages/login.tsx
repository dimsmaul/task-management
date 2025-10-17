import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignIn } from "../hooks/useLogin";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const SignInPages: React.FC = () => {
  const { form, handleSignIn } = useSignIn();

  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center">
      <Card className="w-[450px]">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((val) =>
                handleSignIn.mutateAsync(val)
              )}
              className="space-y-6"
            >
              <h1 className="text-4xl font-semibold">Sign In</h1>
              {form.formState.errors.root && (
                <div className="text-red-500 text-sm">
                  {form.formState.errors.root.message}
                </div>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="input email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="input password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Sign In
              </Button>
              <div>
                <p className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-support-100 underline">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPages;
