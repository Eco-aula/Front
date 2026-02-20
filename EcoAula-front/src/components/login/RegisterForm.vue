<template>
  <div class="w-full max-w-[480px] bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
    <!-- Card Header -->
    <div class="pt-10 pb-6 px-10 text-center">
      <div class="inline-flex items-center justify-center p-3 rounded-full bg-primary/5 text-primary mb-4">
        <span class="material-symbols-outlined text-4xl">person_add</span>
      </div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Crear cuenta</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-2">Regístrese para comenzar a usar EcoAula</p>
    </div>

    <!-- Registration Form -->
    <form @submit.prevent="handleSubmit" class="px-10 pb-10 space-y-6">
      <!-- Name Field -->
      <LoginField
        id="name"
        label="Nombre"
        icon="person"
        placeholder="Ingrese su nombre completo"
        v-model="formData.name"
      />

      <!-- Email Field -->
      <LoginField
        id="email"
        label="Correo Electrónico"
        icon="mail"
        placeholder="ejemplo@correo.com"
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
      />

      <!-- Action Button -->
      <button
        type="submit"
        class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 mt-4"
      >
        <span>Registrarse</span>
        <span class="material-symbols-outlined text-lg">how_to_reg</span>
      </button>

      <!-- Footer Info -->
      <div class="text-center mt-6">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          ¿Ya tiene una cuenta? 
          <a href="#" class="text-primary font-semibold hover:underline" @click.prevent="$emit('switch-to-login')">
            Inicie sesión aquí
          </a>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import LoginField from './LoginField.vue';
import { useRouter } from 'vue-router';
import { registerUser } from '@/services/authService';

const formData = reactive({
  name: '',
  email: '',
  password: '',
});

const emit = defineEmits(['switch-to-login']);
const router = useRouter();

const handleSubmit = async () => {
  try {
    const newUser = await registerUser(formData.name, formData.email, formData.password);
    
    // Guardar sesión (opcional, dependiendo de si quieres que entre directo)
    localStorage.setItem("user", JSON.stringify(newUser));

    // Ir al dashboard
    router.push("/dashboard");
  } catch (error: any) {
    alert(error.message);
  }
};
</script>
