export const TasksEndpoint = {
  getAll: (params?: string) => `/tasks?${params}`,
  getInsight: () => "/insights",
  getById: (id: string) => `tasks/${id}`,
  create: () => "tasks",
  update: (id: string) => `tasks/${id}`,
  delete: (id: string) => `tasks/${id}`,
  subTasks: (parentId: string) => `tasks/${parentId}/subtasks`
};
