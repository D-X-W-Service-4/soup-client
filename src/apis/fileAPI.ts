import axiosInstance from './axiosInstance';
import type { GetFilePresignedUrlResponse } from '../types/file';

/**
 * 파일 업로드를 위한 presigned URL 생성
 * GET /v1/files/presigned-url?fileName={fileName}&contentType={contentType}
 */
export const generatePresignedUrl = async (
  fileName: string,
  contentType: string
): Promise<GetFilePresignedUrlResponse> => {
  const response = await axiosInstance.get<GetFilePresignedUrlResponse>(
    `/v1/files/presigned-url`,
    {
      params: {
        fileName,
        contentType,
      },
    }
  );
  return response.data;
};
