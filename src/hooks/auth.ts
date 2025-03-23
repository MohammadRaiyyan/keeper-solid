import { createMutation } from "@tanstack/solid-query";
import httpClient from "../api/httpClient";
import AuthServices from "../services/auth";
import type { LoginPayload, RegisterPayload } from "../types/auth";

const authServices = new AuthServices(httpClient);

const useLogin = () => {
  return createMutation(() => ({
    mutationFn: (data: LoginPayload) => authServices.login(data),
  }));
};

const useRegister = () => {
  return createMutation(() => ({
    mutationFn: (data: RegisterPayload) => authServices.register(data),
  }));
};

const useLogout = () => {
  return createMutation(() => ({
    mutationFn: () => authServices.logout(),
  }));
};

export { useLogin, useLogout, useRegister };
