import type { AxiosInstance } from "axios";
import { InsightEndpoints } from "../api/endpoints/insights";
import type { BaseResponse } from "../types/common";
import type { Insight } from "../types/tasks";

class InsightsService {
  private httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }
  async getInsights(): Promise<BaseResponse<Insight>> {
    const response = await this.httpClient.get(InsightEndpoints.insights());
    return response.data;
  }
}

export default InsightsService;
