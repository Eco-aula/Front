describe('msw browser worker', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('creates a worker using existing handlers', async () => {
    const setupWorkerMock = vi.fn(() => ({
      start: vi.fn(),
      stop: vi.fn(),
    }))

    vi.doMock('msw/browser', () => ({
      setupWorker: setupWorkerMock,
    }))

    const { handlers } = await import('@/mocks/handlers')
    const { worker } = await import('@/mocks/browser')

    expect(worker).toBeDefined()
    expect(setupWorkerMock).toHaveBeenCalledWith(...handlers)
  })
})
