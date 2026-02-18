<script setup lang="ts">
interface HistoryItem {
  date: string
  location: string
  category: string
  amount: string
}

defineProps<{
  items: HistoryItem[]
}>()

const getCategoryClass = (category: string) => {
  return category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h3>Historial Reciente</h3>
      <a href="#" class="view-all">Ver Todo</a>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Ubicación</th>
          <th>Categoría</th>
          <th style="text-align: right">Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.date }}</td>
          <td class="location-cell">{{ item.location }}</td>
          <td>
            <span class="category-badge" :class="getCategoryClass(item.category)">
              {{ item.category }}
            </span>
          </td>
          <td class="amount-cell">{{ item.amount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
