import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApplication, ApplicationDetail } from '../../apis/employment';

const ApplicationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<ApplicationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getApplication(parseInt(id));
        setApplication(data);
      } catch (err) {
        setError('지원서를 불러오는데 실패했습니다.');
        console.error('Error fetching application:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">{error || '지원서를 찾을 수 없습니다.'}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="bg-white rounded-[16px] border border-gray-300 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">지원서 상세</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">기업명</label>
            <p className="text-lg text-gray-900">{application.company_name}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">지원 부문</label>
            <p className="text-lg text-gray-900">{application.position || '미지정'}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">지원일</label>
            <p className="text-lg text-gray-900">
              {new Date(application.application_date).toLocaleDateString('ko-KR')}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
            <p className="text-lg text-gray-900">{application.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailPage;
