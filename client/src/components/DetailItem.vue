<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
}>();
</script>

<template>
  <div class="detail-item">
    <span class="detail-label">{{ label }}</span>
    <span class="detail-value">{{ value }}</span>
  </div>
</template>

<style scoped lang="scss">
.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 200px;

  .detail-label {
    font-size: 0.9rem;
    color: var(--color-text);
    opacity: 0.8;
  }

  .detail-value {
    font-size: 1rem;
    color: var(--color-heading);
  }
}
</style>
