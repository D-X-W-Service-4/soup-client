// API 응답 공통 타입
export interface ApiResponse<T> {
  status: number;
  code: string;
  message: string;
  data: T;
}

// GET /v1/files/presigned-url 응답 데이터
export interface FilePresignedUrlData {
  presignedUrl: string;
}

// GET /v1/files/presigned-url 응답
export type GetFilePresignedUrlResponse = ApiResponse<FilePresignedUrlData>;
