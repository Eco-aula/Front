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
    <form @submit.prevent="login" class="px-10 pb-10 space-y-6">
      <!-- User Field -->
      <LoginField
        id="username"
        label="Correo Electrónico"
        icon="person"
        placeholder="Ingrese su correo electrónico"
        v-model="formData.email"
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

      <!-- Action Button -->
      <button
        type="submit"
        class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 mt-4"
      >
        <span>Entrar</span>
        <span class="material-symbols-outlined text-lg">login</span>
      </button>

      <!-- Footer Info -->
      <div class="text-center mt-6">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          ¿No tiene una cuenta? 
          <a href="#" class="text-primary font-semibold hover:underline" @click.prevent="$emit('switch-to-register')">
            Regístrese aquí
          </a>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import LoginField from './LoginField.vue';
import { useRouter } from "vue-router";
import { loginUser, type User } from "@/services/authService";

const formData = reactive({
  email: '',
  password: '',
});

defineEmits(['switch-to-register']);

const router = useRouter();

const login = async (): Promise<void> => {
  try {
    const user: User = await loginUser(formData.email, formData.password);

    // Guardar sesión
    localStorage.setItem("user", JSON.stringify(user));

    // Ir al dashboard
    router.push("/dashboard");
  } catch (error: any) {
    alert(error.message);
  }
};
</script>
