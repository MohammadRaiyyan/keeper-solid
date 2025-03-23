import type { AxiosInstance } from "axios";
import { AuthEndpoint } from "../api/endpoints/auth";
import type { LoginPayload, RegisterPayload } from "../types/auth";
import type { BaseResponse } from "../types/common";

class AuthServices {
  private httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }
  async login(data: LoginPayload): Promise<BaseResponse<null>> {
    const response = await this.httpClient.post(AuthEndpoint.login(), data);
    return response.data;
  }
  async register(data: RegisterPayload): Promise<BaseResponse<null>> {
    const response = await this.httpClient.post(AuthEndpoint.register(), data);
    return response.data;
  }
  async logout(): Promise<BaseResponse<null>> {
    const response = await this.httpClient.post(AuthEndpoint.logout());
    return response.data;
  }
}

export default AuthServices;
