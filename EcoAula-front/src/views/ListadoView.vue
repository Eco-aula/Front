<script setup lang="ts">
import { useListado } from '@/composables/useListado'
import ListadoFiltros from '@/components/listado/ListadoFiltros.vue'
import ListadoTabla from '@/components/listado/ListadoTabla.vue'
import ListadoStats from '@/components/listado/ListadoStats.vue'

const {
  filtroPorTipo, filtroRangoFecha, filtroEstado,
  opcionesTipo, opcionesRango, opcionesEstado,
  aplicarFiltros,
  residuosPaginados, residuosFiltrados,
  currentPage, totalPages, goToPage,
  stats,
} = useListado()
</script>

<template>
  <div class="listado-view">
    <div class="listado-header">
      <div class="dashboard-title">
        <h2>Listado de Residuos</h2>
        <p>Gestión y seguimiento operativo de la recolección institucional.</p>
      </div>
    </div>

    <!-- Filtros -->
    <ListadoFiltros
      v-model:filtroPorTipo="filtroPorTipo"
      v-model:filtroRangoFecha="filtroRangoFecha"
      v-model:filtroEstado="filtroEstado"
      :opcionesTipo="opcionesTipo"
      :opcionesRango="opcionesRango"
      :opcionesEstado="opcionesEstado"
      @filtrar="aplicarFiltros"
    />

    <!-- Tabla + Paginación -->
    <ListadoTabla
      :residuos="residuosPaginados"
      :current-page="currentPage"
      :total-pages="totalPages"
      :total-filtrados="residuosFiltrados.length"
      :items-per-page="4"
      @go-to-page="goToPage"
    />

    <!-- Estadísticas del pie -->
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
</style>
