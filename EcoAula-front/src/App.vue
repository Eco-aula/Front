<script setup lang="ts">
import { RouterView } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";
</script>

<template>
  <Sidebar />

  <main class="main-content">
    <Header />
    <RouterView />
    <Footer />
  </main>
</template>

<style>
/* Los estilos se encuentran globalmente en assets/main.css */
</style>
