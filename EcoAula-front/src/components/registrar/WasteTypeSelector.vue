<template>
  <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
    <div class="flex items-center gap-2 mb-6">
      <span class="material-symbols-outlined text-primary">recycling</span>
      <h3 class="font-bold text-slate-900 dark:text-white">Tipo de Residuo</h3>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <WasteTypeCard 
        v-for="type in wasteTypes" 
        :key="type.value"
        v-bind="type"
        v-model="selectedType"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import WasteTypeCard from './WasteTypeCard.vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);

const selectedType = ref(props.modelValue);

watch(selectedType, (newVal) => {
  emit('update:modelValue', newVal);
});

const wasteTypes = [
  { value: 'papel', label: 'Papel', icon: 'description' },
  { value: 'plastico', label: 'Plástico', icon: 'liquor' },
  { value: 'vidrio', label: 'Vidrio', icon: 'wine_bar' },
  { value: 'organico', label: 'Orgánico', icon: 'compost' },
  { value: 'carton', label: 'Cartón', icon: 'inventory_2' },
  { value: 'metal', label: 'Metal', icon: 'hardware' },
];
</script>
