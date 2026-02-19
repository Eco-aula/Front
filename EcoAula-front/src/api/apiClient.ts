type JsonRecord = Record<string, unknown>

export class ApiError extends Error {
  status: number
  payload: unknown

  constructor(message: string, status: number, payload: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.payload = payload
  }
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '/api').replace(
  /\/$/,
  '',
)

function buildUrl(path: string): string {
  if (path.startsWith('/')) {
    return `${API_BASE_URL}${path}`
  }
  return `${API_BASE_URL}/${path}`
}

function extractErrorMessage(payload: unknown, fallback: string): string {
  if (payload && typeof payload === 'object' && 'message' in payload) {
    const message = (payload as JsonRecord).message
    if (typeof message === 'string' && message.trim().length > 0) {
      return message
    }
  }

  if (typeof payload === 'string' && payload.trim().length > 0) {
    return payload
  }

  return fallback
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(buildUrl(path), {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  })

  const contentType = response.headers.get('content-type') ?? ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const fallbackMessage = `Error ${response.status}`
    throw new ApiError(
      extractErrorMessage(payload, fallbackMessage),
      response.status,
      payload,
    )
  }

  return payload as T
}

export const apiClient = {
  get<T>(path: string): Promise<T> {
    return request<T>(path)
  },
  post<TResponse, TBody>(path: string, body: TBody): Promise<TResponse> {
    return request<TResponse>(path, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  },
}
