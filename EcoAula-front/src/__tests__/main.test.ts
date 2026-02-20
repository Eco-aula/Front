describe('main bootstrap', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('creates the app, installs plugins, and mounts to #app', async () => {
    const mountMock = vi.fn()
    const appInstance = {
      use: vi.fn(() => appInstance),
      mount: mountMock,
    }
    const createAppMock = vi.fn(() => appInstance)

    vi.doMock('vue', async () => {
      const actualVue = await vi.importActual<typeof import('vue')>('vue')
      return {
        ...actualVue,
        createApp: createAppMock,
      }
    })

    await import('@/main')

    expect(createAppMock).toHaveBeenCalledTimes(1)
    expect(appInstance.use).toHaveBeenCalledTimes(2)
    expect(mountMock).toHaveBeenCalledWith('#app')
  })
})
