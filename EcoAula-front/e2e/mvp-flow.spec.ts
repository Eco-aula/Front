import { expect, test } from '@playwright/test'

import type {
  CreateResiduoRequest,
  ResiduoApiRecord,
} from '../src/types/residuos'

test('MVP end-to-end flow with network mocks', async ({ page }) => {
  const residuosDb: ResiduoApiRecord[] = [
    {
      id: 1,
      wasteType: 'papel',
      quantityKg: 10,
      createdAt: '2024-01-01T09:00:00.000Z',
      status: 'pendiente',
      createdBy: 'Sistema',
    },
  ]

  await page.route('**/api/residuos', async (route) => {
    const request = route.request()

    if (request.method() === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(residuosDb),
      })
      return
    }

    if (request.method() === 'POST') {
      const body = request.postDataJSON() as CreateResiduoRequest
      const created: ResiduoApiRecord = {
        id: residuosDb.length + 1,
        wasteType: body.wasteType,
        quantityKg: body.quantityKg,
        createdAt: body.createdAt,
        status: 'pendiente',
        createdBy: body.name,
        observations: body.observations,
      }
      residuosDb.unshift(created)

      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify(created),
      })
      return
    }

    await route.fallback()
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
