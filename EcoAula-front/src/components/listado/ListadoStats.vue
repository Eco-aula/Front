<script setup lang="ts">
defineProps<{
  pendientes: number
  recogidos: number
  totalKg: string
}>()
</script>

<template>
  <div class="listado-stats">
    <div class="stat-item card">
      <div class="stat-icon pendiente-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
        </svg>
      </div>
      <div class="stat-text">
        <span class="stat-label">Pendientes</span>
        <span class="stat-val">{{ pendientes }}</span>
      </div>
    </div>

    <div class="stat-item card">
      <div class="stat-icon recogido-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <div class="stat-text">
        <span class="stat-label">Recogidos (Mes)</span>
        <span class="stat-val">{{ recogidos }}</span>
      </div>
    </div>

    <div class="stat-item card">
      <div class="stat-icon total-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
      </div>
      <div class="stat-text">
        <span class="stat-label">Total KG Recolectados</span>
        <span class="stat-val">{{ totalKg }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.listado-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
}

.stat-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pendiente-icon {
  background: #fff7ed;
  color: var(--accent-orange);
}

.recogido-icon {
  background: #dcfce7;
  color: var(--accent-green);
}

.total-icon {
  background: #eff6ff;
  color: var(--highlight-blue);
}

.stat-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
}

.stat-val {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-main);
  line-height: 1;
}
</style>
