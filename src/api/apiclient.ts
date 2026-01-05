// src/api/apiClient.ts
import { useAuthStore } from '@/store/authStore';
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

// 공통 axios 인스턴스
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,

  withCredentials: true,
});

// 공통 요청 처리
axiosInstance.interceptors.request.use(
  (config) => {
    const { access_token } = useAuthStore.getState();

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 공통 응답 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // 인증 만료 등
    if (status === 401) {
      console.warn('인증이 필요합니다.');
    }

    return Promise.reject(error);
  }
);

// HTTP 메서드 래퍼
export const apiClient = {
  get: <T>(url: string, config?: Omit<AxiosRequestConfig, 'url'>) =>
    axiosInstance.get<T>(url, config).then((res) => res.data),

  post: <T>(
    url: string,
    data?: unknown,
    config?: Omit<AxiosRequestConfig, 'url' | 'data'>
  ) => axiosInstance.post<T>(url, data, config).then((res) => res.data),

  put: <T>(
    url: string,
    data?: unknown,
    config?: Omit<AxiosRequestConfig, 'url' | 'data'>
  ) => axiosInstance.put<T>(url, data, config).then((res) => res.data),

  patch: <T>(
    url: string,
    data?: unknown,
    config?: Omit<AxiosRequestConfig, 'url' | 'data'>
  ) => axiosInstance.put<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: Omit<AxiosRequestConfig, 'url'>) =>
    axiosInstance.delete<T>(url, config).then((res) => res.data),
} as const;
