# Frontend Testing

> Documentación técnica de la estrategia de pruebas del frontend de EcoAula.

## Resumen ejecutivo

| Indicador | Resultado |
| --- | --- |
| Cobertura de statements | 96.20% |
| Cobertura de branches | 94.66% |
| Cobertura de functions | 92.21% |
| Cobertura de lines | 96.11% |
| Umbral mínimo requerido | 75% |
| Estado final | Cumplido con margen alto |

## 1. Rama de trabajo

- Rama utilizada: `test/frontend-max-coverage`.
- Objetivo: aumentar cobertura y estabilidad sin bloquear el desarrollo funcional.
- Integración: cambios incorporados a `dev` tras validar ejecución completa.

## 2. Objetivo de testing

Maximizar cobertura y estabilidad del frontend con foco en:

- incrementar cobertura global;
- asegurar componentes críticos;
- validar flujos reales de usuario;
- integrar pruebas end-to-end;
- garantizar cumplimiento de cobertura mínima (`>= 75%`).

## 3. Stack de pruebas

| Área | Herramienta | Uso |
| --- | --- | --- |
| Unit testing | `Vitest` | Pruebas unitarias rápidas y deterministas |
| Integration testing | `@testing-library/vue` | Pruebas orientadas a comportamiento del usuario |
| Mocking API | `MSW` | Mocking controlado de red para escenarios de prueba |
| Cobertura | `@vitest/coverage-v8` | Medición de cobertura por statements/branches/functions/lines |
| E2E | `Playwright` | Validación de flujos críticos en entorno real |

## 4. Estrategia de pruebas

### 4.1 Pruebas unitarias

Cobertura aplicada sobre:

- componentes individuales;
- stores (estado y acciones);
- utilidades;
- router;
- capa de API.

Casos validados:

- renderizado correcto;
- props y eventos;
- estados condicionales;
- manejo de errores;
- validaciones de formularios;
- ramas condicionales (`if / else`).

### 4.2 Pruebas de integración

Validación de interacción real entre módulos:

- navegación entre rutas;
- interacción componente + store;
- flujo completo de formularios;
- estados asíncronos;
- renderizado condicionado por datos.

### 4.3 Pruebas End-to-End (E2E)

Flujos críticos cubiertos:

- login;
- registro;
- creación de residuo;
- visualización en listado;
- navegación principal.

## 5. Cobertura

Comando principal:

```bash
npm run test:coverage
```

Reporte visual:

![Reporte de cobertura Frontend](assets/frontend-coverage.png)

Interpretación:

- la cobertura supera ampliamente el umbral mínimo requerido;
- los resultados son estables y reproducibles en ejecuciones limpias.

## 6. Buenas prácticas aplicadas

- separación clara de responsabilidades;
- mocking controlado de dependencias;
- tests independientes y deterministas;
- sin dependencia de backend real para unit/integration;
- E2E aislado por flujos;
- código de pruebas mantenible;
- cobertura real, no artificial.

## 7. Garantía de estabilidad

Validación en entorno limpio:

```bash
npm ci
npm run test
npm run test:coverage
npm run e2e
```

Resultado esperado:

- ejecución sin errores;
- cobertura consistente;
- flujos críticos funcionales.

## 8. Conclusión

El frontend dispone de:

- pruebas unitarias;
- pruebas de integración;
- pruebas end-to-end;
- cobertura superior al 90%;
- ejecución reproducible.

Este enfoque reduce el riesgo de regresiones y mejora la seguridad de cambios futuros.
