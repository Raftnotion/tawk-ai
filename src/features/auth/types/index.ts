export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginFormState {
  loading: boolean;
  error: string | null;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
  };
  token: string;
}