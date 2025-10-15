import axios from "axios";
import { useAuthStore } from "../stores/auth";

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE });

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

let refreshing: Promise<string | null> | null = null;

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const { logout, setTokens, refreshToken } = useAuthStore.getState();
    const status = error?.response?.status;
    if (status === 401 && refreshToken && !error.config.__isRetry) {
      if (!refreshing) {
        refreshing = api
          .post("/users/refresh-token", { refreshToken })
          .then((res) => res.data?.accessToken as string)
          .catch(() => null)
          .finally(() => (refreshing = null));
      }
      const newAccess = await refreshing;
      if (newAccess) {
        setTokens({ accessToken: newAccess, refreshToken });
        error.config.__isRetry = true;
        error.config.headers["Authorization"] = `Bearer ${newAccess}`;
        return api.request(error.config);
      } else {
        logout();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
