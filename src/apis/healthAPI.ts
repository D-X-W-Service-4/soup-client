import axiosInstance from './axiosInstance';
import type { HealthCheckResponse } from '../types/health';

// GET /health-check
export const healthCheck = async (): Promise<HealthCheckResponse> => {
  const response =
    await axiosInstance.get<HealthCheckResponse>('/health-check');
  return response.data;

  // 목 데이터
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       status: 200,
  //       code: 'SUCCESS',
  //       message: '요청에 성공했습니다.',
  //       data: 'string',
  //     });
  //   }, 300);
  // });
};
