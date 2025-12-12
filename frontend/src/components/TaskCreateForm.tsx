import { useForm } from "react-hook-form";
import { useCreateTask } from "../hooks/useTasks";
import { Button } from "./ui/button";

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
import { Textarea } from "@/components/ui/textarea";

interface Props {
  onSuccess: () => void;
}

const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters.",
    })
    .max(255, {
      message: "Title must be no longer than 256 characters.",
    }),
  description: z
    .string()
    .min(3, {
      message: "Description must be at least 3 characters.",
    })
    .max(1500, {
      message: "Description must not be longer than 1500 characters.",
    }),
});

const TaskCreateForm = ({ onSuccess }: Props) => {
  const createMutation = useCreateTask();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createMutation.mutate(data, {
      onSuccess: onSuccess,
    });
  };

  const isLoading = createMutation.isPending;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write task description..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline" size="sm" disabled={isLoading}>
          {isLoading ? "Saving..." : "Create Task"}
        </Button>
        {createMutation.isError && (
          <p>Error creating task: {createMutation.error.message}</p>
        )}
      </form>
    </Form>
  );
};

export default TaskCreateForm;
