<template>
  <div class="w-full max-w-[480px] bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
    <!-- Card Header -->
    <div class="pt-10 pb-6 px-10 text-center">
      <div class="inline-flex items-center justify-center p-3 rounded-full bg-primary/5 text-primary mb-4">
        <span class="material-symbols-outlined text-4xl">account_balance</span>
      </div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Bienvenido de nuevo</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-2">Ingrese sus credenciales para acceder</p>
    </div>

    <!-- Login Form -->
    <form @submit.prevent="handleSubmit" class="px-10 pb-10 space-y-6">
      <!-- User Field -->
      <LoginField
        id="username"
        label="Usuario"
        icon="person"
        placeholder="Ingrese su usuario"
        v-model="formData.username"
      />

      <!-- Password Field -->
      <LoginField
        id="password"
        label="Contraseña"
        type="password"
        icon="lock"
        placeholder="••••••••"
        v-model="formData.password"
      >
        <template #label-action>
          <a class="text-xs font-medium text-primary hover:underline" href="#">¿Olvidó su contraseña?</a>
        </template>
      </LoginField>

      <!-- Role Selection -->
      <div class="space-y-3 pt-2">
        <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Seleccionar Rol</p>
        <div class="grid grid-cols-2 gap-4">
          <RoleCard
            value="operativo"
            icon="engineering"
            title="Operativo"
            description="Gestión diaria de residuos"
            :checked="formData.role === 'operativo'"
            @change="updateRole"
          />
          <RoleCard
            value="direccion"
            icon="monitoring"
            title="Dirección"
            description="Análisis y supervisión"
            :checked="formData.role === 'direccion'"
            @change="updateRole"
          />
        </div>
      </div>

      <!-- Action Button -->
      <button
        type="submit"
        class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 mt-4"
      >
        <span>Entrar</span>
        <span class="material-symbols-outlined text-lg">login</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import LoginField from './LoginField.vue';
import RoleCard from './RoleCard.vue';

const formData = reactive({
  username: '',
  password: '',
  role: 'operativo'
});

const updateRole = (role: string) => {
  formData.role = role;
};

const handleSubmit = () => {
  console.log('Form submitted:', formData);
  // Add login logic here
};
</script>
