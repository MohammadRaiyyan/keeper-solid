import { createMutation, createQuery } from "@tanstack/solid-query";
import httpClient from "../api/httpClient";
import { queryKeys } from "../api/queryclient";
import TasksService from "../services/tasks";
import type { Task, TaskPayload } from "../types/tasks";

const TasksServices = new TasksService(httpClient);

const useTasks = (params?: Record<string, string>) => {
  return createQuery(() => ({
    queryKey: [...queryKeys.tasks.all, params],
    queryFn: () => TasksServices.getAll(new URLSearchParams(params).toString()),
    meta: {
      errorMessage: "Failed to fetch tasks",
    },
  }));
};

const useTask = (id: string) => {
  return createQuery(() => ({
    queryKey: queryKeys.tasks.byId(id),
    queryFn: () => TasksServices.getById(id),
    meta: {
      errorMessage: "Failed to fetch task",
    },
  }));
};
const useSubTasks = (id: string) => {
  return createQuery(() => ({
    queryKey: queryKeys.tasks.subTasks(id),
    queryFn: () => TasksServices.getSubTasksById(id),
    meta: {
      errorMessage: "Failed to fetch sub tasks",
    },
  }));
};
const useCreateTask = () => {
  return createMutation(() => ({
    mutationFn: (data: TaskPayload) => TasksServices.create(data),
    meta: {
      errorMessage: "Failed to create task",
      successMessage: "Task created successfully",
      invalidateQueries: queryKeys.tasks.all,
    },
  }));
};

const useUpdateTask = (id: string, data: Partial<Task>) => {
  return createMutation(() => ({
    queryFn: () => TasksServices.update(id, data),
    meta: {
      errorMessage: "Failed to update task",
      successMessage: "Task updated successfully",
      invalidateQueries: [queryKeys.tasks.byId(id), queryKeys.tasks.all],
    },
  }));
};

const useDeleteTask = (id: string) => {
  return createMutation(() => ({
    queryFn: () => TasksServices.delete(id),
    meta: {
      errorMessage: "Failed to delete task",
      successMessage: "Task deleted successfully",
      invalidateQueries: queryKeys.tasks.all,
    },
  }));
};

export { useCreateTask, useDeleteTask, useSubTasks, useTask, useTasks, useUpdateTask };

