<script setup lang="ts">
const props = defineProps<{
  filtroActivo: string
}>()

const emit = defineEmits<{
  (e: 'setFiltro', f: 'todas' | 'alta' | 'media' | 'baja'): void
}>()

const filtros = [
  { value: 'todas', label: 'Todas' },
  { value: 'alta',  label: 'Alta' },
  { value: 'media', label: 'Media' },
  { value: 'baja',  label: 'Baja' },
] as const
</script>

<template>
  <div class="alertas-filtros">
    <span class="filtros-label">PRIORIDAD:</span>
    <button
      v-for="f in filtros"
      :key="f.value"
      class="prioridad-btn"
      :class="[f.value, { active: props.filtroActivo === f.value }]"
      @click="emit('setFiltro', f.value)"
    >
      <!-- Dot solo en las prioridades, no en "Todas" -->
      <span v-if="f.value !== 'todas'" class="prioridad-dot" :class="f.value"></span>
      {{ f.label }}
    </button>
  </div>
</template>

<style scoped>
.alertas-filtros {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 10px 16px;
  align-self: flex-start;
}

.filtros-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-right: 8px;
}

.prioridad-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border-radius: 20px;
  border: none;
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s;
}

.prioridad-btn:hover { background: #f1f5f9; }
.prioridad-btn.active {
  background: #f1f5f9;
  color: var(--text-main);
  font-weight: 700;
}

.prioridad-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.05); /* Suavizar el borde */
}

.prioridad-dot.alta  { background: var(--accent-red); }
.prioridad-dot.media { background: var(--accent-orange); }
.prioridad-dot.baja  { background: var(--text-muted); }
</style>
