import TagInput from '@components/common/TagInput';
import { InputField } from '@components/common/InputField';
import { useState } from 'react';

const EditMySpec = () => {
  const [sentence, setSentence] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-4 px-6 py-8">
      <div className="w-[842px]">
        {/* TagInput의 width가 full이라 감싸는 div에 너비 지정 */}
        <TagInput
          id="keywords"
          label="관심 키워드"
          placeholder="키워드를 입력하고 엔터"
          value={keywords}
          onChange={setKeywords}
        />
      </div>

      <div className="w-[702px]">
        <InputField
          id="sentence"
          label="걍 글"
          placeholder="관심 키워드를 입력해주세요"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
        />
      </div>
    </div>
  );
};

export default EditMySpec;
