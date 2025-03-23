import type { AxiosInstance } from "axios";
import { ManifestEndpoint } from "../api/endpoints/manifest";
import type { BaseResponse, Manifest } from "../types/common";

class ManifestServices {
  private httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }
  async getManifest(): Promise<BaseResponse<Manifest>> {
    const response = await this.httpClient.get(ManifestEndpoint.getManifest());
    return response.data;
  }
}

export default ManifestServices;
