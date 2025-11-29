<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';


const { locale } = useI18n();

onMounted(() => locale.value = localStorage.getItem('locale') || 'cs');


</script>

<template>
  <nav class="navbar">
    <div class="navbar-left">
      <RouterLink to="/" class="app-name">SurgEcon</RouterLink>
      <div class="nav-buttons">
        <RouterLink :to="{ name: 'dashboard' }" class="nav-button">{{ $t('navbar.dashboard') }}</RouterLink>
        <RouterLink
          :to="{ name: 'rooms' }"
          class="nav-button"
          >{{ $t('navbar.rooms') }}</RouterLink
        >
        <RouterLink
          :to="{ name: 'statistics' }"
          class="nav-button"
          >{{ $t('navbar.statistics') }}</RouterLink
        >
        <RouterLink
          :to="{ name: 'calendar' }"
          class="nav-button"
          >{{ $t('navbar.calendar') }}</RouterLink
        >
      </div>
    </div>
    <div class="spacer"></div>
  </nav>
</template>

<style scoped lang="scss">
.navbar {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--navbar-bg);
  box-shadow: 0 2px 4px var(--navbar-shadow);
  width: 100%;
  box-sizing: border-box;

  .navbar-left {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .app-name {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--navbar-text);
    text-decoration: none;
  }

  .nav-buttons {
    display: flex;
    gap: 1rem;
  }

  .nav-button {
    text-decoration: none;
    color: var(--navbar-text);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.2s ease;
    position: relative;
    cursor: pointer;

    &:hover {
      background-color: var(--navbar-hover-bg);
    }

    &.router-link-active {
      background-color: var(--navbar-active-bg);
      color: var(--navbar-active-text);
      font-weight: 500;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background-color: var(--navbar-active-border);
        border-radius: 2px;
      }
    }
  }

  .spacer {
    flex: 1;
  }

  .navbar-right {
    display: flex;
    align-items: center;
  }
}
</style>
