const PersonalSidebar = () => {
  return (
    <nav className="h-full w-full px-8 py-8 text-bodyLg text-gray-700">
      <ul className="space-y-6">
        {/* 개인회원 홈 */}
        <li>
          <h2 className="mb-3 text-h2 font-bold text-gray-700">개인회원 홈</h2>
        </li>

        {/* 이력서 관리 */}
        <li>
          <h4 className="mb-2 text-h4 font-bold text-gray-700">이력서 관리</h4>
          <ul className="space-y-1">
            <li>나의 이력서</li>
            <li>이력서 등록 및 수정</li>
          </ul>
        </li>

        <hr className="border-b border-gray-200" />

        {/* 나의 취업 현황 */}
        <li>
          <h4 className="mb-2 text-h4 font-bold text-gray-700">나의 취업 현황</h4>
          <ul className="space-y-1">
            <li>전체 지원 현황</li>
            <li>찜 리스트 확인</li>
            <li>캘린더</li>
          </ul>
        </li>

        <hr className="border-b border-gray-200" />

        {/* 취업 후기 */}
        <li>
          <h4 className="mb-2 text-h4 font-bold text-gray-700">취업 후기</h4>
          <ul className="space-y-1">
            <li>나의 취업 후기</li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default PersonalSidebar;
