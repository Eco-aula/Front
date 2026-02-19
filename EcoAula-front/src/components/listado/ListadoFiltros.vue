<script setup lang="ts">
defineProps<{
  filtroPorTipo: string
  filtroRangoFecha: string
  filtroEstado: string
  opcionesTipo: { value: string; label: string }[]
  opcionesRango: { value: string; label: string }[]
  opcionesEstado: { value: string; label: string }[]
}>()

const emit = defineEmits<{
  (e: 'update:filtroPorTipo', val: string): void
  (e: 'update:filtroRangoFecha', val: string): void
  (e: 'update:filtroEstado', val: string): void
  (e: 'filtrar'): void
}>()
</script>

<template>
  <div class="listado-filters card">
    <div class="filter-group">
      <label class="filter-label">Tipo de Residuo</label>
      <select
        class="filter-select"
        :value="filtroPorTipo"
        @change="emit('update:filtroPorTipo', ($event.target as HTMLSelectElement).value)"
      >
        <option v-for="op in opcionesTipo" :key="op.value" :value="op.value">
          {{ op.label }}
        </option>
      </select>
    </div>

    <div class="filter-group">
      <label class="filter-label">Rango de Fecha</label>
      <select
        class="filter-select"
        :value="filtroRangoFecha"
        @change="emit('update:filtroRangoFecha', ($event.target as HTMLSelectElement).value)"
      >
        <option v-for="op in opcionesRango" :key="op.value" :value="op.value">
          {{ op.label }}
        </option>
      </select>
    </div>

    <div class="filter-group">
      <label class="filter-label">Estado</label>
      <select
        class="filter-select"
        :value="filtroEstado"
        @change="emit('update:filtroEstado', ($event.target as HTMLSelectElement).value)"
      >
        <option v-for="op in opcionesEstado" :key="op.value" :value="op.value">
          {{ op.label }}
        </option>
      </select>
    </div>

    <button class="filter-btn" @click="emit('filtrar')">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
      </svg>
      Filtrar
    </button>
  </div>
</template>

<style scoped>
.listado-filters {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  padding: 20px 24px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 160px;
}

.filter-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
}

.filter-select {
  padding: 9px 12px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: white;
  font-size: 13px;
  color: var(--text-main);
  cursor: pointer;
  appearance: auto;
  outline: none;
  transition: border-color 0.2s;
}

.filter-select:focus {
  border-color: var(--accent-navy);
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 20px;
  background: var(--accent-navy);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s;
  align-self: flex-end;
}

.filter-btn:hover {
  opacity: 0.88;
}
</style>
