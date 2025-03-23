import type { AxiosInstance } from "axios";
import { ConfigEndpoint } from "~/api/endpoints/config";
import type { BaseResponse } from "../types/common";
import type { BaseOptionType } from "../types/tasks";

class ConfigService {
    private httpClient: AxiosInstance;

    constructor(httpClient: AxiosInstance) {
        this.httpClient = httpClient;
    }
    async getStatus(): Promise<BaseResponse<BaseOptionType[]>> {
        const response = await this.httpClient.get(ConfigEndpoint.getStatus());
        return response.data;
    }
    async updateStatus(id: string, payload: Omit<BaseOptionType, "_id">): Promise<BaseResponse<BaseOptionType>> {
        const response = await this.httpClient.put(ConfigEndpoint.updateStatus(id), payload);
        return response.data;
    }
    async deleteStatus(id: string): Promise<void> {
        await this.httpClient.delete(ConfigEndpoint.deleteStatus(id));
    }

    async getPriority(): Promise<BaseResponse<BaseOptionType[]>> {
        const response = await this.httpClient.get(ConfigEndpoint.getPriority());
        return response.data;
    }

    async updatePriority(id: string, payload: Omit<BaseOptionType, "_id">): Promise<BaseResponse<BaseOptionType>> {
        const response = await this.httpClient.put(ConfigEndpoint.updatePriority(id), payload);
        return response.data;
    }

    async deletePriority(id: string): Promise<void> {
        await this.httpClient.delete(ConfigEndpoint.deletePriority(id));
    }

    async getTag(): Promise<BaseResponse<BaseOptionType[]>> {
        const response = await this.httpClient.get(ConfigEndpoint.getTag());
        return response.data;
    }

    async updateTag(id: string, payload: Omit<BaseOptionType, "_id">): Promise<BaseResponse<BaseOptionType>> {
        const response = await this.httpClient.put(ConfigEndpoint.updateTag(id), payload);
        return response.data;
    }

    async deleteTag(id: string): Promise<void> {
        await this.httpClient.delete(ConfigEndpoint.deleteTag(id));
    }
}

export default ConfigService;
