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
const CURRENT_USER_KEY = 'ecoaula_current_user'

function resolveCurrentUserId(): number | null {
  const rawUserId = localStorage.getItem(CURRENT_USER_ID_KEY)
  const parsedUserId = Number.parseInt(rawUserId ?? '', 10)
  if (Number.isFinite(parsedUserId) && parsedUserId > 0) {
    return parsedUserId
  }

  const rawCurrentUser = localStorage.getItem(CURRENT_USER_KEY)
  if (!rawCurrentUser) {
    return null
  }

  try {
    const parsedCurrentUser = JSON.parse(rawCurrentUser) as { id?: unknown }
    const fallbackUserId =
      typeof parsedCurrentUser.id === 'number'
        ? parsedCurrentUser.id
        : Number.parseInt(String(parsedCurrentUser.id ?? ''), 10)

    if (!Number.isFinite(fallbackUserId) || fallbackUserId <= 0) {
      return null
    }

    localStorage.setItem(CURRENT_USER_ID_KEY, String(fallbackUserId))
    return fallbackUserId
  } catch {
    return null
  }
}

export async function login(request: LoginRequest): Promise<AuthResponse> {
  const userId = resolveCurrentUserId()

  if (!userId) {
    throw new ApiError(
      'No hay usuario registrado en esta sesion. Registrese primero.',
      400,
      null,
    )
  }

  const user = await getUserById(userId)
  const inputEmail = request.email.trim().toLowerCase()
  const savedEmail = user.email.trim().toLowerCase()
  const savedPassword = (user.password ?? '').trim()

  if (savedEmail !== inputEmail) {
    throw new ApiError('Credenciales incorrectas.', 401, null)
  }

  // Backend GET /users/{id} puede no devolver password; si existe, validamos.
  if (savedPassword.length > 0 && savedPassword !== request.password) {
    throw new ApiError('Credenciales incorrectas.', 401, null)
  }

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
