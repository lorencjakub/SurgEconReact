<script setup lang="ts">
import { ref, computed } from 'vue';
import PaginationRow from '@/components/PaginationRow.vue';
import ListTemplate from '@/views/templates/ListTemplate.vue';

interface IListPageProps {
  sorting?: string[];
  searchFilter?: string[];
  data?: any[];
  sortOrderDesc?: boolean;
  sortBy?: string;
  item: object,
  withPagination?: boolean;
}

const props = withDefaults(
  defineProps<IListPageProps>(),
  {
    withPagination: true
  }
);

const emits = defineEmits(["updateSorting", "updateSortOrderDesc"]);

const searchQuery = ref('');

function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

const handleSortOrderClick = () => {
  emits('updateSortOrderDesc')
}

const handleSortingValue = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emits("updateSorting", target.value);
}

const filteredData = computed(() => {
  const result = props.data ?? [];

  if (!props.searchFilter) return result;

  const normalizedQuery = normalizeText(searchQuery.value);

  return result.filter((r) => {
    const normalizedAttributes = props.searchFilter!.map((f) => normalizeText(r[f]));
    return normalizedAttributes.some((a) => a.includes(normalizedQuery));
  });
});
</script>

<template>
  <div class="list-page-view">
    <div class="search-container">
      <div class="search-row">
        <div class="search-input-wrapper" v-if="props.searchFilter">
          <svg
            class="search-icon"
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
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="`Hledat podle ${props.searchFilter!.join(', ')}...`"
            class="search-input"
          />
        </div>
        <select  v-if="props.sorting" :value="sortBy" @change="handleSortingValue" class="sort-select">
          <option v-for="s in props.sorting" :key="s" :value="s">Řadit podle {{ s }}</option>
        </select>
        <button  v-if="props.sorting" @click="handleSortOrderClick" class="sorting-button">
          {{ sortOrderDesc ? 'DESC' : 'ASC' }}
        </button>
      </div>
    </div>
    <ListTemplate :data="filteredData" :item="props.item" />
    <PaginationRow v-if="props.withPagination" />
  </div>
</template>

<style scoped lang="scss">
.list-page-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  padding-bottom: 80px; // Space for the fixed button
}

.search-container {
  width: 100%;
  max-width: 1200px;
  position: sticky;
  top: 0;
  background-color: var(--color-background);
  padding: 1rem;
  z-index: 1;
  margin: 0 auto;
}



.create-element-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  padding: 1rem;
  margin: 0 auto;
  background-color: var(--color-background);
  z-index: 1;
}

.search-row {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-input-wrapper {
  position: relative;
  flex: 1;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text);
  opacity: 0.6;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 1rem;
  color: var(--color-text);
  background-color: var(--color-background);
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--navbar-active-border);
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);

    & + .search-icon {
      opacity: 0.8;
    }
  }

  &::placeholder {
    color: var(--color-text);
    opacity: 0.6;
  }
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

.create-element-button {
  padding: 0.75rem 2rem;
  background-color: var(--navbar-active-border);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background-color: #1976d2;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}

.sorting-button {
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
</style>
