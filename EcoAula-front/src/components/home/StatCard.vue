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
