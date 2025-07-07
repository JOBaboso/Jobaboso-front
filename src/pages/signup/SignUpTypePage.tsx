import { FaUser, FaBuilding, FaUniversity } from "react-icons/fa";
import Card from "@components/common/Card";
import Button from "@components/common/Button";

const SignupTypePage = () => {
  return (
    <div className="w-full flex flex-col items-center px-4 py-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">회원가입</h2>
      <p className="text-sm text-gray-600 mb-10">회원 유형에 맞게 선택해 주세요.</p>

      <div className="flex flex-wrap justify-center gap-8">
        <Card
          icon={<FaUser />}
          title="개인 회원"
          description="취업이나 진로 준비를 하고 있는 학생, 구직자 등 모두가 가입할 수 있어요."
        >
          <Button>회원가입</Button>
        </Card>

        <Card
          icon={<FaBuilding />}
          title="기업 회원"
          description="채용이나 잡메이트와 협력을 원하는 기업이 가입해요. 구직자 정보 열람이 가능해요."
        >
          <Button>회원가입</Button>
        </Card>

        <Card
          icon={<FaUniversity />}
          title="대학교 교직원 회원"
          description="대학교에서 진로·취업 지원을 담당하는 교직원이 가입하면 좋아요."
        >
          <Button>회원가입</Button>
        </Card>
      </div>
    </div>
  );
};

export default SignupTypePage;
