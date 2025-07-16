import api from './api';
import { SignUpCompanyRequestDto, SignUpPersonalRequestDto } from '@type/authDTO/SignUpDTO';

export const postSignUpPersonal = async (request: SignUpPersonalRequestDto) => {
  const response = await api.post('/register/personal', request);
  return response.data;
};

export const postSignUpCompany = async (request: SignUpCompanyRequestDto) => {
  const response = await api.post('/register/company', request);
  return response.data;
};
