<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <WasteTypeSelector v-model="formData.wasteType" />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="space-y-6">
        
        <!-- Cantidad -->
        <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
          <div class="flex items-center gap-2 mb-6">
            <span class="material-symbols-outlined text-primary">scale</span>
            <h3 class="font-bold text-slate-900 dark:text-white">Cantidad</h3>
          </div>
          <div class="relative flex items-center">
            <input 
              v-model="formData.quantity"
              class="block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary text-lg font-semibold p-4 pr-16" 
              placeholder="0.00" 
              step="0.01" 
              type="number"
            />
            <span class="absolute right-6 text-slate-400 font-bold text-sm uppercase tracking-widest">kg</span>
          </div>
          <p class="mt-4 text-xs text-slate-400">Ingrese el peso exacto verificado en la báscula institucional.</p>
        </div>

      </div>

      <RegistrationCalendar />
    </div>

    <!-- Observaciones -->
    <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
      <div class="flex items-center gap-2 mb-4">
        <span class="material-symbols-outlined text-primary">notes</span>
        <h3 class="font-bold text-slate-900 dark:text-white">Observaciones Operativas</h3>
      </div>
      <textarea 
        v-model="formData.observations"
        class="block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary text-sm p-4" 
        placeholder="Especifique el origen del material, estado de limpieza o cualquier anomalía detectada..." 
        rows="3"
      ></textarea>
    </div>

    <div class="pt-4 flex justify-end items-center gap-4">
      <button class="px-8 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors" type="reset">
        Descartar
      </button>
      <button 
        class="bg-primary text-white px-12 py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-primary/30 hover:bg-[#142a4a] transition-all active:scale-[0.98] flex items-center gap-3" 
        type="submit"
      >
        <span class="material-symbols-outlined text-xl">save</span>
        Confirmar Registro
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import WasteTypeSelector from './WasteTypeSelector.vue';
import RegistrationCalendar from './RegistrationCalendar.vue';

const formData = reactive({
  wasteType: 'papel',
  quantity: '',
  status: 'pendiente',
  observations: ''
});

const handleSubmit = () => {
  console.log('Form submitted:', formData);
};
</script>
