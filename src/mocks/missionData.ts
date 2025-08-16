export interface Mission {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  icon: string;
}

export interface MissionHistory {
  id: string;
  title: string;
  question: string;
  date: string;
  content: string;
}

export const todayMission: Mission = {
  id: '1',
  title: '면접 답변 작성하기',
  description:
    '연결 합격률을 한 단계 UP\n잡메이트가 준비한 면접문항에 반해 심층면접에 대비해보세요!',
  buttonText: '지금 시작하기 →',
  icon: '/mission.svg',
};

export const missionHistory: MissionHistory[] = [
  {
    id: '1',
    title: '👩‍💻 면접 대비하기',
    question: '상사가 부정한 행동을 저지른다면?',
    date: '2025. 8. 6.',
    content:
      '우선 그 상황을 객관적으로 파악하고, 불법적이거나 윤리에 반하는 행동이라면 적절한 채널을 통해 문제를 제기할 것입니다. 중요한 것은 감정적으로 대응하기보다는, 정확한 사실을 바탕으로 상황을 해결하는 것입니다. 만약 직접적으로 문제를 제기하는 것이 어려운 상황이라면, 신뢰할 수 있는 동료나 인사 부서에 상담을 요청하여, 상황을 개선할 수 있는 방법을 모색할 것입...',
  },
  {
    id: '2',
    title: '📝 자소서 특훈',
    question: '자신의 강점과 약점을 기술하시오.',
    date: '2025. 8. 5.',
    content:
      '자신의 강점과 약점을 객관적으로 분석하고, 이를 어떻게 극복하고 발전시켜 나갈 것인지에 대한 계획을 포함한 자소서를 작성했습니다.',
  },
  {
    id: '3',
    title: '면접 대비하기',
    question: '팀워크가 중요한 이유는 무엇인가요?',
    date: '2025. 8. 4.',
    content:
      '팀워크의 중요성과 개인적으로 경험한 팀워크 사례를 바탕으로 한 답변을 작성했습니다. 협력과 소통의 가치를 강조했습니다.',
  },
  {
    id: '4',
    title: '자소서 특훈',
    question: '지원 동기를 설명하시오.',
    date: '2025. 8. 3.',
    content:
      '해당 회사와 직무에 대한 진정성 있는 지원 동기를 작성했습니다. 개인의 경험과 회사의 비전을 연결시켜 표현했습니다.',
  },
  {
    id: '5',
    title: '면접 대비하기',
    question: '실패했던 경험과 그로부터 배운 점은?',
    date: '2025. 8. 2.',
    content:
      '실패 경험을 솔직하게 공유하고, 그 과정에서 배운 교훈과 성장한 점을 구체적으로 작성했습니다.',
  },
  {
    id: '6',
    title: '자소서 특훈',
    question: '5년 후 자신의 모습은?',
    date: '2025. 8. 1.',
    content:
      '5년 후의 구체적인 목표와 계획을 포함한 자소서를 작성했습니다. 단계별 성장 계획과 회사에 기여할 수 있는 방안을 제시했습니다.',
  },
];
