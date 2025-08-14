import api from './api';

export interface Application {
  id: number;
  user_id: string;
  company_name: string;
  position: string;
  application_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ApplicationDetail extends Application {
  documents: any[];
  schedules: any[];
}

export interface CreateApplicationRequest {
  company_name: string;
  position: string;
  application_date: string;
}

// 지원서 생성
export const createApplication = async (data: CreateApplicationRequest): Promise<Application> => {
  const response = await api.post('/applications', data);
  return response.data;
};

// 지원서 상세 조회
export const getApplication = async (id: number): Promise<ApplicationDetail> => {
  const response = await api.get(`/applications/${id}`);
  return response.data;
};
