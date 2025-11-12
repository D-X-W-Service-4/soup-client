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
    flame: true,
    feedback: 'GOOD',
    items: [
      {
        plannerItemId: 101,
        content: '알고리즘 문제 2개 풀기',
        checked: true,
        duration: 1.5,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

// GET /v1/planners?date={date}
export const getPlanner = async (date: string): Promise<GetPlannerResponse> => {
  // 목 데이터
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        code: 'SUCCESS',
        message: '요청에 성공했습니다.',
        data: createMockPlannerData(),
      });
    }, 500);
  });

  // 실제 API 연결 시
  // const response = await axiosInstance.get<GetPlannerResponse>(
  //   `/v1/planners?date=${date}`
  // );
  // return response.data;
};

// POST /v1/planners
export const createPlanner = async (
  request: CreatePlannerRequest
): Promise<CreatePlannerResponse> => {
  // 목 데이터
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('플래너 생성:', request);
      resolve({
        status: 200,
        code: 'SUCCESS',
        message: '요청에 성공했습니다.',
        data: createMockPlannerData(),
      });
    }, 500);
  });

  // 실제 API 연결 시
  // const response = await axiosInstance.post<CreatePlannerResponse>(
  //   '/v1/planners',
  //   request
  // );
  // return response.data;
};

// PATCH /v1/planners/{plannerId}/feedback
export const updatePlannerFeedback = async (
  plannerId: number,
  request: UpdatePlannerFeedbackRequest
): Promise<UpdatePlannerFeedbackResponse> => {
  // 목 데이터
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('플래너 피드백 업데이트:', plannerId, request);
      resolve({
        status: 200,
        code: 'SUCCESS',
        message: '요청에 성공했습니다.',
        data: 'string',
      });
    }, 300);
  });

  // 실제 API 연결 시
  // const response = await axiosInstance.patch<UpdatePlannerFeedbackResponse>(
  //   `/v1/planners/${plannerId}/feedback`,
  //   request
  // );
  // return response.data;
};

// PATCH /v1/planners/items/{plannerItemId}/check
export const updatePlannerItemCheck = async (
  plannerItemId: number,
  request: UpdatePlannerItemCheckRequest
): Promise<UpdatePlannerItemCheckResponse> => {
  // 목 데이터
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('플래너 아이템 체크 업데이트:', plannerItemId, request);
      resolve({
        status: 200,
        code: 'SUCCESS',
        message: '요청에 성공했습니다.',
        data: 'string',
      });
    }, 300);
  });

  // 실제 API 연결 시
  // const response = await axiosInstance.patch<UpdatePlannerItemCheckResponse>(
  //   `/v1/planners/items/${plannerItemId}/check`,
  //   request
  // );
  // return response.data;
};

// GET /v1/planners/flames?startDate={startDate}&endDate={endDate}
export const getPlannerFlames = async (
  startDate: string,
  endDate: string
): Promise<GetPlannerFlamesResponse> => {
  // 목 데이터
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        code: 'SUCCESS',
        message: '요청에 성공했습니다.',
        data: {
          flames: [
            {
              date: '2025-11-10',
              flame: true,
            },
            {
              date: '2025-11-09',
              flame: true,
            },
            {
              date: '2025-11-08',
              flame: false,
            },
          ],
        },
      });
    }, 500);
  });

  // 실제 API 연결 시
  // const response = await axiosInstance.get<GetPlannerFlamesResponse>(
  //   `/v1/planners/flames?startDate=${startDate}&endDate=${endDate}`
  // );
  // return response.data;
};

// DELETE /v1/planners/{plannerId}
export const deletePlanner = async (
  plannerId: number
): Promise<DeletePlannerResponse> => {
  // 목 데이터
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('플래너 삭제:', plannerId);
      resolve({
        status: 200,
        code: 'SUCCESS',
        message: '요청에 성공했습니다.',
        data: 'string',
      });
    }, 300);
  });

  // 실제 API 연결 시
  // const response = await axiosInstance.delete<DeletePlannerResponse>(
  //   `/v1/planners/${plannerId}`
  // );
  // return response.data;
};
