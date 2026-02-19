<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <aside class="sidebar">
    <div class="logo-section">
      <div class="logo-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
          />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C10 14.5 12 15 15 15" />
        </svg>
      </div>
      <div class="logo-text">
        <h1>Eco-aula</h1>
        <p>Gestión Institucional</p>
      </div>
    </div>

    <nav class="nav-menu">
      <RouterLink
        to="/dashboard"
        class="nav-item"
        :class="{ active: route.path === '/dashboard' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
        Dashboard
      </RouterLink>
      <RouterLink to="/registrar" class="nav-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
        Registrar
      </RouterLink>
      <RouterLink to="/listado" class="nav-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="8" x2="21" y1="6" y2="6" />
          <line x1="8" x2="21" y1="12" y2="12" />
          <line x1="8" x2="21" y1="18" y2="18" />
          <line x1="3" x2="3.01" y1="6" y2="6" />
          <line x1="3" x2="3.01" y1="12" y2="12" />
          <line x1="3" x2="3.01" y1="18" y2="18" />
        </svg>
        Listado
      </RouterLink>
      <RouterLink to="/alertas" class="nav-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
        Alertas
      </RouterLink>
    </nav>

    <div class="profile-section">
      <div class="avatar">DA</div>
      <div class="profile-info">
        <h4>Dirección</h4>
        <p>Admin Panel</p>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  background-color: var(--sidebar-bg);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  padding: 24px;
  position: fixed;
  height: 100vh;
  z-index: 10;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: var(--accent-navy);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.logo-text h1 {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: var(--accent-navy);
}

.logo-text p {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
  color: var(--text-muted);
}

.nav-menu {
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 8px;
  transition: all var(--transition-speed);
}

.nav-item:hover,
.nav-item.active {
  background-color: #f1f5f9;
  color: var(--accent-navy);
}

.nav-item.active {
  background-color: #f1f5f9;
}

.nav-item.active::after {
  content: "";
  width: 6px;
  height: 6px;
  background-color: var(--accent-red);
  border-radius: 50%;
  margin-left: auto;
}

.profile-section {
  margin-top: auto;
  border-top: 1px solid var(--border-color);
  padding-top: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: #e2e8f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #64748b;
}

.profile-info h4 {
  font-size: 14px;
  margin: 0;
  font-weight: 600;
}

.profile-info p {
  font-size: 12px;
  margin: 0;
  color: var(--text-muted);
}
</style>
