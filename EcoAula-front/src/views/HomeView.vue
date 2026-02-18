<script setup lang="ts">
import { useDashboard } from '@/composables/useDashboard'
import StatCard from '@/components/home/StatCard.vue'
import AlertsCard from '@/components/home/AlertsCard.vue'
import DistributionChart from '@/components/home/DistributionChart.vue'
import HistoryTable from '@/components/home/HistoryTable.vue'

const { stats, topCategory, alerts, chartData, history } = useDashboard()
</script>

<template>
  <div class="dashboard-view">
    <div class="dashboard-header">
      <div class="dashboard-title">
        <h2>Dashboard General</h2>
        <p>Administración y supervisión del flujo de residuos Institucionales.</p>
      </div>
      <div class="status-badge">
        <span class="badge">ESTADO: ÓPTIMO</span>
        <div class="update-time">Actualizado: hace 5 minutos</div>
      </div>
    </div>

    <div class="grid-row">
      <!-- Total Waste Card -->
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

      <!-- Max Category Highlight Card -->
      <StatCard
        :label="topCategory.label"
        :value="topCategory.value"
        is-highlight
      >
        <div class="progress-container">
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" :style="{ width: topCategory.percentage + '%' }"></div>
            <span class="percentage-badge">{{ topCategory.percentage }}%</span>
          </div>
          <p class="progress-info">{{ topCategory.info }}</p>
        </div>

        <!-- Background Icon -->
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

      <!-- Active Alerts Card -->
      <AlertsCard :alerts="alerts" />
    </div>

    <div class="bottom-row">
      <!-- Categories Donut Chart -->
      <DistributionChart :data="chartData" />

      <!-- Recent History Table -->
      <HistoryTable :items="history" />
    </div>
  </div>
</template>
