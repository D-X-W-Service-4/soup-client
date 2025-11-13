// GET /v1/questions
import axiosInstance from './axiosInstance.ts';
import type {
  GetQuestionsParams,
  GetQuestionsResponse,
} from '../types/question.ts';
import type {
  CreateQuestionSetResponse,
  GetQuestionSetDetailResponse,
} from '../types/questionSet.ts';

export const getReviewQuestions = async (
  params: GetQuestionsParams
): Promise<GetQuestionsResponse> => {
  const response = await axiosInstance.get<GetQuestionsResponse>(
    '/v1/questions',
    { params }
  );
  return response.data;
};

// POST /v1/question-sets
export const createQuestionSet = async (
  questionIds: string[]
): Promise<CreateQuestionSetResponse> => {
  const response = await axiosInstance.post<CreateQuestionSetResponse>(
    '/v1/question-sets',
    { questionIds }
  );
  return response.data;
};

// GET /v1/question-sets/{questionSetId}
export const getQuestionSetDetail = async (
  questionSetId: number
): Promise<GetQuestionSetDetailResponse> => {
  const response = await axiosInstance.get<GetQuestionSetDetailResponse>(
    `/v1/question-sets/${questionSetId}`
  );
  return response.data;
};
