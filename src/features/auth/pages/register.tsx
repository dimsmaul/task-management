import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegisterPages = () => {
  const { form, handleSubmit } = useRegister();
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <>
        <Card className="w-[450px]">
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((e) => handleSubmit.mutateAsync(e))}
                className="space-y-6"
              >
                <h1 className="text-4xl font-semibold">Sign Up</h1>
                {form.formState.errors.root && (
                  <div className="text-red-500 text-sm">
                    {form.formState.errors.root.message}
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="input name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                    Already have an account?{" "}
                    <Link to="/login" className="text-support-100 underline">
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </>
    </div>
  );
};

export default RegisterPages;
