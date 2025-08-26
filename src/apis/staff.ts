import api from './api';

// Staff 관련 API 함수들

// API 응답 타입 정의
export interface StudentAPIResponse {
  students: {
    student_id: string;
    gender: string;
    score: number;
    total_score: number;
    status: string;
    graduation_year: string;
    success_rate: number;
    total_applications: number;
    latest_success_date: string;
  }[];
  total_count: number;
}

// 학생 상세 정보 응답 타입 정의
export interface StudentDetailResponse {
  student: {
    student_id: string;
    gender: string;
    score: number;
    status: string;
    graduation_year: string;
    success_rate: number;
    total_applications: number;
    successful_applications: number;
    applications: {
      company_name: string;
      position: string;
      application_date: string;
      status: string;
      success: boolean;
    }[];
    target_company: string;
    target_job: string;
    target_region: string;
    specs: {
      skills: string[];
      projects: string[];
      activities: string[];
      certificates: string[];
    };
  };
}

// 기업 선호도 분포 응답 타입 정의
export interface CompanyPreferencesResponse {
  preferences: {
    company: string;
    count: number;
    percentage: number;
  }[];
  total_students: number;
}

// API 파라미터 타입 정의
export interface StudentAPIParams {
  grade?: number | null;
  sort_by?: string | null;
  sort_order?: string | null;
}

// 학생 목록 조회 API
export const fetchStudents = async (params: StudentAPIParams = {}): Promise<StudentAPIResponse> => {
  const queryParams = new URLSearchParams();

  if (params.grade !== undefined && params.grade !== null) {
    queryParams.append('grade', params.grade.toString());
  }
  if (params.sort_by !== undefined && params.sort_by !== null) {
    queryParams.append('sort_by', params.sort_by);
  }
  if (params.sort_order !== undefined && params.sort_order !== null) {
    queryParams.append('sort_order', params.sort_order);
  }

  const url = `/university-staff/students${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  const response = await api.get(url);
  return response.data;
};

// 학생 상세 정보 조회 API
export const fetchStudentDetail = async (studentId: string): Promise<StudentDetailResponse> => {
  const response = await api.get(`/university-staff/student/${studentId}`);
  return response.data;
};

// 기업 선호도 분포 조회 API
export const fetchCompanyPreferences = async (): Promise<CompanyPreferencesResponse> => {
  const response = await api.get(`/university-staff/company-preferences`);
  return response.data;
};
