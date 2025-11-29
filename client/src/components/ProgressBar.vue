<script setup lang="ts">
const props = defineProps<{
  current: number;
  total: number;
}>();
</script>

<template>
  <div class="progress-bar-container">
    <div class="progress-bar">
      <div class="progress-bar-fill" :style="{ width: `${(current / total) * 100}%` }"></div>
    </div>
    <div class="progress-text">{{ current }} / {{ total }} pacientů</div>
  </div>
</template>

<style scoped lang="scss">
.progress-bar-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: var(--color-background-mute);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 0.5rem;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.progress-bar-fill {
  height: 100%;
  background-color: var(--navbar-active-border);
  transition: width 0.3s ease;
  box-shadow: 0 0 4px rgba(25, 118, 210, 0.3);
}

.progress-text {
  text-align: center;
  color: var(--color-heading);
  font-size: 0.9rem;
  font-weight: 500;
}
</style>
