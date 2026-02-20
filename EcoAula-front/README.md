# EcoAula Frontend

[![Frontend CI](https://github.com/Eco-aula/Front/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/Eco-aula/Front/actions/workflows/frontend-ci.yml)
[![Coverage](https://img.shields.io/endpoint?url=https%3A%2F%2Feco-aula.github.io%2FFront%2Fbadges%2Fcoverage.json)](https://eco-aula.github.io/Front/badges/coverage.json)

Frontend de EcoAula para gestion de residuos. Este proyecto esta integrado con el backend actual usando `VITE_API_URL` y prefijo `/api/v1`.

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

Si no defines la variable, el frontend usa `http://localhost:8080` por defecto.

Variables opcionales para despliegue estatico:

- `VITE_PUBLIC_BASE_PATH`: base publica (ejemplo Pages: `/Front/`)
- `VITE_ROUTER_MODE`: `history` (default) o `hash`

## Instalacion y ejecucion

```bash
npm ci
npm run dev
```

Aplicacion en local: `http://localhost:5173`.

## Scripts

- `npm run dev`: desarrollo
- `npm run test`: pruebas unitarias/integracion
- `npm run test:coverage`: cobertura
- `npm run coverage:badge`: genera `docs/badges/coverage.json`
- `npm run e2e`: pruebas end-to-end
- `npm run build`: type-check + build de produccion
- `npm run preview`: previsualizar build

## Verificacion local recomendada

```bash
npm run test
npm run test:coverage
npm run build
```

Nota: no hay script `lint` definido actualmente en `package.json`.

## Despliegue

### GitHub Pages

El workflow `pages.yml` publica la app a Pages (branches `dev` y `main`):

- build con `VITE_PUBLIC_BASE_PATH=/Front/`
- router en modo `hash` (`VITE_ROUTER_MODE=hash`) para evitar 404 en refresh
- salida publicada: `dist/`
- badge de cobertura expuesto en `/badges/coverage.json`

URL esperada:

- `https://eco-aula.github.io/Front/`
- rutas internas como `https://eco-aula.github.io/Front/#/dashboard`

Importante:

- define la variable de repositorio `VITE_API_URL` en GitHub (Settings > Secrets and variables > Actions > Variables).

### Vercel

Este repo incluye `vercel.json` en la raiz para desplegar desde monorepo:

- instala/build desde `EcoAula-front`
- publica `EcoAula-front/dist`
- incluye rewrite SPA (`/(.*)` -> `/index.html`) para que `history` funcione en rutas directas

Importante:

- define `VITE_API_URL` en el proyecto de Vercel (Environment Variables).

## Flujos minimos cubiertos

- Cargar dashboard (`summary` y `volume-by-category`)
- Crear usuario
- Crear residuo
- Mostrar errores backend `400/404` usando `message`

## Documentacion

- Guia de testing: [`docs/frontend-testing.md`](docs/frontend-testing.md)
