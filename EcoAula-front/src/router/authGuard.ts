export type AuthAccessChecker = () => boolean

const allowAccessByDefault: AuthAccessChecker = () => true

let authAccessChecker: AuthAccessChecker = allowAccessByDefault

export function canAccessProtectedRoutes(): boolean {
  return authAccessChecker()
}

export function setAuthAccessChecker(checker: AuthAccessChecker): void {
  authAccessChecker = checker
}

export function resetAuthAccessChecker(): void {
  authAccessChecker = allowAccessByDefault
}
