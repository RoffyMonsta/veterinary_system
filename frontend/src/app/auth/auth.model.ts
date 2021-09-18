export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  username: string;
  id?: number;
  email: number;
  accessToken: string;
  roles: string[];
  status: string;
}
