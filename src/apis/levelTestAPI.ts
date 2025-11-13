import axiosInstance from './axiosInstance';
import type {
  GetLevelTestsResponse,
  CreateLevelTestRequest,
  CreateLevelTestResponse,
  GradeLevelTestRequest,
  GradeLevelTestResponse,
  GetLevelTestDetailResponse,
} from '../types/levelTest';

// GET /v1/level-tests
export const getLevelTests = async (): Promise<GetLevelTestsResponse> => {
  const response =
    await axiosInstance.get<GetLevelTestsResponse>('/v1/level-tests');
  return response.data;
};

// POST /v1/level-tests
export const createLevelTest = async (
  request: CreateLevelTestRequest
): Promise<CreateLevelTestResponse> => {
  const response = await axiosInstance.post<CreateLevelTestResponse>(
    '/v1/level-tests',
    request
  );
  return response.data;
};

// POST /v1/level-tests/{levelTestId}/grade
export const gradeLevelTest = async (
  levelTestId: number,
  request: GradeLevelTestRequest
): Promise<GradeLevelTestResponse> => {
  const response = await axiosInstance.post<GradeLevelTestResponse>(
    `/v1/level-tests/${levelTestId}/grade`,
    request
  );
  return response.data;
};

// GET /v1/level-tests/{levelTestId}
export const getLevelTestDetail = async (
  levelTestId: number
): Promise<GetLevelTestDetailResponse> => {
  const response = await axiosInstance.get<GetLevelTestDetailResponse>(
    `/v1/level-tests/${levelTestId}`
  );
  return response.data;
};
