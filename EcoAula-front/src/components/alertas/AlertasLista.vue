<script setup lang="ts">
import type { Alerta } from '@/composables/useAlertas'

defineProps<{
  alertas: Alerta[]
  totalFiltradas: number
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'gestionar', id: number): void
  (e: 'goToPage', page: number): void
}>()

// Icono según categoría
const iconoCategoria: Record<string, string> = {
  organico:  `<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C10 14.5 12 15 15 15"/>`,
  papel:     `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`,
  plastico:  `<path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/><path d="m13.378 9.633 4.096 1.098 1.097-4.096"/>`,
  vidrio:    `<path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 10v12"/><path d="M11 2 7 10"/><path d="M13 2l4 8"/>`,
}

const estadoLabel: Record<string, string> = {
  iniciada: 'Iniciada',
  proceso:  'Proceso',
  resuelta: 'Resuelta',
}

const estadosPosibles = ['iniciada', 'proceso', 'resuelta'] as const

function getIcono(cat: string): string {
  return iconoCategoria[cat] ?? `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`
}
</script>

<template>
  <div class="alertas-lista">
    <!-- Fila de cada alerta -->
    <div
      v-for="alerta in alertas"
      :key="alerta.id"
      class="alerta-row card"
      :class="alerta.prioridad"
    >
      <!-- Borde lateral de prioridad -->
      <div class="prioridad-borde" :class="alerta.prioridad"></div>

      <!-- Icono categoría -->
      <div class="alerta-icon-wrap" :class="alerta.prioridad">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="getIcono(alerta.categoria)" />
      </div>

      <!-- Info -->
      <div class="alerta-info">
        <h4 class="alerta-titulo">{{ alerta.titulo }}</h4>
        <div class="alerta-fecha">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
            <line x1="16" x2="16" y1="2" y2="6"/>
            <line x1="8" x2="8" y1="2" y2="6"/>
            <line x1="3" x2="21" y1="10" y2="10"/>
          </svg>
          {{ alerta.fecha }} - {{ alerta.hora }}
        </div>
      </div>

      <!-- Flujo de estados -->
      <div class="alerta-flujo">
        <div
          v-for="(est, idx) in estadosPosibles"
          :key="est"
          class="flujo-paso"
          :class="{
            completado: estadosPosibles.indexOf(alerta.estado) >= idx,
            activo:     alerta.estado === est,
          }"
        >
          <div class="flujo-circulo">
            <!-- Checkmark si completado, número si no -->
            <svg v-if="estadosPosibles.indexOf(alerta.estado) > idx" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span v-else>{{ idx + 1 }}</span>
          </div>
          <span class="flujo-label">{{ estadoLabel[est] }}</span>
        </div>

        <!-- Líneas entre pasos -->
        <div class="flujo-lineas">
          <div class="flujo-linea" :class="{ llena: estadosPosibles.indexOf(alerta.estado) >= 1 }"></div>
          <div class="flujo-linea" :class="{ llena: estadosPosibles.indexOf(alerta.estado) >= 2 }"></div>
        </div>
      </div>

      <!-- Acción -->
      <div class="alerta-accion">
        <button
          v-if="alerta.estado !== 'resuelta'"
          class="gestionar-btn"
          @click="emit('gestionar', alerta.id)"
        >
          Gestionar
        </button>
        <span v-else class="cerrada-badge">Cerrada</span>
      </div>
    </div>

    <!-- Paginación -->
    <div class="alertas-paginacion">
      <span class="paginacion-info">MOSTRANDO {{ alertas.length }} DE {{ totalFiltradas }} ALERTAS ACTIVAS</span>
      <div class="pagination-controls">
        <button class="page-btn" :disabled="currentPage === 1" @click="emit('goToPage', currentPage - 1)">‹</button>
        <button
          v-for="p in totalPages"
          :key="p"
          class="page-btn"
          :class="{ active: p === currentPage }"
          @click="emit('goToPage', p)"
        >{{ p }}</button>
        <button class="page-btn" :disabled="currentPage === totalPages" @click="emit('goToPage', currentPage + 1)">›</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alertas-lista {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.alerta-row {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 18px 24px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  border-left: 4px solid transparent;
  transition: box-shadow 0.2s;
}

.alerta-row:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

.alerta-row.alta   { border-left-color: var(--accent-red); }
.alerta-row.media  { border-left-color: var(--accent-orange); }
.alerta-row.baja   { border-left-color: var(--text-muted); }

.prioridad-borde { display: none; }

.alerta-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.alerta-icon-wrap.alta  { background: #fee2e2; color: var(--accent-red); }
.alerta-icon-wrap.media { background: #fff7ed; color: var(--accent-orange); }
.alerta-icon-wrap.baja  { background: #f1f5f9; color: var(--text-muted); }

.alerta-info {
  flex: 1;
  min-width: 0;
}

.alerta-titulo {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-main);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.alerta-fecha {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: var(--text-muted);
}

.alerta-flujo {
  display: flex;
  align-items: flex-start;
  gap: 32px;
  position: relative;
  flex-shrink: 0;
}

.flujo-lineas {
  position: absolute;
  top: 13px;
  left: 20px;
  right: 20px;
  display: flex;
  gap: 0;
  z-index: 0;
  pointer-events: none;
  justify-content: space-between;
  width: calc(100% - 24px);
}

.flujo-linea {
  flex: 1;
  height: 2px;
  background: #e2e8f0;
  transition: background 0.3s;
}

.flujo-linea.llena { background: var(--accent-green); }

.flujo-paso {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  z-index: 1;
}

.flujo-circulo {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid #e2e8f0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: var(--text-muted);
  transition: all 0.3s;
}

.flujo-paso.completado .flujo-circulo {
  background: var(--accent-green);
  border-color: var(--accent-green);
  color: white;
}

.flujo-paso.activo .flujo-circulo {
  border-color: var(--accent-navy);
  color: var(--accent-navy);
  font-weight: 800;
}

.flujo-label {
  font-size: 10px;
  color: var(--text-muted);
  white-space: nowrap;
}

.flujo-paso.activo .flujo-label {
  font-weight: 700;
  color: var(--text-main);
}

.alerta-accion {
  flex-shrink: 0;
  min-width: 90px;
  text-align: right;
}

.gestionar-btn {
  padding: 8px 20px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: white;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-main);
  cursor: pointer;
  transition: all 0.2s;
}

.gestionar-btn:hover {
  background: var(--accent-navy);
  color: white;
  border-color: var(--accent-navy);
}

.cerrada-badge {
  font-size: 12px;
  color: var(--text-muted);
  font-style: italic;
}

.alertas-paginacion {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}

.paginacion-info {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.3px;
}

/* Reutilizamos clases globales de paginación pero scoped aquí */
.pagination-controls {
  display: flex;
  gap: 4px;
}

.page-btn {
  padding: 5px 12px;
  border: 1px solid var(--border-color);
  background: white;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  color: var(--text-muted);
}
</style>
