import api from './api';
import {
  SignUpCompanyRequestDto,
  SignUpPersonalRequestDto,
  SignInRequestDto,
} from '@type/auth/SignUpDTO';

export const postSignUpPersonal = async (request: SignUpPersonalRequestDto) => {
  const response = await api.post('/user/register/personal', request);
  return response.data;
};

export const postSignUpCompany = async (request: SignUpCompanyRequestDto) => {
  const response = await api.post('/user/register/company', request);
  return response.data;
};

export const signin = async (request: SignInRequestDto) => {
  const response = await api.post('/user/login', request);
  return response.data;
};
