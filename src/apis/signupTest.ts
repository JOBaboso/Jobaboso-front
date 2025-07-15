import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const signupTest = async () => {
  try {
    const response = await axios.post(`${baseUrl}/register/personal`, {
      user_id: 'testuser456',
      password: 'securePassword123!',
      user_type: 'personal',
      name: '홍길동',
      phone: '010-1234-5678',
      email: 'user@example.com',
      birth_date: '2025-07-15',
      gender: 'male',
      profile_addr: 'https://example.com/profile.jpg',
    });

    console.log('✅ 회원가입 성공:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ 서버 오류:', error.response?.data || error.message);
    } else {
      console.error('❌ 알 수 없는 오류:', error);
    }
  }
};
