import axiosInstance from './axiosInstance';
import type {
  GetPlannerResponse,
  CreatePlannerRequest,
  CreatePlannerResponse,
  UpdatePlannerFeedbackRequest,
  UpdatePlannerFeedbackResponse,
  UpdatePlannerItemCheckRequest,
  UpdatePlannerItemCheckResponse,
  GetPlannerFlamesResponse,
  DeletePlannerResponse,
  PlannerData,
} from '../types/planner';

// 목 데이터 생성 함수
const createMockPlannerData = (): PlannerData => {
  const today = new Date().toISOString().split('T')[0];
  return {
    plannerId: 55,
    date: today,
    flame: false,
    feedback: 'NEUTRAL',
    items: [
      {
        plannerItemId: 101,
        content: '알고리즘 문제 2개 풀기',
        checked: false,
        duration: 1.5,
      },
      {
        plannerItemId: 102,
        content: '자료구조 복습 - 스택, 큐',
        checked: false,
        duration: 2.0,
      },
      {
        plannerItemId: 103,
        content: '데이터베이스 과제 제출',
        checked: false,
        duration: 1.0,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

// GET /v1/planners?date={date}
export const getPlanner = async (date: string): Promise<GetPlannerResponse> => {
  try {
    const response = await axiosInstance.get<GetPlannerResponse>(
      `/v1/planners?date=${date}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.log(`ℹ️ ${date} 날짜의 플래너가 없습니다.`);
      throw error;
    }

    console.warn('⚠️ 플래너 조회 API 오류로 목 데이터를 사용합니다.');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 200,
          code: 'SUCCESS',
          message: '요청에 성공했습니다.',
          data: createMockPlannerData(),
        });
      }, 300);
    });
  }
};

// POST /v1/planners
export const createPlanner = async (
  request: CreatePlannerRequest
): Promise<CreatePlannerResponse> => {
  try {
    const response = await axiosInstance.post<CreatePlannerResponse>(
      '/v1/planners',
      request
    );
    return response.data;
  } catch (error: any) {
    // Network Error, 500, 404 에러 등 모든 에러 시 목 데이터 사용 (개발 중)
    console.warn(
      '플래너 생성 API 오류로 목 데이터를 사용합니다.',
      error.message || error.response?.data
    );
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('플래너 생성 (목 데이터):', request);
        resolve({
          status: 200,
          code: 'SUCCESS',
          message: '요청에 성공했습니다.',
          data: createMockPlannerData(),
        });
      }, 300);
    });
  }
};

// PATCH /v1/planners/{plannerId}/feedback
export const updatePlannerFeedback = async (
  plannerId: number,
  request: UpdatePlannerFeedbackRequest
): Promise<UpdatePlannerFeedbackResponse> => {
  const response = await axiosInstance.patch<UpdatePlannerFeedbackResponse>(
    `/v1/planners/${plannerId}/feedback`,
    request
  );
  return response.data;
};

// PATCH /v1/planners/items/{plannerItemId}/check
export const updatePlannerItemCheck = async (
  plannerItemId: number,
  request: UpdatePlannerItemCheckRequest
): Promise<UpdatePlannerItemCheckResponse> => {
  const response = await axiosInstance.patch<UpdatePlannerItemCheckResponse>(
    `/v1/planners/items/${plannerItemId}/check`,
    request
  );
  return response.data;
};

// GET /v1/planners/flames?startDate={startDate}&endDate={endDate}
export const getPlannerFlames = async (
  startDate: string,
  endDate: string
): Promise<GetPlannerFlamesResponse> => {
  try {
    const response = await axiosInstance.get<GetPlannerFlamesResponse>(
      `/v1/planners/flames?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  } catch (error: any) {
    // 404 에러나 500 에러 시 목 데이터 사용
    if (error.response?.status === 404 || error.response?.status === 500) {
      console.warn('⚠️ 플래너 불꽃 API 오류로 목 데이터를 사용합니다.');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: 200,
            code: 'SUCCESS',
            message: '요청에 성공했습니다.',
            data: {
              flames: [
                { date: startDate, flame: true },
                { date: endDate, flame: false },
              ],
            },
          });
        }, 300);
      });
    }
    throw error;
  }
};

// DELETE /v1/planners/{plannerId}
export const deletePlanner = async (
  plannerId: number
): Promise<DeletePlannerResponse> => {
  const response = await axiosInstance.delete<DeletePlannerResponse>(
    `/v1/planners/${plannerId}`
  );
  return response.data;
};
