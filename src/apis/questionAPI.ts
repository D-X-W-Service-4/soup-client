import axiosInstance from './axiosInstance';
import type {
  GetQuestionsParams,
  GetQuestionsResponse,
  UserQuestionDto,
  QuestionDto,
  SubjectUnitDto,
} from '../types/question';

// 목 데이터 생성 함수
const createMockUserQuestionData = (): UserQuestionDto[] => {
  const mockSubjectUnit: SubjectUnitDto = {
    subjectUnitId: 1,
    grade: 'M1',
    term: 1,
    unitName: '자연수의 혼합 계산',
  };

  const mockQuestion: QuestionDto = {
    questionId: 1,
    subjectUnit: mockSubjectUnit,
    questionImagePath: '/images/questions/q1.png',
    solutionImagePath: '/images/solutions/s1.png',
  };

  return [
    {
      userQuestionId: 101,
      question: mockQuestion,
      answeredWrongBefore: true,
      isStarred: false,
      tryCount: 2,
    },
    {
      userQuestionId: 102,
      question: {
        ...mockQuestion,
        questionId: 2,
        questionImagePath: '/images/questions/q2.png',
        solutionImagePath: '/images/solutions/s2.png',
      },
      answeredWrongBefore: false,
      isStarred: true,
      tryCount: 1,
    },
  ];
};

// GET /v1/questions
export const getQuestions = async (
  params?: GetQuestionsParams
): Promise<GetQuestionsResponse> => {
  // 목 데이터
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('문제 목록 조회:', params);
      resolve({
        status: 200,
        code: 'SUCCESS',
        message: '요청에 성공했습니다.',
        data: {
          userQuestions: createMockUserQuestionData(),
        },
      });
    }, 500);
  });

  // 실제 API 연결 시
  // const queryParams = new URLSearchParams();
  // if (params?.filter) queryParams.append('filter', params.filter);
  // if (params?.grade) queryParams.append('grade', params.grade);
  // if (params?.term) queryParams.append('term', params.term.toString());
  // if (params?.subjectUnitId) queryParams.append('subjectUnitId', params.subjectUnitId.toString());
  //
  // const response = await axiosInstance.get<GetQuestionsResponse>(
  //   `/v1/questions?${queryParams.toString()}`
  // );
  // return response.data;
};
