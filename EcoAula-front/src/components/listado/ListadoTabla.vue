<script setup lang="ts">
import type { ResiduoItem } from '@/composables/useListado'

const props = withDefaults(defineProps<{
  residuos: ResiduoItem[]
  currentPage: number
  totalPages: number
  totalFiltrados: number
  itemsPerPage?: number
}>(), { itemsPerPage: 4 })

const emit = defineEmits<{
  (e: 'goToPage', page: number): void
}>()

const iconMap: Record<string, string> = {
  description: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`,
  recycling: `<path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/><path d="m13.378 9.633 4.096 1.098 1.097-4.096"/>`,
  science: `<path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4"/><polyline points="9 3 9 11 12 8 15 11 15 3"/>`,
  restaurant: `<path d="M3 11l19-9-9 19-2-8-8-2z"/>`,
}

function getIconPath(icon: string): string {
  return iconMap[icon] ?? `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`
}
</script>

<template>
  <div class="card listado-tabla-card">
    <table class="data-table listado-table">
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Cantidad (Kg)</th>
          <th>Fecha de Registro</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="residuo in residuos" :key="residuo.id">
          <td class="tipo-cell">
            <span class="tipo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="getIconPath(residuo.icon)" />
            </span>
            {{ residuo.tipo }}
          </td>
          <td class="cantidad-cell">{{ residuo.cantidad }}</td>
          <td class="fecha-cell">{{ residuo.fecha }}</td>
          <td>
            <span class="estado-badge" :class="residuo.estado">
              {{ residuo.estado === 'recogido' ? 'Recogido' : 'Pendiente' }}
            </span>
          </td>
          <td class="acciones-cell">
            <button class="accion-btn" title="Ver detalle">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
            <button class="accion-btn danger" title="Eliminar">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="m19 6-.867 13.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 6"/>
                <path d="M10 11v6"/><path d="M14 11v6"/>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Paginación -->
    <div class="listado-pagination">
      <span class="pagination-info">
        Mostrando {{ (props.currentPage - 1) * props.itemsPerPage + 1 }} a
        {{ Math.min(props.currentPage * props.itemsPerPage, props.totalFiltrados) }}
        de {{ props.totalFiltrados }} entradas
      </span>
      <div class="pagination-controls">
        <button class="page-btn" :disabled="currentPage === 1" @click="emit('goToPage', currentPage - 1)">
          Anterior
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          class="page-btn"
          :class="{ active: page === currentPage }"
          @click="emit('goToPage', page)"
        >
          {{ page }}
        </button>
        <button class="page-btn" :disabled="currentPage === totalPages" @click="emit('goToPage', currentPage + 1)">
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.listado-tabla-card {
  padding: 0;
  overflow: hidden;
}

.listado-table {
  width: 100%;
  border-collapse: collapse;
}

.listado-table th {
  text-align: left;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  padding: 14px 20px;
  border-bottom: 1px solid var(--border-color);
  background: #f8fafc;
}

.listado-table td {
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 13px;
  color: var(--text-main);
}

.listado-table tbody tr:last-child td {
  border-bottom: none;
}

.listado-table tbody tr:hover {
  background: #f8fafc;
}

.tipo-cell {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
}

.tipo-icon {
  width: 28px;
  height: 28px;
  background: #f1f5f9;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  flex-shrink: 0;
}

.cantidad-cell {
  font-weight: 600;
  color: var(--highlight-blue);
}

.fecha-cell {
  color: var(--text-muted);
}

.estado-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
}

.estado-badge.recogido {
  background: #dcfce7;
  color: #166534;
}

.estado-badge.pendiente {
  background: #f1f5f9;
  color: var(--text-muted);
}

.acciones-cell {
  display: flex;
  gap: 8px;
  align-items: center;
}

.accion-btn {
  background: #f1f5f9;
  border: none;
  border-radius: 6px;
  padding: 6px;
  cursor: pointer;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  transition:
    background 0.2s,
    color 0.2s;
}

.accion-btn:hover {
  background: #e2e8f0;
  color: var(--text-main);
}

.accion-btn.danger:hover {
  background: #fee2e2;
  color: var(--accent-red);
}

.listado-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  border-top: 1px solid var(--border-color);
  background: #fafafa;
}

.pagination-info {
  font-size: 12px;
  color: var(--text-muted);
}

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
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  background: #f1f5f9;
  color: var(--text-main);
}

.page-btn.active {
  background: var(--accent-navy);
  color: white;
  border-color: var(--accent-navy);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
