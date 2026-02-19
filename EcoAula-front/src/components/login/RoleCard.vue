<template>
  <label class="role-card cursor-pointer group relative flex flex-col p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 transition-all">
    <input
      type="radio"
      name="role"
      :value="value"
      class="sr-only"
      :checked="checked"
      @change="$emit('change', value)"
    />
    <span class="material-symbols-outlined text-primary mb-2">{{ icon }}</span>
    <span class="text-sm font-bold text-gray-900 dark:text-white">{{ title }}</span>
    <span class="text-[10px] text-gray-500 dark:text-gray-400 mt-1 leading-tight">{{ description }}</span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  value: string;
  icon: string;
  title: string;
  description: string;
  checked?: boolean;
}>();

defineEmits(['change']);
</script>

<style scoped>
.role-card:has(input:checked) {
  border-color: #1a355b;
  background-color: rgba(26, 53, 91, 0.05);
}
</style>
