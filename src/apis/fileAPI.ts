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
  try {
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
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.warn('⚠️ API 엔드포인트가 준비되지 않아 목 데이터를 사용합니다.');
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Presigned URL 생성:', fileName, contentType);
          resolve({
            status: 200,
            code: 'SUCCESS',
            message: '요청에 성공했습니다.',
            data: {
              presignedUrl: `https://example-bucket.s3.amazonaws.com/uploads/${fileName}?X-Amz-Algorithm=...`,
            },
          });
        }, 300);
      });
    }
    throw error;
  }
};
