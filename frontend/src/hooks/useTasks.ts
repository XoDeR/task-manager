import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import type { Task } from "../types";

export const useTasks = (sortBy: string = "desc", filter?: number) => {
  return useQuery<Task[]>({
    queryKey: ["tasks", { sortBy, filter }],
    queryFn: async () => {
      const { data } = await api.get("/tasks", {
        params: {
          sortBy,
          filter,
        },
      });
      return data.tasks;
    },
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTask: Partial<Task>) =>
      api.post("/tasks", newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedTask: Task) =>
      api.put(`/tasks/${updatedTask.id}`, updatedTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};