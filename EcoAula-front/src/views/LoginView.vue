<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen w-full flex flex-col font-display">
    <LoginHeader />
    
    <!-- Main Content Container -->
    <main class="flex-grow flex items-center justify-center p-6">
      <LoginForm v-if="isLogin" @switch-to-register="isLogin = false" />
      <RegisterForm v-else @switch-to-login="isLogin = true" />
    </main>

    <LoginFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LoginHeader from '@/components/login/LoginHeader.vue';
import LoginFooter from '@/components/login/LoginFooter.vue';
import LoginForm from '@/components/login/LoginForm.vue';
import RegisterForm from '@/components/login/RegisterForm.vue';

const isLogin = ref(true);
</script>

<style scoped>
/* Any view-specific styles could go here, 
   but most are handled by Tailwind and the global role-card style */
</style>
