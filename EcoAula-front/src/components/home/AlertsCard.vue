<script setup lang="ts">
interface Alert {
  id: number
  type: string
  title: string
  location: string
}

defineProps<{
  alerts: Alert[]
}>()
</script>

<template>
  <div class="card">
    <div class="card-header" style="margin-bottom: 12px">
      <div class="card-label" style="margin: 0">Alertas Activas</div>
      <span class="alerts-count">{{ alerts.length }}</span>
    </div>
    
    <div class="alerts-list">
      <div v-for="alert in alerts" :key="alert.id" class="alert-item" :class="alert.type">
        <div class="alert-icon" :class="alert.type">
          <!-- Icon based on type -->
          <svg v-if="alert.type === 'danger'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" x2="12" y1="9" y2="13" />
            <line x1="12" x2="12.01" y1="17" y2="17" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <div class="alert-content">
          <h5>{{ alert.title }}</h5>
          <p>{{ alert.location }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alerts-count {
  background: #fee2e2;
  color: #b91c1c;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 10px;
}

.alerts-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.alert-item {
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.alert-item.danger {
  background: #fef2f2;
}

.alert-item.warning {
  background: #fffbeb;
}

.alert-content h5 {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
}

.alert-content p {
  margin: 0;
  font-size: 11px;
  color: var(--text-muted);
}

.alert-icon.danger {
  color: var(--accent-red);
}
.alert-icon.warning {
  color: var(--accent-orange);
}
</style>
