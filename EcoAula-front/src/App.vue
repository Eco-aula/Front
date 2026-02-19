<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";

const route = useRoute();
</script>

<template>
  <template v-if="route.path !== '/'">
    <Sidebar />

    <main class="main-content">
      <Header />
      <RouterView />
    </main>
  </template>
  <RouterView v-else />
</template>

<style>
#app {
  display: flex;
  min-height: 100vh;
}

.main-content {
  margin-left: 260px;
  flex: 1;
  padding: 32px;
  max-width: 2000px; /* Un poco más de aire en pantallas ultra-wide */
  min-height: 100vh;
  background-color: var(--primary-bg);
}

/* Transiciones suaves entre páginas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
