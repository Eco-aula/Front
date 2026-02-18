<script setup lang="ts">
interface ChartItem {
  label: string
  value: number
  color: string
}

defineProps<{
  data: ChartItem[]
}>()
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h3>Distribución por Categoría</h3>
      <select class="chart-filter">
        <option>Últimos 30 días</option>
      </select>
    </div>

    <div class="chart-container">
      <div class="donut-placeholder">
        <svg width="180" height="180" viewBox="0 0 36 36" class="donut">
          <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1f5f9" stroke-width="3"></circle>
          
          <!-- Papel 45% (hardcoded for now to keep the same look, but we could dynamicize it) -->
          <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#1e293b" stroke-width="3" stroke-dasharray="45 55" stroke-dashoffset="25"></circle>
          <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#3b82f6" stroke-width="3" stroke-dasharray="25 75" stroke-dashoffset="80"></circle>
          <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#10b981" stroke-width="3" stroke-dasharray="20 80" stroke-dashoffset="55"></circle>
          <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f59e0b" stroke-width="3" stroke-dasharray="10 90" stroke-dashoffset="35"></circle>
        </svg>
        <div class="donut-center" style="position: absolute">
          <span class="big-num">100%</span>
          <span class="total-label">Total</span>
        </div>
      </div>

      <div class="chart-legend">
        <div v-for="item in data" :key="item.label" class="legend-item">
          <div class="legend-label">
            <span class="dot" :style="{ background: item.color }"></span>
            {{ item.label }}
          </div>
          <div class="legend-value">{{ item.value }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-filter {
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  color: #64748b;
}
</style>
