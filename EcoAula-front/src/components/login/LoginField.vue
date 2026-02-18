<template>
  <div class="space-y-2">
    <div class="flex justify-between items-center">
      <label :for="id" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        {{ label }}
      </label>
      <slot name="label-action"></slot>
    </div>
    <div class="relative">
      <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
        {{ icon }}
      </span>
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 dark:text-white"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  icon: string;
  modelValue?: string;
}>();

defineEmits(['update:modelValue']);
</script>
