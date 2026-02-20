# EcoAula Frontend

[![Frontend CI (main)](https://github.com/Eco-aula/Front/actions/workflows/frontend-ci.yml/badge.svg?branch=main)](https://github.com/Eco-aula/Front/actions/workflows/frontend-ci.yml)
[![Docs Publish (dev)](https://github.com/Eco-aula/Front/actions/workflows/pages.yml/badge.svg?branch=dev)](https://github.com/Eco-aula/Front/actions/workflows/pages.yml)
[![Coverage](https://img.shields.io/endpoint?url=https%3A%2F%2Feco-aula.github.io%2FFront%2Fbadges%2Fcoverage.json)](https://eco-aula.github.io/Front/badges/coverage.json)
[![Vue 3](https://img.shields.io/badge/Vue-3-42b883?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org/)

Frontend para la gestion institucional de residuos en EcoAula.
Incluye autenticacion, panel operativo, registro de residuos, listado y gestion de alertas.

## Enlaces rapidos

- Repositorio: <https://github.com/Eco-aula/Front>
- Acciones CI/CD: <https://github.com/Eco-aula/Front/actions>
- GitHub Pages (docs): <https://eco-aula.github.io/Front/>
- Coverage JSON publico: <https://eco-aula.github.io/Front/badges/coverage.json>
- Documentacion de testing: `EcoAula-front/docs/frontend-testing.md`

## Funcionalidades principales

- Login y registro de usuarios.
- Dashboard con KPIs, distribucion y ultimos movimientos.
- Registro de residuos con validacion de formulario.
- Listado de residuos con filtros, paginacion y estados `loading/empty/error`.
- Modulo de alertas con filtros por prioridad.
- Rutas privadas protegidas por autenticacion.

## Stack tecnico

| Area | Herramientas |
| --- | --- |
| Framework | Vue 3 + Vite |
| Lenguaje | TypeScript |
| Estado | Pinia |
| Routing | Vue Router |
| Unit/Integration | Vitest + Testing Library + MSW |
| End-to-End | Playwright |
| CI/CD | GitHub Actions + GitHub Pages |

## Estructura del repositorio

```text
Front/
  .github/workflows/
    frontend-ci.yml
    pages.yml
  EcoAula-front/
    src/
      api/
      components/
      composables/
      router/
      stores/
      utils/
      views/
      __tests__/
    e2e/
    docs/
      badges/coverage.json
      frontend-testing.md
    package.json
  README.md
```

## Requisitos

- Node.js `^20.19.0 || >=22.12.0`
- npm

## Configuracion de entorno

La API base se toma de `VITE_API_BASE_URL`.
Si no se define, se usa `/api` por defecto.

Ejemplo `.env`:

```bash
VITE_API_BASE_URL=https://tu-api.ejemplo.com/api
```

## Arranque local

```bash
cd EcoAula-front
npm ci
npm run dev
```

App en desarrollo: <http://localhost:5173>

## Scripts disponibles

| Script | Que hace |
| --- | --- |
| `npm run dev` | Arranca servidor de desarrollo |
| `npm run build` | Ejecuta type-check y build de produccion |
| `npm run preview` | Sirve build local para validacion |
| `npm run test` | Ejecuta pruebas unitarias e integracion |
| `npm run test:watch` | Modo watch de Vitest |
| `npm run test:coverage` | Ejecuta tests con cobertura |
| `npm run coverage:badge` | Genera `docs/badges/coverage.json` |
| `npm run e2e` | Ejecuta pruebas E2E con Playwright |

## Testing y cobertura

Comandos:

```bash
cd EcoAula-front
npm run test
npm run test:coverage
npm run coverage:badge
npm run e2e
```

Salidas:

- HTML coverage: `EcoAula-front/coverage/index.html`
- Resumen coverage: `EcoAula-front/coverage/coverage-summary.json`
- Badge JSON: `EcoAula-front/docs/badges/coverage.json`

## Workflows de GitHub Actions

| Workflow | Archivo | Trigger | Objetivo |
| --- | --- | --- | --- |
| Frontend CI | `.github/workflows/frontend-ci.yml` | `push` y `pull_request` a `dev` y `main` | Unit, coverage, E2E y artifacts |
| Publish Frontend Docs | `.github/workflows/pages.yml` | `push` a `dev` | Regenera coverage badge y publica `docs/` en Pages |

## Nota importante sobre README y badges

Para que el README y los badges se vean en GitHub, el archivo `README.md` debe estar en la raiz del repo y el commit debe estar empujado a la rama remota (`origin/main`).

