<template>
  <label class="type-card cursor-pointer relative">
    <input 
      type="radio" 
      name="waste_type" 
      :value="value" 
      class="sr-only" 
      :checked="modelValue === value"
      @change="$emit('update:modelValue', value)"
    />
    <div class="border-2 border-slate-100 dark:border-slate-800 rounded-xl p-4 text-center hover:border-primary/50 transition-all flex flex-col items-center gap-3">
      <div class="icon-box w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 transition-colors">
        <span class="material-symbols-outlined text-2xl">{{ icon }}</span>
      </div>
      <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">{{ label }}</span>
      <span class="check-indicator absolute top-2 right-2 text-primary hidden">
        <span class="material-symbols-outlined text-base">check_circle</span>
      </span>
    </div>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  value: string;
  label: string;
  icon: string;
  modelValue: string;
}>();

defineEmits(['update:modelValue']);
</script>
