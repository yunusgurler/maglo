import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../lib/axios";
import { useAuthStore } from "../../stores/auth";

export const useLogin = () =>
  useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const { data } = await api.post("/users/login", payload);
      return data as { accessToken: string; refreshToken: string };
    },
  });

export const useRegister = () =>
  useMutation({
    mutationFn: async (payload: {
      name: string;
      email: string;
      password: string;
    }) => {
      const { data } = await api.post("/users/register", payload);
      return data as { accessToken: string; refreshToken: string };
    },
  });

export const useProfile = () => {
  const enabled = !!useAuthStore((s) => s.accessToken);
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => (await api.get("/users/profile")).data,
    enabled,
  });
};
