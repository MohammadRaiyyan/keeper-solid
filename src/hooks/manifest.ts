import { createQuery } from "@tanstack/solid-query";
import httpClient from "../api/httpClient";
import { queryKeys } from "../api/queryclient";
import ManifestServices from "../services/manifest";

const manifestServices = new ManifestServices(httpClient);

const useManifest = (enabled: boolean) => {
  return createQuery(() => ({
    queryFn: () => manifestServices.getManifest(),
    queryKey: queryKeys.manifest.getManifest,
    retry: false,
    enabled: enabled,
    refetchInterval: 15 * 60 * 1000,
    refetchOnWindowFocus: true,
  }));
};

export default useManifest;
