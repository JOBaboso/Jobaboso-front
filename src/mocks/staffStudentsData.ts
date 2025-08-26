export interface StudentSpec {
  id: string;
  gender: '남성' | '여성';
  gpa: number;
  acceptanceRate: number;
  totalApplications: number;
  acceptedApplications: number;
  status: string;
  graduationYear?: string; // 졸업 연도 (선택적)
  
  // 프로필 정보
  name: string;
  birthDate: string;
  phone: string;
  email: string;
  
  // 학력 정보
  education: {
    schoolName: string;
    major: string;
    admissionYear: string;
    status: string;
    score: string;
    graduationYear: string;
  };
  
  // 보유역량 정보
  certificates: Array<{
    certificate_date?: string;
    date?: string;
    cert_name?: string;
    name?: string;
    score?: string;
    issuer?: string;
  }>;
  activities: Array<{
    activity_date?: string;
    title?: string;
    type?: string;
  }>;
  projects: Array<{
    start_date?: string;
    end_date?: string;
    period?: string;
    project_name?: string;
    name?: string;
    description?: string;
  }>;
  skills: string[];
}

// Mock 데이터 추가
export const mockStudents: StudentSpec[] = [
  {
    id: "student_001",
    gender: "남성",
    gpa: 4.2,
    acceptanceRate: 85.5,
    totalApplications: 12,
    acceptedApplications: 10,
    status: "졸업",
    graduationYear: "2024-02",
    
    // 프로필 정보
    name: "김철수",
    birthDate: "2000년 3월 15일",
    phone: "010-1234-5678",
    email: "kim@example.com",
    
    education: {
      schoolName: "서울대학교",
      major: "컴퓨터공학과",
      admissionYear: "2020년 3월",
      status: "졸업",
      score: "4.2/4.5",
      graduationYear: "2024년 2월"
    },
    
    // 보유역량 정보
    certificates: [
      { name: "정보처리기사", date: "2023년 6월", issuer: "한국산업인력공단" },
      { name: "SQLD", date: "2023년 3월", issuer: "한국데이터산업진흥원" }
    ],
    activities: [
      { title: "삼성전자 인턴", type: "intern", activity_date: "2023년 7월" },
      { title: "알고리즘 동아리", type: "club", activity_date: "2022년 3월" }
    ],
    projects: [
      { name: "웹 포트폴리오", period: "2023년 9월 ~ 12월", description: "React 기반 개인 포트폴리오 웹사이트" },
      { name: "쇼핑몰 API", period: "2023년 3월 ~ 6월", description: "Spring Boot 기반 쇼핑몰 백엔드 API" }
    ],
    skills: ["Java", "Spring Boot", "React", "TypeScript", "MySQL", "Docker"]
  },
  {
    id: "student_002",
    gender: "여성",
    gpa: 3.8,
    acceptanceRate: 72.3,
    totalApplications: 8,
    acceptedApplications: 6,
    status: "재학",
    
    // 프로필 정보
    name: "이영희",
    birthDate: "2001년 7월 22일",
    phone: "010-9876-5432",
    email: "lee@example.com",
    
    education: {
      schoolName: "연세대학교",
      major: "전자공학과",
      admissionYear: "2021년 3월",
      status: "재학",
      score: "3.8/4.5",
      graduationYear: "2025년 2월"
    },
    
    // 보유역량 정보
    certificates: [
      { name: "전자기기기사", date: "2023년 12월", issuer: "한국산업인력공단" }
    ],
    activities: [
      { title: "LG전자 인턴", type: "intern", activity_date: "2023년 12월" },
      { title: "로봇공학 대회", type: "contest", activity_date: "2023년 9월" }
    ],
    projects: [
      { name: "IoT 스마트홈", period: "2023년 6월 ~ 9월", description: "Arduino 기반 IoT 스마트홈 시스템" }
    ],
    skills: ["C++", "Python", "Arduino", "IoT", "Circuit Design"]
  }
];
