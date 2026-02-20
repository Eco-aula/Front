<script setup lang="ts">
import { useListado } from '@/composables/useListado'
import ListadoFiltros from '@/components/listado/ListadoFiltros.vue'
import ListadoTabla from '@/components/listado/ListadoTabla.vue'
import ListadoStats from '@/components/listado/ListadoStats.vue'

const {
  filtroPorTipo,
  filtroRangoFecha,
  filtroEstado,
  opcionesTipo,
  opcionesRango,
  opcionesEstado,
  aplicarFiltros,
  eliminarResiduo,
  residuosPaginados,
  residuosFiltrados,
  currentPage,
  totalPages,
  goToPage,
  stats,
  loading,
  error,
  isEmpty,
  recargar,
} = useListado()
</script>

<template>
  <div class="listado-view">
    <div class="listado-header">
      <div class="dashboard-title">
        <h2>Listado de Residuos</h2>
        <p>Gestion y seguimiento operativo de la recoleccion institucional.</p>
      </div>
    </div>

    <ListadoFiltros
      v-model:filtroPorTipo="filtroPorTipo"
      v-model:filtroRangoFecha="filtroRangoFecha"
      v-model:filtroEstado="filtroEstado"
      :opcionesTipo="opcionesTipo"
      :opcionesRango="opcionesRango"
      :opcionesEstado="opcionesEstado"
      @filtrar="aplicarFiltros"
    />

    <div v-if="loading" class="state-card card" role="status">
      Cargando residuos...
    </div>

    <div v-else-if="error" class="state-card card state-card-error" role="alert">
      <p>{{ error }}</p>
      <button class="retry-btn" @click="recargar">Reintentar</button>
    </div>

    <div v-else-if="isEmpty" class="state-card card">
      No hay residuos registrados para los filtros seleccionados.
    </div>

    <ListadoTabla
      v-else
      :residuos="residuosPaginados"
      :current-page="currentPage"
      :total-pages="totalPages"
      :total-filtrados="residuosFiltrados.length"
      :items-per-page="4"
      @go-to-page="goToPage"
      @eliminar-residuo="eliminarResiduo"
    />

    <ListadoStats
      :pendientes="stats.pendientes"
      :recogidos="stats.recogidos"
      :total-kg="stats.totalKg"
    />
  </div>
</template>

<style scoped>
.listado-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.listado-header {
  margin-bottom: 4px;
}

.state-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-weight: 600;
}

.state-card-error {
  color: #991b1b;
  border: 1px solid #fecaca;
  background: #fef2f2;
}

.retry-btn {
  border: none;
  border-radius: 8px;
  background: var(--accent-navy);
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
