import axiosInstance from './axiosInstance';
import type { HealthCheckResponse } from '../types/health';

// GET /health-check
export const healthCheck = async (): Promise<HealthCheckResponse> => {
  const response =
    await axiosInstance.get<HealthCheckResponse>('/health-check');
  return response.data;
};
