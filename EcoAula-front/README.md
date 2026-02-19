# EcoAula-front

[![Frontend CI](https://github.com/Eco-aula/Front/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/Eco-aula/Front/actions/workflows/frontend-ci.yml)
[![Coverage](https://img.shields.io/endpoint?url=https%3A%2F%2Feco-aula.github.io%2FFront%2Fbadges%2Fcoverage.json)](https://eco-aula.github.io/Front/badges/coverage.json)

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

## Testing

### Unit + Integration (Vitest + Testing Library + MSW)

```sh
npm run test
```

Modo watch:

```sh
npm run test:watch
```

Con cobertura (texto + HTML):

```sh
npm run test:coverage
```

Reporte HTML de cobertura: `coverage/index.html`

### End-to-End (Playwright)

Instalacion inicial de navegador (una sola vez):

```sh
npx playwright install chromium
```

Ejecucion:

```sh
npm run e2e
```

### Badges (CI + Coverage)

- El badge de CI se actualiza con el workflow `frontend-ci.yml` en cada push/pull request a `dev` y `main`.
- El badge de cobertura usa la metrica `lines` de `coverage/coverage-summary.json`.
- El JSON publicado para Shields se genera en `docs/badges/coverage.json` y se publica en GitHub Pages en cada push a `dev`.

Regeneracion local del badge de cobertura:

```sh
npm run test:coverage
npm run coverage:badge
```

JSON local generado: `docs/badges/coverage.json`  
JSON publico (Pages): `https://eco-aula.github.io/Front/badges/coverage.json`
