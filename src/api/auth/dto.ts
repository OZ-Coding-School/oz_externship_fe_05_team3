export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  access_token: string;
}

export interface UserResponseDTO {
  id: number;
  email: string;
  name: string;
  nickname: string;
  phone_number: string;
  gender: string;
  birthday: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
