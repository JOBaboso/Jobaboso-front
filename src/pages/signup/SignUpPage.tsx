import { FaUser, FaBuilding, FaUniversity } from 'react-icons/fa';

const cardData = [
  {
    icon: <FaUser className="text-mainBlue text-3xl" />,
    title: '개인 회원',
    description: '취업이나 진로 준비를 하고 있는 학생, 구직자 등 모두가 가입할 수 있어요.',
  },
  {
    icon: <FaBuilding className="text-mainBlue text-3xl" />,
    title: '기업 회원',
    description: '채용이나 잡메이트와 협력을 원하는 기업이 가입해요. 구직자 정보 열람이 가능해요.',
  },
  {
    icon: <FaUniversity className="text-mainBlue text-3xl" />,
    title: '대학교 교직원 회원',
    description: '대학에서 진로·취업 지원을 담당하는 교직원이 가입하면 좋아요.',
  },
];

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-20">
      <h1 className="text-h1 font-bold text-gray900 mb-2">회원가입</h1>
      <p className="text-bodyMd text-gray500 mb-10">회원 유형에 맞게 선택해 주세요.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full">
        {cardData.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col gap-4">
              <div>{card.icon}</div>
              <h2 className="text-h3 font-semibold text-gray900">{card.title}</h2>
              <p className="text-bodySm text-gray600">{card.description}</p>
            </div>
            <button className="mt-6 self-start px-4 py-2 bg-mainBlue text-white text-bodySm font-medium rounded-lg hover:bg-subSkyBlue transition">
              회원가입
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignUpPage;
