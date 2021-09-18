export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface User {
  username: string;
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  is_authenticated?: boolean;
  is_verified?: boolean;
  is_approved?: boolean;
  date_joined?: string;
  is_staff?: boolean;
  avatar?: string;
  pk?: string;
}
