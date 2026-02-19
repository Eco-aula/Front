<script setup lang="ts">
import { useAlertas } from '@/composables/useAlertas'
import AlertasFiltros from '@/components/alertas/AlertasFiltros.vue'
import AlertasLista from '@/components/alertas/AlertasLista.vue'
import AlertasStats from '@/components/alertas/AlertasStats.vue'

const {
  filtroPrioridad,
  setFiltro,
  alertasPaginadas,
  alertasFiltradas,
  currentPage,
  totalPages,
  goToPage,
  stats,
  gestionarAlerta,
} = useAlertas()
</script>

<template>
  <div class="alertas-view">
    <!-- Cabecera -->
    <div class="alertas-header">
      <div class="dashboard-title">
        <h2>Gestión de Alertas</h2>
        <p>Supervise y gestione las alertas críticas de la Institución.</p>
      </div>
      <button class="export-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" x2="12" y1="3" y2="15"/>
        </svg>
        Exportar Reporte
      </button>
    </div>

    <!-- Filtros de prioridad -->
    <AlertasFiltros
      :filtro-activo="filtroPrioridad"
      @set-filtro="setFiltro"
    />

    <!-- Lista de alertas + paginación -->
    <AlertasLista
      :alertas="alertasPaginadas"
      :total-filtradas="alertasFiltradas.length"
      :current-page="currentPage"
      :total-pages="totalPages"
      @gestionar="gestionarAlerta"
      @go-to-page="goToPage"
    />

    <!-- Stats del pie -->
    <AlertasStats
      :pendientes-criticas="stats.pendientesCriticas"
      :en-gestion="stats.enGestion"
      :resueltas-hoy="stats.resueltasHoy"
    />
  </div>
</template>

<style scoped>
.alertas-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.alertas-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.export-btn {
  background: var(--accent-navy);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
