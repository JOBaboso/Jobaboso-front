import React from 'react';

interface SkillsSectionProps {
  skills: string[];
  userName: string;
  onSkillRemove: (skillToRemove: string) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  userName,
  onSkillRemove,
}) => {
  return (
    <div className="mb-16 w-[862px]">
      <h2 className="mb-10 font-semibold text-gray-800 text-h2">스킬</h2>
      <div className="p-6 rounded-xl border border-gray-200">
        <div className="flex gap-2 items-center mb-2 font-semibold text-gray-700 text-h4">
          나의 스킬 <span className="text-sm">({skills.length}/20)</span>
        </div>
        <div className="mb-2 text-gray-500 text-bodyLg">
          {userName} 님이 선택하신 스킬을 기반으로 추천해드려요!
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="flex gap-1 items-center px-4 py-2 font-medium rounded-xl border shadow-none border-mainBlue bg-subLightBlue text-h4 text-mainBlue"
            >
              {skill}
              <button
                type="button"
                className="ml-1 text-lg text-mainBlue hover:text-blue-800"
                onClick={() => onSkillRemove(skill)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection; 