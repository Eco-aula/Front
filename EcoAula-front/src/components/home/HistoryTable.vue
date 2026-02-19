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

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.location-cell {
  font-weight: 500;
}

.category-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}

.category-badge.papel {
  background: #eff6ff;
  color: #1e40af;
}
.category-badge.organico {
  background: #ecfdf5;
  color: #065f46;
}
.category-badge.plastico {
  background: #f5f3ff;
  color: #5b21b6;
}
.category-badge.vidrio {
  background: #fffbeb;
  color: #92400e;
}

.amount-cell {
  font-weight: 700;
  text-align: right;
}

.view-all {
  color: var(--accent-navy);
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
}
</style>
