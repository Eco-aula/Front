<script setup lang="ts">
defineProps<{
  label: string
  value: string
  unit?: string
  trend?: string
  trendDesc?: string
  trendUp?: boolean
  isHighlight?: boolean
}>()
</script>

<template>
  <div class="card" :class="{ 'highlight-card': isHighlight }">
    <div class="card-label">{{ label }}</div>
    <div class="card-value">
      {{ value }} <span v-if="unit">{{ unit }}</span>
    </div>
    
    <div v-if="trend" class="trend" :class="trendUp ? 'up' : 'down'">
      {{ trend }} <span class="trend-desc">{{ trendDesc }}</span>
    </div>

    <slot></slot>
  </div>
</template>

<style scoped>
/* Las clases globales como .card se quedan en main.css o se heredan, 
   pero sus extensiones específicas van aquí */
.highlight-card {
  background: var(--accent-navy);
  color: white;
  border: none;
  position: relative;
  overflow: hidden;
}

.highlight-card .card-label {
  color: rgba(255, 255, 255, 0.7);
}

.card-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted);
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.card-value {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 24px;
}

.card-value span {
  font-size: 20px;
  font-weight: 500;
  margin-left: 4px;
}

.trend {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent-green);
  display: flex;
  align-items: center;
  gap: 4px;
}

.trend.up::before {
  content: "↗";
}

.trend-desc {
  font-weight: 400;
  color: var(--text-muted);
  margin-left: 4px;
}

/* Soporte para slots (barra de progreso) */
:deep(.progress-container) {
  margin-top: 12px;
}

:deep(.progress-bar-bg) {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin-bottom: 12px;
  position: relative;
}

:deep(.progress-bar-fill) {
  height: 100%;
  background: white;
  border-radius: 4px;
}

:deep(.progress-info) {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
}

:deep(.percentage-badge) {
  position: absolute;
  right: 0;
  top: -30px;
  font-weight: 800;
  font-size: 18px;
}
</style>
