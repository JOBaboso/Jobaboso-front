import { Content } from '../type/common';

export type CompanyContent = Content;

export const mockCompanyContents: CompanyContent[] = [
  {
    id: 'company_1',
    title: '부산다이나믹스 블로그 오픈! 우리의 여정을 시작하며',
    content: `안녕하세요, 부산다이나믹스입니다. 🎉  
오늘은 저희 회사 공식 블로그를 오픈하며 첫 글을 남깁니다.  

우리는 "기술로 세상을 더 다이나믹하게!"라는 비전을 가지고,  
AI, 클라우드, IoT 등 최신 기술을 적극 도입해 나가고 있습니다.  

앞으로 이 블로그에서는 개발자들의 실제 경험담, 프로젝트 비하인드,  
회사 문화와 성장 이야기를 꾸준히 공유드릴 예정입니다.  

저희의 첫 여정을 지켜봐주세요!`,
    companyName: '부산다이나믹스',
    createdAt: '2025-06-12T09:00:00Z',
    updatedAt: '2025-06-12T09:00:00Z',
    imageUrl: '/company_thumbnail/one.png',
    hashtags: ['#회사블로그', '#부산다이나믹스', '#첫걸음'],
    description: '부산다이나믹스의 공식 블로그 오픈 소식과 회사 비전을 소개합니다.',
    author: '부산다이나믹스',
    date: '2025. 6. 12.',
    time: '09:00',
    tags: ['#회사블로그', '#부산다이나믹스', '#첫걸음'],
  },
  {
    id: 'company_2',
    title: '신입 개발자 온보딩: 첫 한 달의 기록',
    content: `부산다이나믹스에서는 신입 개발자의 첫 달을 아주 중요하게 생각합니다.  
누구나 빠르게 적응하고, 자신만의 성장 궤적을 그릴 수 있도록 돕고 있죠.  

첫 주에는 회사 문화와 코드베이스를 익히며,  
둘째 주부터는 작은 기능을 직접 맡아봅니다.  
한 달이 지나면, 자신만의 프로젝트를 기획하고 발표할 기회도 주어집니다.  

온보딩은 단순한 교육이 아니라, '부산다이나믹스의 한 구성원'으로 거듭나는 과정입니다.`,
    companyName: '부산다이나믹스',
    createdAt: '2025-06-10T11:00:00Z',
    updatedAt: '2025-06-10T11:00:00Z',
    imageUrl: '/company_thumbnail/two.png',
    hashtags: ['#온보딩', '#신입개발자', '#성장'],
    description:
      '부산다이나믹스의 신입 개발자 온보딩 프로그램과 첫 한 달의 성장 과정을 소개합니다.',
    author: '부산다이나믹스',
    date: '2025. 6. 10.',
    time: '11:00',
    tags: ['#온보딩', '#신입개발자', '#성장'],
  },
  {
    id: 'company_3',
    title: '원격 근무, 어떻게 우리 팀을 바꿔놓았을까?',
    content: `코로나19 이후, 부산다이나믹스도 원격 근무 체제를 도입했습니다.  
처음에는 낯설었지만, 지금은 효율적이고 자유로운 업무 환경이 되어가고 있습니다.  

매일 아침 10분 스탠드업 미팅으로 하루를 시작하고,  
Slack과 Zoom으로 실시간 협업을 이어갑니다.  
Notion에 남긴 기록은 누구나 쉽게 참고할 수 있죠.  

"사무실에 없어서 오히려 더 가깝게 느껴진다"는 말이 나올 정도로,  
우리의 협업 방식은 더 유연해졌습니다.`,
    companyName: '부산다이나믹스',
    createdAt: '2025-06-08T14:30:00Z',
    updatedAt: '2025-06-08T14:30:00Z',
    imageUrl: '/company_thumbnail/three.png',
    hashtags: ['#원격근무', '#팀문화', '#협업'],
    description: '부산다이나믹스의 원격 근무 도입 과정과 팀 협업 방식의 변화를 다룹니다.',
    author: '부산다이나믹스',
    date: '2025. 6. 8.',
    time: '14:30',
    tags: ['#원격근무', '#팀문화', '#협업'],
  },
  {
    id: 'company_4',
    title: '우리가 클라우드 네이티브를 선택한 이유',
    content: `서비스가 커질수록, 우리는 더 빠르고 안정적인 인프라가 필요했습니다.  
그래서 부산다이나믹스는 클라우드 네이티브 아키텍처로 전환했습니다.  

Kubernetes와 Docker, ArgoCD를 활용하여  
배포 속도를 높이고 안정성을 확보했죠.  
덕분에 지금은 하루에도 수십 번, 빠른 피드백과 배포가 가능해졌습니다.  

클라우드 네이티브는 단순한 기술이 아니라,  
우리 회사가 끊임없이 실험하고 성장할 수 있게 해주는 '문화'가 되었습니다.`,
    companyName: '부산다이나믹스',
    createdAt: '2025-06-07T10:00:00Z',
    updatedAt: '2025-06-07T10:00:00Z',
    imageUrl: '/company_thumbnail/four.png',
    hashtags: ['#클라우드', '#DevOps', '#CI/CD'],
    description: '부산다이나믹스의 클라우드 네이티브 아키텍처 전환 과정과 그 효과를 설명합니다.',
    author: '부산다이나믹스',
    date: '2025. 6. 7.',
    time: '10:00',
    tags: ['#클라우드', '#DevOps', '#CI/CD'],
  },
  {
    id: 'company_5',
    title: 'AI 연구팀의 하루: 논문에서 서비스까지',
    content: `부산다이나믹스 AI 연구팀의 하루는 논문으로 시작합니다.  
최신 연구를 읽고, 아이디어를 토론하며 실험할 방향을 정합니다.  

오후에는 모델을 학습시키고 성능을 검증합니다.  
실험이 끝나면 결과를 정리해 사내 공유 세션에서 발표합니다.  
실험실의 작은 시도가, 어느새 실제 서비스 기능으로 이어지기도 합니다.  

AI 연구는 끝없는 탐구지만, 그만큼 즐거운 도전의 연속입니다.`,
    companyName: '부산다이나믹스',
    createdAt: '2025-06-05T16:00:00Z',
    updatedAt: '2025-06-05T16:00:00Z',
    imageUrl: '/company_thumbnail/five.png',
    hashtags: ['#AI연구', '#머신러닝', '#팀스토리'],
    description: '부산다이나믹스 AI 연구팀의 일상과 연구 과정을 소개합니다.',
    author: '부산다이나믹스',
    date: '2025. 6. 5.',
    time: '16:00',
    tags: ['#AI연구', '#머신러닝', '#팀스토리'],
  },
  {
    id: 'company_6',
    title: 'IoT 프로젝트: 사무실 불이 자동으로 꺼진 날',
    content: `지난달, IoT 팀은 '에너지 절약 프로젝트'를 진행했습니다.  
사무실의 조명과 전자기기를 자동 제어하는 시스템을 만든 거죠.  

처음에는 단순한 테스트였지만, 실제 전력 사용량이 줄어드는 걸 보며  
팀원들 모두 큰 성취감을 느꼈습니다.  
지금은 이 프로젝트가 확장되어 스마트홈 솔루션으로 발전하고 있습니다.  

작은 실험이 큰 변화를 만들 수 있다는 걸 직접 경험한 순간이었습니다.`,
    companyName: '부산다이나믹스',
    createdAt: '2025-06-04T15:00:00Z',
    updatedAt: '2025-06-04T15:00:00Z',
    imageUrl: '/company_thumbnail/six.png',
    hashtags: ['#IoT', '#스마트홈', '#프로젝트비하인드'],
    description:
      '부산다이나믹스 IoT 팀의 에너지 절약 프로젝트와 스마트홈 솔루션 개발 과정을 다룹니다.',
    author: '부산다이나믹스',
    date: '2025. 6. 4.',
    time: '15:00',
    tags: ['#IoT', '#스마트홈', '#프로젝트비하인드'],
  },
  {
    id: 'company_7',
    title: '자율주행 연구일지: 첫 테스트 주행',
    content: `부산다이나믹스 자율주행팀은 지난주, 첫 도로 테스트를 진행했습니다.  
LiDAR와 카메라 센서가 수집한 데이터를 기반으로 차량이 스스로 움직였죠.  

비록 몇 번의 긴급 제동이 있었지만,  
차량은 안전하게 주행을 마칠 수 있었습니다.  

도로 위의 작은 움직임 하나하나가,  
우리가 그리고 있는 미래를 현실로 만들어주고 있습니다.`,
    companyName: '부산다이나믹스',
    createdAt: '2025-06-03T09:30:00Z',
    updatedAt: '2025-06-03T09:30:00Z',
    imageUrl: '/company_thumbnail/seven.png',
    hashtags: ['#자율주행', '#테스트주행', '#R&D'],
    description: '부산다이나믹스 자율주행팀의 첫 도로 테스트 주행 경험과 연구 과정을 소개합니다.',
    author: '부산다이나믹스',
    date: '2025. 6. 3.',
    time: '09:30',
    tags: ['#자율주행', '#테스트주행', '#R&D'],
  },
  {
    id: 'company_8',
    title: 'IT 인재 양성: 우리가 멘토링을 하는 이유',
    content: `부산다이나믹스는 단순히 좋은 서비스를 만드는 것에 그치지 않습니다.  
지역의 젊은 개발자들이 함께 성장하는 생태계를 만드는 것 또한 우리의 목표입니다.  

사내 개발자들이 직접 멘토로 참여해,  
부산 지역 대학생과 신입 개발자들에게 경험을 나누고 있습니다.  

우리는 믿습니다.  
한 명의 성장이 곧 지역의 성장이고,  
결국 부산다이나믹스의 성장으로 이어진다는 것을요.`,
    companyName: '부산다이나믹스',
    createdAt: '2025-06-01T13:00:00Z',
    updatedAt: '2025-06-01T13:00:00Z',
    imageUrl: '/company_thumbnail/one.png',
    hashtags: ['#멘토링', '#IT교육', '#성장스토리'],
    description:
      '부산다이나믹스의 IT 인재 양성 프로그램과 지역 개발자 생태계 구축 노력을 다룹니다.',
    author: '부산다이나믹스',
    date: '2025. 6. 1.',
    time: '13:00',
    tags: ['#멘토링', '#IT교육', '#성장스토리'],
  },
];
export const getCompanyContentById = (id: string): CompanyContent | undefined => {
  return mockCompanyContents.find((content) => content.id === id);
};

export const getNextContentId = (currentId: string): string | null => {
  const currentIndex = mockCompanyContents.findIndex((content) => content.id === currentId);
  if (currentIndex === -1 || currentIndex === mockCompanyContents.length - 1) return null;
  return mockCompanyContents[currentIndex + 1].id;
};

export const getPreviousContentId = (currentId: string): string | null => {
  const currentIndex = mockCompanyContents.findIndex((content) => content.id === currentId);
  if (currentIndex <= 0) return null;
  return mockCompanyContents[currentIndex - 1].id;
};

export const addNewCompanyContent = (
  newContent: Omit<CompanyContent, 'id' | 'createdAt' | 'updatedAt' | 'date' | 'time' | 'imageUrl'>
) => {
  const now = new Date();
  const newId = `company_${mockCompanyContents.length + 1}`;

  const formattedDate = `${now.getFullYear()}. ${now.getMonth() + 1}. ${now.getDate()}.`;
  const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  const contentToAdd: CompanyContent = {
    ...newContent,
    id: newId,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    date: formattedDate,
    time: formattedTime,
    imageUrl: '/company_thumbnail/eight.png', // 무조건 eight.png 사용
  };

  // 새글을 배열 맨 앞에 추가 (최신글이 위에 오도록)
  mockCompanyContents.unshift(contentToAdd);

  return contentToAdd;
};
