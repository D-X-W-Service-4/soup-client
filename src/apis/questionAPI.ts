import axiosInstance from './axiosInstance';
import type {
  GetQuestionsParams,
  GetQuestionsResponse,
  UserQuestionDto,
} from '../types/question';

// 목 데이터 생성 함수
const createMockUserQuestionData = (): UserQuestionDto[] => {
  return [
    {
      userQuestionId: 101,
      question: { questionId: 'M1_1_01_00041_42236' },
      answeredWrongBefore: true,
      isStarred: false,
      tryCount: 2,
    },
    {
      userQuestionId: 102,
      question: { questionId: 'M1_1_01_00042_42237' },
      answeredWrongBefore: false,
      isStarred: true,
      tryCount: 1,
    },
  ];
};

// GET /v1/questions - 사용자가 풀었던 문제 전체 조회
export const getQuestions = async (
  params?: GetQuestionsParams
): Promise<GetQuestionsResponse> => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.filter) queryParams.append('filter', params.filter);
    if (params?.grade) queryParams.append('grade', params.grade);
    if (params?.term) queryParams.append('term', params.term.toString());
    if (params?.subjectUnitId)
      queryParams.append('subjectUnitId', params.subjectUnitId.toString());

    const url = `/v1/questions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await axiosInstance.get<GetQuestionsResponse>(url);
    return response.data;
  } catch (error: any) {
    // 404 에러 시 목 데이터 사용
    if (error.response?.status === 404) {
      console.warn('⚠️ API 엔드포인트가 준비되지 않아 목 데이터를 사용합니다.');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: 200,
            code: 'SUCCESS',
            message: '요청에 성공했습니다.',
            data: {
              questions: createMockUserQuestionData(),
            },
          });
        }, 300);
      });
    }
    throw error;
  }
};
