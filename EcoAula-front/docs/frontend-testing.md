# Frontend Testing

## Objetivo

Mantener pruebas estables y utiles para detectar regresiones en:

- UI (componentes y vistas)
- logica de composables y stores
- integracion HTTP con el backend (`/api/v1`)
- flujos completos de usuario

## Stack de pruebas

- `Vitest`: unit tests e integracion
- `@testing-library/vue`: pruebas orientadas a comportamiento
- `MSW`: mocking de endpoints HTTP
- `Playwright`: pruebas E2E
- `@vitest/coverage-v8`: cobertura

## Estructura

```text
src/__tests__/           # unit + integration + smoke tests
src/mocks/               # handlers MSW para endpoints backend
e2e/                     # escenarios Playwright
coverage/                # reporte local de cobertura
docs/badges/coverage.json
```

## Comandos

Ejecutar pruebas unitarias/integracion:

```bash
npm run test
```

Ejecutar cobertura:

```bash
npm run test:coverage
```

Generar badge JSON:

```bash
npm run coverage:badge
```

Ejecutar E2E:

```bash
npm run e2e
```

## Cobertura actual

Resultado ejecutado localmente el **20 de febrero de 2026**:

- Statements: `93.41%`
- Branches: `88.84%`
- Functions: `88.37%`
- Lines: `93.07%`

Badge actualizado: `docs/badges/coverage.json`

## Escenarios minimos validados

- carga de dashboard (summary + volume by category)
- alta de usuario
- alta de residuo
- listado de residuos
- visualizacion de errores backend (`400/404`) usando campo `message`

## Reporte visual

![Reporte de cobertura Frontend](assets/frontend-coverage.png)
