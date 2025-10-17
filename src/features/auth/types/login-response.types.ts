export interface LoginResponse {
  message: string;
  data: LoginResponseData;
}

export interface LoginResponseData {
  token: string;
  user: LoginResponseDataUser;
}

export interface LoginResponseDataUser {
  id: string;
  name: string;
  email: string;
}
