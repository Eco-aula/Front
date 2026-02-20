import { ApiError, apiClient } from '@/api/apiClient'

describe('apiClient', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('performs successful GET requests with json payload', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(
        new Response(JSON.stringify([{ id: 1 }]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      )

    const payload = await apiClient.get<Array<{ id: number }>>('/residuos')

    expect(payload).toEqual([{ id: 1 }])
    expect(fetchSpy).toHaveBeenCalledWith(
      'http://localhost:8080/api/v1/residuos',
      expect.any(Object),
    )
  })

  it('adds content-type header on POST and returns response', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        }),
      )

    const response = await apiClient.post<{ ok: boolean }, { a: number }>(
      '/path',
      { a: 1 },
    )

    expect(response).toEqual({ ok: true })
    const firstCall = fetchSpy.mock.calls[0]
    expect(firstCall).toBeDefined()
    const request = firstCall?.[1] as RequestInit | undefined
    expect(request).toBeDefined()
    expect(request).toMatchObject({
      method: 'POST',
      body: JSON.stringify({ a: 1 }),
    })
    expect(request?.headers).toMatchObject({
      'Content-Type': 'application/json',
    })
  })

  it('throws ApiError using message from json payload when available', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ message: 'Fallo controlado' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    await expect(apiClient.get('/residuos')).rejects.toMatchObject({
      name: 'ApiError',
      message: 'Fallo controlado',
      status: 500,
    })
  })

  it('throws ApiError with text payload and fallback status message', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')

    fetchSpy.mockResolvedValueOnce(
      new Response('sin-detalle', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' },
      }),
    )

    await expect(apiClient.get('/residuos')).rejects.toThrow('sin-detalle')

    fetchSpy.mockResolvedValueOnce(
      new Response('', {
        status: 418,
        headers: { 'Content-Type': 'text/plain' },
      }),
    )

    await expect(apiClient.get('/otra')).rejects.toThrow('Error 418')
  })
})
