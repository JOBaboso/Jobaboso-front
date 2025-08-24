import React, { useState, useEffect } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { todayMission, missionHistory, MissionHistory } from '@mocks/missionData';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import MissionModal from '@components/mission/MissionModal';
import PointModal from '@components/common/PointModal'

const MissionPage: React.FC = () => {
  // MissionLayout에서 전달된 refreshPoints 함수 받기
  const { refreshPoints } = useOutletContext<{ refreshPoints: () => void }>();
  const [searchParams] = useSearchParams();

  // 로컬스토리지에서 사용자 이름 가져오기
  const userName = localStorage.getItem('name') || '사용자';

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answerContent, setAnswerContent] = useState('');
  const [selectedMission, setSelectedMission] = useState<MissionHistory | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // 저장된 미션 답변들을 관리하는 상태 추가
  const [savedMissions, setSavedMissions] = useState<MissionHistory[]>(missionHistory);

  // 포인트 획득 모달 상태 추가
  const [isPointModalOpen, setIsPointModalOpen] = useState(false);

  // URL 파라미터 확인하여 모달 자동 열기
  useEffect(() => {
    const startParam = searchParams.get('start');
    if (startParam === 'true') {
      openTodayMissionModal();
    }
  }, [searchParams]);

  // 오늘의 미션 모달 열기 (편집 모드)
  const openTodayMissionModal = () => {
    setIsEditMode(true);
    setSelectedMission(null);

    // 오늘의 미션이 이미 작성되어 있는지 확인
    const todayMissionExists = savedMissions.find(
      (mission) =>
        mission.title === todayMission.title &&
        mission.date === new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })
    );

    if (todayMissionExists) {
      // 오늘의 미션이 이미 있으면 기존 내용으로 수정 모드
      setAnswerContent(todayMissionExists.content);
      setSelectedMission(todayMissionExists);
    } else {
      // 오늘의 미션이 없으면 빈 내용으로 새로 작성 모드
      setAnswerContent('');
    }

    setIsModalOpen(true);
  };

  // 미션 히스토리 모달 열기 (읽기 전용)
  const openHistoryMissionModal = (mission: MissionHistory) => {
    setIsEditMode(false);
    setSelectedMission(mission);
    setAnswerContent(mission.content);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setAnswerContent('');
    setSelectedMission(null);
    setIsEditMode(false);
  };

  // 저장하기
  const handleSave = () => {
    if (answerContent.trim()) {
      if (isEditMode && selectedMission && selectedMission.title === todayMission.title) {
        // 오늘의 미션 수정 (기존 항목 업데이트)
        setSavedMissions((prev) =>
          prev.map((mission) =>
            mission.id === selectedMission.id ? { ...mission, content: answerContent } : mission
          )
        );
        console.log('수정된 답변:', answerContent);
        closeModal();
      } else {
        // 새로운 미션 답변 생성
        const newMission: MissionHistory = {
          id: Date.now().toString(), // 고유 ID 생성 (string으로 변환)
          date: new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' }),
          emoji: '📝', // 기본 이모지 사용
          title: todayMission.title,
          question: todayMission.question,
          content: answerContent,
          guide: todayMission.guide,
        };

        // 저장된 미션 목록에 추가 (최신순으로 맨 앞에 추가)
        setSavedMissions((prev) => [newMission, ...prev]);

        console.log('저장된 답변:', answerContent);
        closeModal();

        // 포인트 획득 모달 표시
        setIsPointModalOpen(true);
      }
    }
  };

  // 답변 내용 변경
  const handleAnswerChange = (content: string) => {
    setAnswerContent(content);
  };

  // 포인트 모달 닫기
  const closePointModal = () => {
    setIsPointModalOpen(false);
  };

  return (
    <div>
      {/* 헤더 섹션 */}
      <p className="mb-4 text-gray-800 text-h2">{userName} 님을 위한 오늘의 미션</p>

      {/* 오늘의 미션 카드 */}
      <div className="py-4 pl-12 mb-20 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl">
        <div className="flex justify-between items-center">
          {/* 1. 미션 아이콘 */}
          <div className="flex items-center">
            <img src={todayMission.icon} alt="미션 아이콘" className="w-36 h-40" />
          </div>

          {/* 2. title, description 수직 정렬 */}
          <div className="flex-1 mx-8">
            <h2 className="mb-4 text-3xl font-semibold">{todayMission.title}</h2>
            <div className="flex justify-between items-center">
              <p className="whitespace-pre-line text-bodyLg">{todayMission.description}</p>
              <button
                onClick={openTodayMissionModal}
                className="rounded-[999px] bg-white px-6 py-2 text-lg font-bold leading-[26px] text-gray-700 transition-colors hover:bg-blue-50"
              >
                {todayMission.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 미션 히스토리 섹션 */}
      <div className="mb-8">
        <h2 className="mb-2 text-gray-800 text-h2">나의 미션 히스토리</h2>
        <p className="flex gap-1 items-center text-gray-800 text-bodyLg">
          <InformationCircleIcon className="w-5 h-5" />
          내가 했던 미션들이 최신순으로 노출돼요.
        </p>
      </div>

      {/* 미션 히스토리 그리드 */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
        {savedMissions.map((mission) => (
          <div
            key={mission.id}
            onClick={() => openHistoryMissionModal(mission)}
            className="cursor-pointer rounded-[16px] border border-gray-200 bg-gray-50 p-6 transition-shadow hover:shadow-lg"
          >
            <p className="mb-2 text-sm text-gray-500">{mission.date}</p>
            <h3 className="mb-3 font-semibold text-gray-600 text-h2">
              <span className="mr-2">{mission.emoji}</span>
              {mission.title}
            </h3>
            <p className="mb-3 text-gray-500 text-h4">
              <span className="mr-2 text-mainBlue">Q.</span>
              {mission.question}
            </p>
            <p className="text-sm text-gray-600 line-clamp-4">{mission.content}</p>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center">
        <div className="flex items-center px-4 py-2 space-x-2">
          <button className="text-gray-500 hover:text-gray-700">
            <span className="text-lg text-gray-500">‹</span>
          </button>
          <span className="p-2 text-sm font-bold text-gray-400 bg-gray-200 rounded-full">01</span>
          <button className="text-gray-500 hover:text-gray-700">
            <span className="text-lg text-gray-500">›</span>
          </button>
        </div>
      </div>

      {/* 미션 상세 모달 */}
      <MissionModal
        isOpen={isModalOpen}
        isEditMode={isEditMode}
        todayMission={todayMission}
        selectedMission={selectedMission}
        answerContent={answerContent}
        onClose={closeModal}
        onAnswerChange={handleAnswerChange}
        onSave={handleSave}
      />

      {/* 포인트 획득 모달 */}
      <PointModal
        isOpen={isPointModalOpen}
        onClose={closePointModal}
        title="오늘의 미션 완료! 포인트 획득"
        points={10}
        description="꿈을 위해 하나하나씩 실천해보자"
        onRefresh={refreshPoints}
      />
    </div>
  );
};

export default MissionPage;
