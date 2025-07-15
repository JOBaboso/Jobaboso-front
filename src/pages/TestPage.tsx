import { useEffect } from 'react';
import { signupTest } from '@apis/signupTest';

const TestPage = () => {
  useEffect(() => {
    signupTest();
  }, []);

  return <div>테스트 중입니다. 콘솔을 확인하세요.</div>;
};

export default TestPage;
