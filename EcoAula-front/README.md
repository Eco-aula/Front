# EcoAula Frontend

[![Frontend CI](https://github.com/Eco-aula/Front/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/Eco-aula/Front/actions/workflows/frontend-ci.yml)
[![Coverage](https://img.shields.io/endpoint?url=https%3A%2F%2Feco-aula.github.io%2FFront%2Fbadges%2Fcoverage.json)](https://eco-aula.github.io/Front/badges/coverage.json)

Aplicación frontend para la gestión institucional de residuos en EcoAula. Incluye autenticación, panel de control, registro de residuos, listado operativo y gestión de alertas.

## Tecnologías

- Vue 3 + Vite + TypeScript
- Pinia (estado global)
- Vue Router (ruteo y guards)
- Vitest + Testing Library + MSW (unitarias/integración)
- Playwright (E2E)

## Funcionalidades principales

- Login y registro de usuarios.
- Dashboard general con KPIs, distribución y últimos movimientos.
- Registro de residuos con formulario validado.
- Listado de residuos con filtros, paginación y estados `loading/empty/error`.
- Módulo de alertas con filtrado por prioridad y gestión operativa.
- Protección de rutas privadas mediante guard de autenticación.

## Rutas de la aplicación

- `/` → Login/Registro
- `/dashboard` → Vista general
- `/registrar` → Alta de residuo
- `/listado` → Listado y métricas operativas
- `/alertas` → Gestión de alertas
- `/home` → Redirección a `/dashboard`
- `*` → Redirección a `/`

## Estructura del proyecto

```text
src/
  api/           # Cliente HTTP y servicios
  components/    # UI por dominios (home, listado, registrar, login, alertas)
  composables/   # Lógica de presentación reutilizable
  stores/        # Estado global (Pinia)
  router/        # Rutas y guard de acceso
  views/         # Vistas principales por ruta
  utils/         # Utilidades y validaciones
  mocks/         # Handlers MSW (tests)
  __tests__/     # Unit, integración y smoke tests
docs/
  badges/        # JSON de badge de cobertura para Shields
e2e/             # Pruebas Playwright
```

## Requisitos

- Node.js `^20.19.0 || >=22.12.0`
- npm

## Configuración de entorno

La API base se toma de `VITE_API_BASE_URL`.

Si no se define, el frontend usa `/api` por defecto.

Ejemplo de `.env`:

```bash
VITE_API_BASE_URL=https://tu-api.ejemplo.com/api
```

## Instalación y ejecución

```bash
npm ci
npm run dev
```

Build de producción:

```bash
npm run build
```

Previsualización del build:

```bash
npm run preview
```

## Scripts disponibles

- `npm run dev`: servidor de desarrollo.
- `npm run build`: type-check + build.
- `npm run preview`: servir build local.
- `npm run test`: pruebas unitarias + integración.
- `npm run test:watch`: modo watch.
- `npm run test:coverage`: cobertura (texto + HTML + summary JSON).
- `npm run coverage:badge`: genera `docs/badges/coverage.json` desde cobertura real.
- `npm run e2e`: pruebas end-to-end con Playwright.

## Testing y cobertura

- Reporte HTML: `coverage/index.html`
- Documentación técnica de testing: `docs/frontend-testing.md`

### Regenerar cobertura y badge en local

```bash
npm run test:coverage
npm run coverage:badge
```

Archivo local generado: `docs/badges/coverage.json`

## CI/CD y badges automáticos

- `frontend-ci.yml`: ejecuta tests, cobertura y E2E en cada `push`/`pull_request` a `dev` y `main`.
- `pages.yml`: en cada `push` a `dev` regenera `docs/badges/coverage.json` y publica `docs/` en GitHub Pages.
- Endpoint público del badge de cobertura: `https://eco-aula.github.io/Front/badges/coverage.json`
