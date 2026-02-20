<template>
  <div class="w-full max-w-[480px] bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
    <div class="pt-10 pb-6 px-10 text-center">
      <div class="inline-flex items-center justify-center p-3 rounded-full bg-primary/5 text-primary mb-4">
        <span class="material-symbols-outlined text-4xl">person_add</span>
      </div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Crear cuenta</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-2">Registrese para comenzar a usar EcoAula</p>
    </div>

    <form class="px-10 pb-10 space-y-6" @submit.prevent="handleSubmit">
      <LoginField
        id="name"
        v-model="formData.name"
        label="Nombre"
        icon="person"
        placeholder="Ingrese su nombre completo"
      />
      <p v-if="fieldErrors.name" class="text-xs text-red-600" role="alert">{{ fieldErrors.name }}</p>

      <LoginField
        id="email"
        v-model="formData.email"
        label="Correo Electronico"
        icon="mail"
        placeholder="ejemplo@correo.com"
      />
      <p v-if="fieldErrors.email" class="text-xs text-red-600" role="alert">{{ fieldErrors.email }}</p>

      <LoginField
        id="password"
        v-model="formData.password"
        label="Contrasena"
        type="password"
        icon="lock"
        placeholder="********"
      />
      <p v-if="fieldErrors.password" class="text-xs text-red-600" role="alert">{{ fieldErrors.password }}</p>

      <p v-if="submitError" class="text-xs text-red-600" role="alert">{{ submitError }}</p>
      <p v-if="successMessage" class="text-xs text-green-600" role="status">{{ successMessage }}</p>

      <button
        type="submit"
        class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
        :disabled="isSubmitting"
      >
        <span>{{ isSubmitting ? 'Procesando...' : 'Registrarse' }}</span>
        <span class="material-symbols-outlined text-lg">how_to_reg</span>
      </button>

      <div class="text-center mt-6">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Ya tiene una cuenta?
          <a href="#" class="text-primary font-semibold hover:underline" @click.prevent="$emit('switch-to-login')">
            Inicie sesion aqui
          </a>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from 'vue'

import { register } from '@/api/authApi'
import { ApiError } from '@/api/apiClient'
import { hasMinLength, isValidEmail } from '@/utils/authValidation'

import LoginField from './LoginField.vue'

defineEmits(['switch-to-login'])

const formData = reactive({
  name: '',
  email: '',
  password: '',
})

const fieldErrors = reactive<{ name?: string; email?: string; password?: string }>(
  {},
)
const submitError = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const isSubmitting = ref(false)

const router = getCurrentInstance()?.appContext.config.globalProperties
  .$router as
  | {
      push: (to: string) => Promise<void> | void
    }
  | undefined

function clearMessages() {
  fieldErrors.name = undefined
  fieldErrors.email = undefined
  fieldErrors.password = undefined
  submitError.value = null
  successMessage.value = null
}

function validateForm(): boolean {
  let isValid = true

  if (!hasMinLength(formData.name, 3)) {
    fieldErrors.name = 'Ingrese un nombre valido (minimo 3 caracteres).'
    isValid = false
  }

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
    const response = await register({
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
    })

    successMessage.value = 'Registro exitoso.'
    localStorage.setItem('ecoaula_current_user', JSON.stringify(response.user))
    await router?.push('/dashboard')
  } catch (caughtError) {
    if (caughtError instanceof ApiError) {
      submitError.value = caughtError.message
    } else {
      submitError.value = 'No se pudo registrar la cuenta. Intente nuevamente.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
