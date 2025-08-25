export interface StudentSpec {
  id: string;
  gender: '남성' | '여성';
  gpa: number;
  acceptanceRate: number;
  totalApplications: number;
  acceptedApplications: number;
  status: string;
}

export const staffStudentsData: StudentSpec[] = [
  {
    id: '1',
    gender: '여성',
    gpa: 3.92,
    acceptanceRate: 90,
    totalApplications: 10,
    acceptedApplications: 9,
    status: '2025년 8월 졸업',
  },
  {
    id: '2',
    gender: '여성',
    gpa: 3.92,
    acceptanceRate: 90,
    totalApplications: 10,
    acceptedApplications: 9,
    status: '2025년 8월 졸업',
  },
  {
    id: '3',
    gender: '여성',
    gpa: 3.92,
    acceptanceRate: 90,
    totalApplications: 10,
    acceptedApplications: 9,
    status: '2025년 8월 졸업',
  },
  {
    id: '4',
    gender: '여성',
    gpa: 3.92,
    acceptanceRate: 90,
    totalApplications: 10,
    acceptedApplications: 9,
    status: '2025년 8월 졸업',
  },
  {
    id: '5',
    gender: '여성',
    gpa: 3.92,
    acceptanceRate: 90,
    totalApplications: 10,
    acceptedApplications: 9,
    status: '2025년 8월 졸업',
  },
];
