import axiosInstance from './axiosInstance';
import type {
  GetQuestionsParams,
  GetQuestionsResponse,
  ApiResponse,
} from '../types/question';

// GET /v1/questions - 사용자가 풀었던 문제 전체 조회
export const getQuestions = async (
  params?: GetQuestionsParams
): Promise<GetQuestionsResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.filter) queryParams.append('filter', params.filter);
  if (params?.grade) queryParams.append('grade', params.grade);
  if (params?.term) queryParams.append('term', params.term.toString());
  if (params?.subjectUnitId)
    queryParams.append('subjectUnitId', params.subjectUnitId.toString());

  const url = `/v1/questions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const response = await axiosInstance.get<GetQuestionsResponse>(url);
  return response.data;
};

// PATCH /v1/questions/{questionId}/star - 문제 별표 표시하기
export const toggleQuestionStar = async (
  questionId: string
): Promise<ApiResponse<object>> => {
  const response = await axiosInstance.patch<ApiResponse<object>>(
    `/v1/questions/${questionId}/star`
  );
  return response.data;
};
