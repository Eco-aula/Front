<template>
  <form class="space-y-6" @submit.prevent="handleSubmit" @reset.prevent="handleReset">
    <WasteTypeSelector v-model="formData.wasteType" />
    <p v-if="formErrors.wasteType" class="field-error" role="alert">{{ formErrors.wasteType }}</p>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="space-y-6">
        <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
          <div class="flex items-center gap-2 mb-6">
            <span class="material-symbols-outlined text-primary">badge</span>
            <h3 class="font-bold text-slate-900 dark:text-white">Nombre</h3>
          </div>

          <div class="relative">
            <label class="sr-only" for="registro-name">Nombre de quien registra</label>
            <input
              id="registro-name"
              v-model="formData.name"
              type="text"
              class="block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary text-sm p-4 px-5"
              placeholder="Nombre de quien registra"
              :aria-invalid="Boolean(formErrors.name)"
            />
          </div>
          <p v-if="formErrors.name" class="field-error" role="alert">{{ formErrors.name }}</p>
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
          <div class="flex items-center gap-2 mb-6">
            <span class="material-symbols-outlined text-primary">scale</span>
            <h3 class="font-bold text-slate-900 dark:text-white">Cantidad</h3>
          </div>

          <div class="relative flex items-center">
            <label class="sr-only" for="registro-quantity">Cantidad en kilogramos</label>
            <input
              id="registro-quantity"
              v-model="formData.quantity"
              type="number"
              min="0.01"
              step="0.01"
              class="block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary text-lg font-semibold p-4 pr-16"
              placeholder="0.00"
              :aria-invalid="Boolean(formErrors.quantity)"
            />
            <span class="absolute right-6 text-slate-400 font-bold text-sm uppercase tracking-widest">kg</span>
          </div>

          <p class="mt-4 text-xs text-slate-400">
            Ingrese el peso exacto verificado en la bascula institucional.
          </p>
          <p v-if="formErrors.quantity" class="field-error" role="alert">{{ formErrors.quantity }}</p>
        </div>
      </div>

      <div>
        <RegistrationCalendar v-model="formData.date" />
        <p v-if="formErrors.date" class="field-error mt-3" role="alert">{{ formErrors.date }}</p>
      </div>
    </div>

    <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
      <div class="flex items-center gap-2 mb-4">
        <span class="material-symbols-outlined text-primary">notes</span>
        <h3 class="font-bold text-slate-900 dark:text-white">Observaciones Operativas</h3>
      </div>
      <label class="sr-only" for="registro-observaciones">Observaciones operativas</label>
      <textarea
        id="registro-observaciones"
        v-model="formData.observations"
        rows="3"
        class="block w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary text-sm p-4"
        placeholder="Especifique el origen del material, estado de limpieza o cualquier anomalia detectada..."
      ></textarea>
    </div>

    <p v-if="successMessage" class="form-message form-message-success" role="status">{{ successMessage }}</p>
    <p v-if="residuosStore.error" class="form-message form-message-error" role="alert">{{ residuosStore.error }}</p>

    <div class="pt-4 flex justify-end items-center gap-4">
      <button
        type="reset"
        class="px-8 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
        :disabled="residuosStore.creating"
      >
        Descartar
      </button>

      <button
        type="submit"
        class="bg-primary text-white px-12 py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-primary/30 hover:bg-[#142a4a] transition-all active:scale-[0.98] flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
        :disabled="residuosStore.creating"
      >
        <span class="material-symbols-outlined text-xl">save</span>
        {{ residuosStore.creating ? 'Guardando...' : 'Confirmar Registro' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import type { RegistrarFormData } from '@/types/residuos'
import { useResiduosStore } from '@/stores/residuos'
import {
  type RegistrarFormErrors,
  validateRegistrarForm,
} from '@/utils/registrarValidation'

import RegistrationCalendar from './RegistrationCalendar.vue'
import WasteTypeSelector from './WasteTypeSelector.vue'

const residuosStore = useResiduosStore()

function createDefaultFormData(): RegistrarFormData {
  return {
    name: '',
    wasteType: 'papel',
    quantity: '',
    date: new Date(),
    observations: '',
  }
}

const formData = reactive<RegistrarFormData>(createDefaultFormData())
const formErrors = reactive<RegistrarFormErrors>({})
const successMessage = ref<string | null>(null)

function clearErrors() {
  formErrors.name = undefined
  formErrors.wasteType = undefined
  formErrors.quantity = undefined
  formErrors.date = undefined
}

function resetFormState() {
  Object.assign(formData, createDefaultFormData())
  clearErrors()
  successMessage.value = null
}

async function handleSubmit() {
  successMessage.value = null
  clearErrors()

  const validation = validateRegistrarForm(formData)
  Object.assign(formErrors, validation.errors)

  if (!validation.isValid) {
    return
  }

  try {
    await residuosStore.createResiduo({
      name: formData.name.trim(),
      wasteType: formData.wasteType,
      quantity: Number.parseFloat(formData.quantity),
      date: formData.date.toISOString(),
      observations: formData.observations.trim(),
    })

    successMessage.value = 'Registro creado correctamente.'
    Object.assign(formData, createDefaultFormData())
  } catch {
    successMessage.value = null
  }
}

function handleReset() {
  resetFormState()
}
</script>

<style scoped>
.field-error {
  margin-top: 10px;
  color: #b91c1c;
  font-size: 12px;
  font-weight: 600;
}

.form-message {
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 13px;
  font-weight: 600;
}

.form-message-success {
  color: #166534;
  background: #dcfce7;
}

.form-message-error {
  color: #991b1b;
  background: #fee2e2;
}
</style>
