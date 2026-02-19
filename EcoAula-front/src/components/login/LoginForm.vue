<template>
  <div class="w-full max-w-[480px] bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
    <div class="pt-10 pb-6 px-10 text-center">
      <div class="inline-flex items-center justify-center p-3 rounded-full bg-primary/5 text-primary mb-4">
        <span class="material-symbols-outlined text-4xl">account_balance</span>
      </div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Bienvenido de nuevo</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-2">Ingrese sus credenciales para acceder</p>
    </div>

    <form class="px-10 pb-10 space-y-6" @submit.prevent="handleSubmit">
      <LoginField
        id="username"
        v-model="formData.email"
        label="Correo Electronico"
        icon="person"
        placeholder="Ingrese su correo electronico"
      />
      <p v-if="fieldErrors.email" class="text-xs text-red-600" role="alert">{{ fieldErrors.email }}</p>

      <LoginField
        id="password"
        v-model="formData.password"
        label="Contrasena"
        type="password"
        icon="lock"
        placeholder="********"
      >
        <template #label-action>
          <a class="text-xs font-medium text-primary hover:underline" href="#">Olvido su contrasena?</a>
        </template>
      </LoginField>
      <p v-if="fieldErrors.password" class="text-xs text-red-600" role="alert">{{ fieldErrors.password }}</p>

      <p v-if="submitError" class="text-xs text-red-600" role="alert">{{ submitError }}</p>
      <p v-if="successMessage" class="text-xs text-green-600" role="status">{{ successMessage }}</p>

      <button
        type="submit"
        class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
        :disabled="isSubmitting"
      >
        <span>{{ isSubmitting ? 'Validando...' : 'Entrar' }}</span>
        <span class="material-symbols-outlined text-lg">login</span>
      </button>

      <div class="text-center mt-6">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          No tiene una cuenta?
          <a href="#" class="text-primary font-semibold hover:underline" @click.prevent="$emit('switch-to-register')">
            Registrese aqui
          </a>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import { login } from '@/api/authApi'
import { ApiError } from '@/api/apiClient'
import { hasMinLength, isValidEmail } from '@/utils/authValidation'

import LoginField from './LoginField.vue'

defineEmits(['switch-to-register'])

const formData = reactive({
  email: '',
  password: '',
})

const fieldErrors = reactive<{ email?: string; password?: string }>({})
const submitError = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const isSubmitting = ref(false)

function clearMessages() {
  fieldErrors.email = undefined
  fieldErrors.password = undefined
  submitError.value = null
  successMessage.value = null
}

function validateForm(): boolean {
  let isValid = true

  if (!isValidEmail(formData.email)) {
    fieldErrors.email = 'Ingrese un correo electronico valido.'
    isValid = false
  }

  if (!hasMinLength(formData.password, 6)) {
    fieldErrors.password = 'La contrasena debe tener al menos 6 caracteres.'
    isValid = false
  }

  return isValid
}

async function handleSubmit() {
  clearMessages()

  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    await login({
      email: formData.email.trim(),
      password: formData.password,
    })

    successMessage.value = 'Inicio de sesion exitoso.'
  } catch (caughtError) {
    if (caughtError instanceof ApiError) {
      submitError.value = caughtError.message
    } else {
      submitError.value = 'No se pudo iniciar sesion. Intente nuevamente.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
