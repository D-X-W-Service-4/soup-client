// API 응답 공통 타입
export interface ApiResponse<T> {
  status: number;
  code: string;
  message: string;
  data: T;
}

// GET /health-check 응답
export type HealthCheckResponse = ApiResponse<string>;
