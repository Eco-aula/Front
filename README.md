# EcoAula Frontend

[![Frontend CI](https://github.com/Eco-aula/Front/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/Eco-aula/Front/actions/workflows/frontend-ci.yml)
[![Coverage](https://img.shields.io/endpoint?url=https%3A%2F%2Feco-aula.github.io%2FFront%2Fbadges%2Fcoverage.json)](https://eco-aula.github.io/Front/badges/coverage.json)

Frontend de EcoAula para gestion de residuos. El codigo de la app vive en `EcoAula-front/`.

## Stack

- Vue 3 + Vite + TypeScript
- Pinia
- Vue Router
- Vitest + Testing Library + MSW
- Playwright

## Integracion Backend

- Variable de entorno: `VITE_API_URL`
- URL local esperada: `http://localhost:8080`
- API base final usada por el cliente: `/api/v1`
- Manejo de error: se muestra `message` del backend cuando existe

Endpoints usados por el frontend:

- `POST /api/v1/users`
- `GET /api/v1/users/{id}`
- `PUT /api/v1/users/{id}`
- `DELETE /api/v1/users/{id}`
- `POST /api/v1/wastes`
- `PUT /api/v1/wastes/{id}`
- `DELETE /api/v1/wastes/{id}`
- `GET /api/v1/containers/summary`
- `GET /api/v1/containers/volume-by-category`
- `GET /api/v1/containers/{id}/status`
- `PUT /api/v1/containers/{id}/fill`
- `PATCH /api/v1/containers/{id}/recycling`
- `PATCH /api/v1/containers/{id}/empty`

## Requisitos

- Node.js `^20.19.0 || >=22.12.0`
- npm
- Backend levantado en `http://localhost:8080`

## Variables de entorno

Puedes usar `EcoAula-front/.env.example` como base y crear `EcoAula-front/.env.local`:

```bash
VITE_API_URL=http://localhost:8080
```

Si no defines la variable, el frontend usa `http://localhost:8080` en local y fallback de produccion en despliegue.

Variables opcionales para despliegue estatico:

- `VITE_PUBLIC_BASE_PATH`: base publica (ejemplo Pages: `/Front/`)
- `VITE_ROUTER_MODE`: `history` o `hash`

## Instalacion y ejecucion

```bash
cd EcoAula-front
npm ci
npm run dev
```

Aplicacion en local: `http://localhost:5173`.

## Scripts

Desde `EcoAula-front`:

- `npm run dev`: desarrollo
- `npm run test`: pruebas unitarias/integracion
- `npm run test:coverage`: cobertura
- `npm run coverage:badge`: genera `docs/badges/coverage.json`
- `npm run e2e`: pruebas end-to-end
- `npm run build`: type-check + build de produccion
- `npm run preview`: previsualizar build

## Despliegue

### GitHub Pages

Workflow: `.github/workflows/pages.yml`

- build con `VITE_PUBLIC_BASE_PATH=/Front/`
- router en modo `hash` en Pages
- salida publicada: `EcoAula-front/dist/`
- badge de cobertura expuesto en `/badges/coverage.json`

URL esperada:

- `https://eco-aula.github.io/Front/`
- rutas internas: `https://eco-aula.github.io/Front/#/dashboard`

### Vercel

Configurado con `vercel.json` en la raiz:

- instala/build desde `EcoAula-front`
- publica `EcoAula-front/dist`
- incluye rewrite SPA (`/(.*)` -> `/index.html`)

## Documentacion

- Testing frontend: [`EcoAula-front/docs/frontend-testing.md`](EcoAula-front/docs/frontend-testing.md)
- README interno app: [`EcoAula-front/README.md`](EcoAula-front/README.md)
- Workflows: [`.github/workflows`](.github/workflows)
