<template>
  <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 flex flex-col">
    <div class="flex items-center gap-2 mb-6">
      <span class="material-symbols-outlined text-primary">calendar_month</span>
      <h3 class="font-bold text-slate-900 dark:text-white">Fecha de Registro</h3>
    </div>
    <div class="flex-1 flex flex-col">
      <div class="flex items-center justify-between mb-4">
        <span class="text-sm font-bold text-slate-700 dark:text-slate-300">Octubre 2023</span>
        <div class="flex gap-2">
          <button class="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" type="button">
            <span class="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button class="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" type="button">
            <span class="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
      <div class="grid grid-cols-7 gap-1 text-center mb-2">
        <span v-for="day in ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do']" :key="day" class="text-[10px] font-bold text-slate-400 uppercase">
          {{ day }}
        </span>
      </div>
      <div class="grid grid-cols-7 gap-1 text-center">
        <!-- Renderizando días de ejemplo como en el HTML -->
        <div v-for="d in prevDays" :key="'prev'+d" class="h-8 flex items-center justify-center text-xs text-slate-300">{{ d }}</div>
        <div 
          v-for="d in currentMonthDays" 
          :key="'curr'+d" 
          class="h-8 flex items-center justify-center text-xs text-slate-700 dark:text-slate-400"
          :class="{ 'font-bold bg-primary/10 rounded-lg text-primary border border-primary/20': d === 10 }"
        >
          {{ d }}
        </div>
      </div>
      <div class="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <span class="text-[10px] text-slate-400 uppercase font-bold">Seleccionado:</span>
        <span class="text-xs font-bold text-primary">10 de Octubre, 2023</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const prevDays = [25, 26, 27, 28, 29, 30];
const currentMonthDays = Array.from({ length: 15 }, (_, i) => i + 1);
</script>
