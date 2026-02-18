<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";

const route = useRoute();
</script>

<template>
  <template v-if="route.path !== '/login'">
    <Sidebar />

    <main class="main-content">
      <Header />
      <RouterView />
    </main>
  </template>
  <RouterView v-else />
</template>

<style>
/* Los estilos se encuentran globalmente en assets/main.css */
</style>
