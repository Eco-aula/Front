<template>
  <div class="flex-1 overflow-y-auto p-8 flex justify-center items-start">
    <div class="w-full max-w-4xl">
      <div class="mb-8">
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Registro de Residuos</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-1">Gestión operativa para la disposición técnica de materiales institucionales.</p>
      </div>
      
      <RegistrarForm />

      <div class="mt-8 flex flex-col md:flex-row items-center justify-between px-2 gap-4">
        <div class="flex items-center gap-3 text-slate-400 bg-white/50 dark:bg-slate-800/50 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800">
          <span class="material-symbols-outlined text-lg text-green-500">verified</span>
          <span class="text-[10px] font-medium tracking-wide">OPERACIÓN CERTIFICADA POR EL SISTEMA CENTRAL ECO-AULA</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RegistrarForm from '@/components/registrar/RegistrarForm.vue';
</script>

<style scoped>
/* Estilos específicos si son necesarios */
</style>
