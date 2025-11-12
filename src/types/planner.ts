export type plannerFlameItem = {
  date: string;
  flame: boolean;
};

export type flameDateCardProps = {
  flames: plannerFlameItem[];
};

// API 응답 공통 타입
export interface ApiResponse<T> {
  status: number;
  code: string;
  message: string;
  data: T;
}

// 플래너 아이템 타입
export interface PlannerItem {
  plannerItemId: number;
  content: string;
  checked: boolean;
  duration: number;
}

// 플래너 데이터 타입
export interface PlannerData {
  plannerId: number;
  date: string;
  flame: boolean;
  feedback: 'GOOD' | 'NORMAL' | 'BAD';
  items: PlannerItem[];
  createdAt: string;
  updatedAt: string;
}

// GET /v1/planners 응답
export type GetPlannerResponse = ApiResponse<PlannerData>;

// POST /v1/planners 요청
export interface CreatePlannerRequest {
  date: string;
}

// POST /v1/planners 응답
export type CreatePlannerResponse = ApiResponse<PlannerData>;

// PATCH /v1/planners/{plannerId}/feedback 요청
export interface UpdatePlannerFeedbackRequest {
  feedback: 'GOOD' | 'NORMAL' | 'BAD';
}

// PATCH /v1/planners/{plannerId}/feedback 응답
export type UpdatePlannerFeedbackResponse = ApiResponse<string>;

// PATCH /v1/planners/item/{plannerItemId}/check 요청
export interface UpdatePlannerItemCheckRequest {
  checked: boolean;
}

// PATCH /v1/planners/item/{plannerItemId}/check 응답
export type UpdatePlannerItemCheckResponse = ApiResponse<string>;

// GET /v1/planners/flames 응답
export interface GetPlannerFlamesData {
  flames: plannerFlameItem[];
}
export type GetPlannerFlamesResponse = ApiResponse<GetPlannerFlamesData>;

// DELETE /v1/planners/{plannerId} 응답
export type DeletePlannerResponse = ApiResponse<string>;
