<script setup lang="ts">
import AlertsCard from '@/components/home/AlertsCard.vue'
import DistributionChart from '@/components/home/DistributionChart.vue'
import HistoryTable from '@/components/home/HistoryTable.vue'
import StatCard from '@/components/home/StatCard.vue'
import { useDashboard } from '@/composables/useDashboard'

const { stats, topCategory, alerts, chartData, history, loading, error, recargar } =
  useDashboard()
</script>

<template>
  <div class="dashboard-view">
    <div class="dashboard-header">
      <div class="dashboard-title">
        <h2>Dashboard General</h2>
        <p>Administracion y supervision del flujo de residuos institucionales.</p>
      </div>
      <div class="status-badge">
        <span class="badge">ESTADO OPERATIVO</span>
      </div>
    </div>

    <div v-if="loading" class="state-card card" role="status">
      Cargando resumen de contenedores...
    </div>

    <div v-else-if="error" class="state-card card state-card-error" role="alert">
      <p>{{ error }}</p>
      <button class="retry-btn" @click="recargar">Reintentar</button>
    </div>

    <template v-else>
      <div class="grid-row">
        <StatCard
          v-for="(stat, index) in stats"
          :key="index"
          :label="stat.label"
          :value="stat.value"
          :unit="stat.unit"
          :trend="stat.trend"
          :trend-desc="stat.trendDesc"
          :trend-up="stat.trendUp"
        />

        <StatCard :label="topCategory.label" :value="topCategory.value" is-highlight>
          <div class="progress-container">
            <div class="progress-bar-bg">
              <div
                class="progress-bar-fill"
                :style="{ width: topCategory.percentage + '%' }"
              ></div>
              <span class="percentage-badge">{{ topCategory.percentage }}%</span>
            </div>
            <p class="progress-info">{{ topCategory.info }}</p>
          </div>

          <svg
            style="position: absolute; right: -20px; bottom: -20px; opacity: 0.1"
            width="140"
            height="140"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </StatCard>

        <AlertsCard :alerts="alerts" />
      </div>

      <div class="bottom-row">
        <DistributionChart :data="chartData" />
        <HistoryTable :items="history" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.dashboard-view {
  display: flex;
  flex-direction: column;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
}

.dashboard-title h2 {
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 8px 0;
}

.dashboard-title p {
  color: var(--text-muted);
  margin: 0;
}

.status-badge {
  text-align: right;
}

.badge {
  color: var(--accent-green);
  font-weight: 700;
  font-size: 12px;
  background: rgba(16, 185, 129, 0.1);
  padding: 4px 12px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 6px;
}

.grid-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.bottom-row {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 24px;
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
