import { ApiError } from '@/api/apiClient'
import { createUser, getUserById } from '@/api/usersApi'

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

const CURRENT_USER_ID_KEY = 'ecoaula_current_user_id'

export async function login(request: LoginRequest): Promise<AuthResponse> {
  const rawUserId = localStorage.getItem(CURRENT_USER_ID_KEY)
  const userId = Number.parseInt(rawUserId ?? '', 10)

  if (!Number.isFinite(userId) || userId <= 0) {
    throw new ApiError(
      'No hay usuario registrado en esta sesion. Registrese primero.',
      400,
      null,
    )
  }

  const user = await getUserById(userId)
  const inputEmail = request.email.trim().toLowerCase()
  const savedEmail = user.email.trim().toLowerCase()
  const savedPassword = user.password ?? ''

  if (savedEmail !== inputEmail || savedPassword !== request.password) {
    throw new ApiError('Credenciales incorrectas.', 401, null)
  }

  return {
    token: `user-${user.id}`,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  }
}

export async function register(request: RegisterRequest): Promise<AuthResponse> {
  const user = await createUser(request)

  localStorage.setItem(CURRENT_USER_ID_KEY, String(user.id))

  return {
    token: `user-${user.id}`,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  }
}
