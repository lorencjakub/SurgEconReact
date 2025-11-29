<script setup lang="ts">
import type { IRoomRow } from '@/types.ts';
import ListViewTemplate from '@/views/templates/ListViewTemplate.vue';
import OperationRow from "@/components/OperationRow.vue";

const props = defineProps<{
  data: IRoomRow[]
}>();


</script>

<template>
  <ListViewTemplate
    :data="props.data"
    :item="OperationRow"
    :with-pagination="false"
  />
</template>
