<script setup lang="ts">
  const props = defineProps<{
    data: any[];
    item: object
  }>();
</script>

<template>
  <div class="scrollable-content">
    <div class="element-list-container">
      <component
        v-for="d in props.data"
        :key="(d as any).id"
        :element="d"
        v-bind="d"
        :is="props.item"
      />
      <div class="bottom-padding" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .bottom-padding {
    height: 50px;
  }

  .scrollable-content {
    flex: 1;
    overflow-y: auto;
    padding: 0 1rem;
    margin: 0 auto;
    width: 60%;
  }

  .element-list-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
</style>
