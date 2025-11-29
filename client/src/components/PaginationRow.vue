<script setup lang="ts">

import { inject } from 'vue';

interface PaginationProps {
  total: number;
  pageSize: number;
  page: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (pageSize: number) => void;
}

const {
  page,
  pageSize,
  pages,
  hasPrev,
  hasNext,
  total,
  handlePageChange,
  handlePageSizeChange
} = inject<PaginationProps>('pagination')!;

const changePage = (page: number) => {
  if (page < 1 || page > pages) return;
  handlePageChange(page);
}

const changePageSize = (event: Event) => {
  handlePageSizeChange(parseInt((event.target as HTMLSelectElement).value));
}

</script>

<template>
  <div class="pagination">
    <button
      class="pagination-button"
      :disabled="!hasPrev"
      @click="handlePageChange(page - 1)"
    >
      « Předchozí
    </button>

    <div class="record-count">
      {{ page }}
    </div>

    <button
      class="pagination-button"
      :disabled="!hasNext"
      @click="changePage(page + 1)"
    >
      Další »
    </button>

    <select :value="pageSize" @change="changePageSize($event)" class="sort-select">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>

    <div class="record-count">
      {{ (page - 1) * pageSize + 1 }} -
      {{ Math.min(((page - 1) * pageSize) + pageSize, total) }} z
      {{ total }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.pagination-button,
.pagination-number {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: var(--color-text);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    background-color: var(--navbar-active-border);
    color: white;
  }
}

.pagination-number.active {
  background-color: var(--navbar-active-border);
  color: white;
  font-weight: bold;
}

.sort-select {
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 1rem;
  color: var(--color-text);
  background-color: var(--color-background);
  transition: all 0.2s ease;
  min-width: 200px;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.25rem;

  &:focus {
    outline: none;
    border-color: var(--navbar-active-border);
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
  }

  option {
    padding: 1rem;
  }
}

.record-count {
  font-size: 1rem;
  color: var(--color-text);
  margin-left: 1rem;
}
</style>
