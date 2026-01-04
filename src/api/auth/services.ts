import { apiClient } from '../apiclient';
import type { LoginRequestDTO, LoginResponseDTO, UserResponseDTO } from './dto';

export const authService = {
  // 로그인 서비스
  login: async ({
    email,
    password,
  }: LoginRequestDTO): Promise<LoginResponseDTO> => {
    const response = await apiClient.post<LoginResponseDTO>('/accounts/login', {
      email,
      password,
    });

    return response;
  },
  // 유저정보 가져오기 서비스
  getUserInfo: async (): Promise<UserResponseDTO> => {
    const response = await apiClient.get<UserResponseDTO>('/accounts/me');

    return response;
  },

  // 로그아웃 서비스
};
