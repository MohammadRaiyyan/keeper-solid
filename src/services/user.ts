import type { AxiosInstance } from "axios";
import { UserEndpoint } from "../api/endpoints/user";
import type { User } from "../types/common";

class UserService {
  private httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }
  async getUser(): Promise<User> {
    const response = await this.httpClient.get(UserEndpoint.getUser());
    return response.data;
  }
}

export default UserService;
