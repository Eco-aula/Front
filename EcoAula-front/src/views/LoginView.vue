<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
    <LoginHeader />
    
    <!-- Main Content Container -->
    <main class="flex-grow flex items-center justify-center p-6">
      <LoginForm />
    </main>

    <LoginFooter />
  </div>
</template>

<script setup lang="ts">
import LoginHeader from '@/components/login/LoginHeader.vue';
import LoginFooter from '@/components/login/LoginFooter.vue';
import LoginForm from '@/components/login/LoginForm.vue';
</script>

<style scoped>
/* Any view-specific styles could go here, 
   but most are handled by Tailwind and the global role-card style */
</style>
