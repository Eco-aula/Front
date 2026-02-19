import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const summaryPath = resolve(process.cwd(), process.argv[2] ?? 'coverage/coverage-summary.json')
const outputPath = resolve(process.cwd(), process.argv[3] ?? 'docs/badges/coverage.json')
const metric = (process.argv[4] ?? 'lines').toLowerCase()

const summary = JSON.parse(readFileSync(summaryPath, 'utf8'))
const metricValue = summary?.total?.[metric]?.pct

if (!Number.isFinite(metricValue)) {
  throw new Error(
    `No se encontro el porcentaje de cobertura para la metrica "${metric}" en ${summaryPath}`,
  )
}

const pct = Math.round(metricValue * 10) / 10

const getColor = (value) => {
  if (value >= 90) return 'brightgreen'
  if (value >= 80) return 'green'
  if (value >= 70) return 'yellow'
  if (value >= 60) return 'orange'
  return 'red'
}

const badge = {
  schemaVersion: 1,
  label: 'coverage',
  message: `${pct.toFixed(1)}%`,
  color: getColor(pct),
}

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, `${JSON.stringify(badge, null, 2)}\n`, 'utf8')

console.log(`Badge de cobertura (${metric}) generado en ${outputPath}: ${badge.message}`)
