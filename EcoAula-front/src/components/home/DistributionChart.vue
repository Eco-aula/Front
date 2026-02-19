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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.chart-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px 0;
}

.donut-placeholder {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  /* El borde se maneja ahora via SVG o via CSS if necessary */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.donut-center {
  text-align: center;
}

.donut-center .big-num {
  font-size: 24px;
  font-weight: 800;
  display: block;
}

.donut-center .total-label {
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.chart-legend {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.legend-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  font-size: 13px;
}

.legend-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

.legend-value {
  font-weight: 700;
}
</style>
