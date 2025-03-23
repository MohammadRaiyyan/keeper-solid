import { type CreateQueryResult, createQuery } from "@tanstack/solid-query";
import httpClient from "../api/httpClient";
import { queryKeys } from "../api/queryclient";
import UserService from "../services/user";
import type { ApiError, User } from "../types/common";

const UserServices = new UserService(httpClient);

export const useUser = (
  enabled: boolean,
): CreateQueryResult<User, ApiError> => {
  return createQuery(() => ({
    queryKey: [...queryKeys.user.getUser],
    queryFn: () => UserServices.getUser(),
    retry: false,
    enabled: enabled,
    // meta: {
    //     errorMessage: "F",
    // },
  }));
};
