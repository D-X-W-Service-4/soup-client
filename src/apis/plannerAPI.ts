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
} from '../types/planner';

// GET /v1/planners?date={date}
export const getPlanner = async (date: string): Promise<GetPlannerResponse> => {
  const response = await axiosInstance.get<GetPlannerResponse>(
    `/v1/planners?date=${date}`
  );
  return response.data;
};

// POST /v1/planners
export const createPlanner = async (
  request: CreatePlannerRequest
): Promise<CreatePlannerResponse> => {
  const response = await axiosInstance.post<CreatePlannerResponse>(
    '/v1/planners',
    request
  );
  return response.data;
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
  const response = await axiosInstance.get<GetPlannerFlamesResponse>(
    `/v1/planners/flames?startDate=${startDate}&endDate=${endDate}`
  );
  return response.data;
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
