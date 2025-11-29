<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';


</script>

<template>
  <div class="app">
    <VueQueryDevtools initialIsOpen />
    <NavBar />
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.content {
  flex: 1;
  overflow: hidden;
  background-color: var(--color-background);
  padding: 1rem;
  box-sizing: border-box;
}
</style>
