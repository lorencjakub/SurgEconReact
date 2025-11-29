<script setup lang="ts">
import backendServices from '../../services/apiServices.ts';
import { ref, provide, computed } from 'vue';
import type { IPaginated, IRoom } from '@/types.ts';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import type { AxiosError } from 'axios';
import ListViewTemplate from '@/views/templates/ListViewTemplate.vue';
import RoomRow from '@/components/RoomRow.vue';

const queryClient = useQueryClient();

const filters = ['identifier']

const page = ref(1);
const pageSize = ref(10);
const sortOrderDesc = ref(true);
const sortBy = ref(filters[0]);

function handleSortingChange(newSorting: string) {
  sortBy.value = newSorting;
}

function handleSortOrderChange() {
  sortOrderDesc.value = !sortOrderDesc.value;
}

function handlePageChange(newPage: number) {
  page.value = newPage;
}

function handlePageSizeChange(newSize: number) {
  page.value = 1;
  pageSize.value = newSize;
}

const defaultPatients = {
  hasNext: false,
  hasPrev: false,
  items: [],
  page: 1,
  pageSize: 10,
  pages: 1,
  total: 0
}

const getRoomListQuery = useQuery<IPaginated<IRoom>, AxiosError>({
  queryKey: ['list-of-patients-query', page, pageSize, sortBy, sortOrderDesc],
  queryFn: async ({ queryKey }) => {
    const [, page, pageSize, sortBy] = queryKey as [string, number, number, string];
    return await backendServices.getAllRooms(page, pageSize, sortBy, sortOrderDesc.value ? "desc" : "asc");
  },
  enabled: true,
  staleTime: 100,
  gcTime: 100,
  placeholderData: defaultPatients
}, queryClient);

// provide("pagination", {
//   page: computed(() => getRoomListQuery.data?.value?.page),
//   pageSize: computed(() => getRoomListQuery.data?.value?.pageSize),
//   pages: computed(() => getRoomListQuery.data?.value?.pages),
//   hasPrev: computed(() => getRoomListQuery.data?.value?.hasPrev),
//   hasNext: computed(() => getRoomListQuery.data?.value?.hasNext),
//   total: computed(() => getRoomListQuery.data?.value?.total),
//   handlePageChange,
//   handlePageSizeChange,
// });

</script>

<template>
  <ListViewTemplate
    v-if="getRoomListQuery.isSuccess"
    :sorting="filters"
    :search-filter="filters"
    :data="getRoomListQuery.data?.value ?? []"
    :sort-by="sortBy"
    :sort-order-desc="sortOrderDesc"
    :item="RoomRow"
    @update-sorting="handleSortingChange"
    @update-sort-order-desc="handleSortOrderChange"
  />
</template>
