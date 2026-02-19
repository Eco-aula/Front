<script setup lang="ts">
defineProps<{
  pendientesCriticas: number
  enGestion: number
  resueltasHoy: number
}>()
</script>

<template>
  <div class="alertas-stats">
    <!-- Pendientes críticas -->
    <div class="alerta-stat-card card">
      <div class="astat-header">
        <span class="astat-label pendiente">● PENDIENTES CRÍTICAS</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
          <line x1="12" x2="12" y1="9" y2="13"/>
          <line x1="12" x2="12.01" y1="17" y2="17"/>
        </svg>
      </div>
      <div class="astat-val">{{ String(pendientesCriticas).padStart(2, '0') }}</div>
      <div class="astat-desc">Requieren atención inmediata</div>
    </div>

    <!-- En gestión -->
    <div class="alerta-stat-card card">
      <div class="astat-header">
        <span class="astat-label proceso">● EN GESTIÓN</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
        </svg>
      </div>
      <div class="astat-val">{{ String(enGestion).padStart(2, '0') }}</div>
      <div class="astat-desc">Actualmente siendo procesadas</div>
    </div>

    <!-- Resueltas hoy -->
    <div class="alerta-stat-card card">
      <div class="astat-header">
        <span class="astat-label resuelta">● RESUELTAS HOY</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <div class="astat-val">{{ String(resueltasHoy).padStart(2, '0') }}</div>
      <div class="astat-desc">Objetivo diario: 10</div>
    </div>
  </div>
</template>

<style scoped>
.alertas-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.alerta-stat-card {
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.astat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.astat-label {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.astat-label.pendiente { color: var(--accent-red); }
.astat-label.proceso   { color: var(--highlight-blue); }
.astat-label.resuelta  { color: var(--accent-green); }

.astat-val {
  font-size: 40px;
  font-weight: 900;
  color: var(--text-main);
  line-height: 1;
  letter-spacing: -1px;
}

.astat-desc {
  font-size: 11px;
  color: var(--text-muted);
}
</style>
