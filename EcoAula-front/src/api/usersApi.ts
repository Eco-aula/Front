import { apiClient } from '@/api/apiClient'

export interface UserRecord {
  id: number
  name: string
  email: string
  password?: string
}

export interface CreateUserRequest {
  name: string
  email: string
  password: string
}

export interface UpdateUserRequest {
  name: string
  email: string
  password: string
}

export function createUser(request: CreateUserRequest): Promise<UserRecord> {
  return apiClient.post<UserRecord, CreateUserRequest>('/users', request)
}

export function getUserById(id: number): Promise<UserRecord> {
  return apiClient.get<UserRecord>(`/users/${id}`)
}

export function updateUser(
  id: number,
  request: UpdateUserRequest,
): Promise<UserRecord> {
  return apiClient.put<UserRecord, UpdateUserRequest>(`/users/${id}`, request)
}

export function deleteUser(id: number): Promise<void> {
  return apiClient.delete(`/users/${id}`)
}
