<template>
  <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 flex flex-col h-full">
    <div class="flex items-center gap-2 mb-6">
      <span class="material-symbols-outlined text-primary">calendar_month</span>
      <h3 class="font-bold text-slate-900 dark:text-white">Fecha de Registro</h3>
    </div>
    <div class="flex-1 flex flex-col">
      <!-- Header del Calendario -->
      <div class="flex items-center justify-between mb-4">
        <span class="text-sm font-bold text-slate-700 dark:text-slate-300">
          {{ monthNames[viewMonth] }} {{ viewYear }}
        </span>
        <div class="flex gap-2">
          <button 
            @click="prevMonth"
            class="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group" 
            type="button"
          >
            <span class="material-symbols-outlined text-sm text-slate-500 group-hover:text-primary transition-colors">chevron_left</span>
          </button>
          <button 
            @click="nextMonth"
            class="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group" 
            type="button"
          >
            <span class="material-symbols-outlined text-sm text-slate-500 group-hover:text-primary transition-colors">chevron_right</span>
          </button>
        </div>
      </div>

      <!-- Días de la Semana -->
      <div class="grid grid-cols-7 gap-1 text-center mb-2">
        <span v-for="day in ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do']" :key="day" class="text-[10px] font-bold text-slate-400 uppercase">
          {{ day }}
        </span>
      </div>

      <!-- Cuadrícula de Días -->
      <div class="grid grid-cols-7 gap-1 text-center">
        <!-- Días del mes anterior -->
        <div 
          v-for="day in prevMonthDays" 
          :key="'prev-'+day" 
          class="h-9 flex items-center justify-center text-xs text-slate-300 dark:text-slate-600 select-none"
        >
          {{ day }}
        </div>

        <!-- Días del mes actual -->
        <button 
          v-for="day in daysInMonth" 
          :key="'curr-'+day" 
          @click="selectDate(day)"
          type="button"
          class="h-9 flex items-center justify-center text-xs rounded-lg transition-all hover:bg-primary/10 hover:text-primary"
          :class="[
            isSelected(day) 
              ? 'font-bold bg-primary text-white shadow-md shadow-primary/20 scale-105' 
              : 'text-slate-700 dark:text-slate-400 hover:scale-110',
            isToday(day) && !isSelected(day) ? 'ring-1 ring-primary/30 text-primary font-semibold' : ''
          ]"
        >
          {{ day }}
        </button>

        <!-- Días del mes siguiente -->
        <div 
          v-for="day in nextMonthDays" 
          :key="'next-'+day" 
          class="h-9 flex items-center justify-center text-xs text-slate-300 dark:text-slate-600 select-none"
        >
          {{ day }}
        </div>
      </div>

      <!-- Footer con info de selección -->
      <div class="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <span class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Seleccionado:</span>
        <span class="text-xs font-bold text-primary animate-in fade-in slide-in-from-bottom-1">
          {{ formattedSelectedDate }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  modelValue?: Date;
}>();

const emit = defineEmits(['update:modelValue']);

// Nombres de meses en español
const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Estado del calendario
const selectedDate = ref(props.modelValue || new Date());
const viewDate = ref(new Date(selectedDate.value));

const viewMonth = computed(() => viewDate.value.getMonth());
const viewYear = computed(() => viewDate.value.getFullYear());

// Cálculos del calendario
const daysInMonth = computed(() => {
  return new Date(viewYear.value, viewMonth.value + 1, 0).getDate();
});

const firstDayOfMonth = computed(() => {
  let day = new Date(viewYear.value, viewMonth.value, 1).getDay();
  return day === 0 ? 6 : day - 1; // Ajuste para que empiece en lunes
});

const prevMonthDays = computed(() => {
  const days = [];
  const lastDayOfPrevMonth = new Date(viewYear.value, viewMonth.value, 0).getDate();
  for (let i = firstDayOfMonth.value - 1; i >= 0; i--) {
    days.push(lastDayOfPrevMonth - i);
  }
  return days;
});

const nextMonthDays = computed(() => {
  const totalSlots = 42; // 6 filas de 7 días
  const usedSlots = firstDayOfMonth.value + daysInMonth.value;
  const remainingSlots = totalSlots - usedSlots;
  return Array.from({ length: remainingSlots }, (_, i) => i + 1);
});

const formattedSelectedDate = computed(() => {
  return `${selectedDate.value.getDate()} de ${monthNames[selectedDate.value.getMonth()]}, ${selectedDate.value.getFullYear()}`;
});

// Métodos
const prevMonth = () => {
  viewDate.value = new Date(viewYear.value, viewMonth.value - 1, 1);
};

const nextMonth = () => {
  viewDate.value = new Date(viewYear.value, viewMonth.value + 1, 1);
};

const selectDate = (day: number) => {
  selectedDate.value = new Date(viewYear.value, viewMonth.value, day);
  emit('update:modelValue', selectedDate.value);
};

const isSelected = (day: number) => {
  return (
    selectedDate.value.getDate() === day &&
    selectedDate.value.getMonth() === viewMonth.value &&
    selectedDate.value.getFullYear() === viewYear.value
  );
};

const isToday = (day: number) => {
  const today = new Date();
  return (
    today.getDate() === day &&
    today.getMonth() === viewMonth.value &&
    today.getFullYear() === viewYear.value
  );
};
</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
