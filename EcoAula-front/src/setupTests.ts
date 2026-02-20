import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/vue'
import { afterAll, afterEach, beforeAll } from 'vitest'

import {
  resetCategoryVolumeDb,
  resetContainersSummaryDb,
  resetUsersDb,
  resetWastesDb,
} from '@/mocks/handlers'
import { server } from '@/mocks/server'

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  cleanup()
  server.resetHandlers()
  resetWastesDb()
  resetUsersDb()
  resetContainersSummaryDb()
  resetCategoryVolumeDb()
})

afterAll(() => {
  server.close()
})
