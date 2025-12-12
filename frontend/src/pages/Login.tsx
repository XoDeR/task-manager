import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

const Login = () => {
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.email({
      message: "Invalid email address",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    loginMutation.mutate(data, {
      onSuccess: () => navigate("/"),
    });
  };

  const isLoading = loginMutation.isPending;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="text-4xl font-medium p-6">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center justify-end mb-8">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-base border-none underline"
            >
              <Link to="/register">Register</Link>
            </Button>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email..." {...field} />
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
                  <Input placeholder="Password..." {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="outline"
            size="sm"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Login"}
          </Button>
          {loginMutation.isError && <p>Error: {loginMutation.error.message}</p>}
        </form>
      </Form>
    </div>
  )
}

export default Login;