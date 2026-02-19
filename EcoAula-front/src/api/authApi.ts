import { apiClient } from '@/api/apiClient'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: number
    name: string
    email: string
  }
}

export function login(request: LoginRequest): Promise<AuthResponse> {
  return apiClient.post<AuthResponse, LoginRequest>('/auth/login', request)
}

export function register(request: RegisterRequest): Promise<AuthResponse> {
  return apiClient.post<AuthResponse, RegisterRequest>('/auth/register', request)
}
