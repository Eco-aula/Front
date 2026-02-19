export function isValidEmail(email: string): boolean {
  const normalizedEmail = email.trim()

  if (normalizedEmail.length === 0) {
    return false
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
}

export function hasMinLength(value: string, minLength: number): boolean {
  return value.trim().length >= minLength
}
