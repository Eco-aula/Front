describe('main bootstrap', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('creates the app, installs plugins, and mounts to #app', async () => {
    const mountMock = vi.fn()
    const useMock = vi.fn(function chainableUse() {
      return this
    })
    const createAppMock = vi.fn(() => ({
      use: useMock,
      mount: mountMock,
    }))

    vi.doMock('vue', async () => {
      const actualVue = await vi.importActual<typeof import('vue')>('vue')
      return {
        ...actualVue,
        createApp: createAppMock,
      }
    })

    await import('@/main')

    expect(createAppMock).toHaveBeenCalledTimes(1)
    expect(useMock).toHaveBeenCalledTimes(2)
    expect(mountMock).toHaveBeenCalledWith('#app')
  })
})
