// FORM TYPE

// API RESPONSE TYPE
export interface User {
  email: string;
  role: "Customer" | "Seller" | "Admin";
}

// LOGIN
export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  message?: string;
}

// REGISTER
export interface RegisterFormData extends LoginFormData {
  confirmPassword: string;
  role: "Customer" | "Seller";
}

export type RegisterRequest = Omit<RegisterFormData, "confirmPassword">;

export interface RegisterResponse {
  message: string;
}

// REFRESH TOKEN
export interface RefreshResponse {
  accessToken: string;
  user: User;
}

// REDUX TYPES
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  authChecked: boolean;
}
