import { createQuery } from "@tanstack/solid-query";
import httpClient from "../api/httpClient";
import { queryKeys } from "../api/queryclient";
import InsightsService from "../services/insights";

const InsightsServices = new InsightsService(httpClient);

export const useInsights = () => {
  return createQuery(() => ({
    queryKey: queryKeys.insights.insights,
    queryFn: () => InsightsServices.getInsights(),
    retry: false,
  }));
};
