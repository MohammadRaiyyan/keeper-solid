import type { AxiosInstance } from "axios";
import { TasksEndpoint } from "../api/endpoints/tasks";
import type { BaseResponse, PaginatedResponse } from "../types/common";
import type { Task, TaskPayload } from "../types/tasks";

class TasksService {
  private httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async getAll(params: string): Promise<PaginatedResponse<Task>> {
    const response = await this.httpClient.get(TasksEndpoint.getAll(params));
    return response.data;
  }
  async getById(id: string): Promise<BaseResponse<Task>> {
    const response = await this.httpClient.get(TasksEndpoint.getById(id));
    return response.data;
  }
  async getSubTasksById(id: string): Promise<BaseResponse<Task[]>> {
    const response = await this.httpClient.get(TasksEndpoint.subTasks(id));
    return response.data;
  }
  async create(
    data: TaskPayload,
  ): Promise<Task> {
    const response = await this.httpClient.post(TasksEndpoint.create(), data);
    return response.data;
  }
  async update(id: string, data: Partial<Task>): Promise<Task> {
    const response = await this.httpClient.put(TasksEndpoint.update(id), data);
    return response.data;
  }
  async delete(id: string): Promise<void> {
    await this.httpClient.delete(TasksEndpoint.delete(id));
  }
}

export default TasksService;
