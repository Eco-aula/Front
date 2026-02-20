import { expect, test } from '@playwright/test'

test('MVP end-to-end flow with network mocks', async ({ page }) => {
  const summaryDb = [
    { category: 'PAPER', state: 'LIMIT' },
    { category: 'PLASTIC', state: 'FULL' },
  ]

  const volumeDb = [
    { category: 'PAPER', totalWeight: 80 },
    { category: 'PLASTIC', totalWeight: 45 },
  ]

  const wastesDb: Array<{
    id: number
    name: string
    description: string
    heavy: number
    category: string
    date: string
  }> = []

  await page.route('**/api/v1/containers/summary', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(summaryDb),
    })
  })

  await page.route('**/api/v1/containers/volume-by-category', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(volumeDb),
    })
  })

  await page.route('**/api/v1/wastes', async (route) => {
    const request = route.request()

    if (request.method() !== 'POST') {
      await route.fallback()
      return
    }

    const body = request.postDataJSON() as {
      name: string
      description: string
      heavy: number
      category: string
    }

    const created = {
      id: wastesDb.length + 1,
      name: body.name,
      description: body.description,
      heavy: body.heavy,
      category: body.category,
      date: '20-02-2026',
    }
    wastesDb.unshift(created)

    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify(created),
    })
  })

  await page.goto('/dashboard')
  await expect(page.getByText('Dashboard General')).toBeVisible()

  await page.getByRole('link', { name: 'Listado' }).click()
  await expect(page.getByText('Listado de Residuos')).toBeVisible()

  await page.getByRole('link', { name: 'Registrar' }).click()
  await page.getByLabel('Nombre de quien registra').fill('Playwright QA')
  await page.getByLabel('Cantidad en kilogramos').fill('21')
  await page.getByText('Metal').click()
  await page.getByRole('button', { name: 'Confirmar Registro' }).click()
  await expect(page.getByText('Registro creado correctamente.')).toBeVisible()

  await page.getByRole('link', { name: 'Listado' }).click()
  await expect(page.getByText('Metal')).toBeVisible()
})
