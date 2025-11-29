<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
  type: 'positive' | 'negative';
  title: string;
  count: number;
}>();

function goToPatientDetail(patientId: number) {
  router.push(`/patient/${patientId}`);
}
</script>

<template>
  <div class="notification-box" :class="type">
    <div class="notification-header">
      <h3>{{ title }}</h3>
      <span class="notification-count">{{ count }}</span>
    </div>
    <div class="notification-content">
      <ul class="notification-list">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.notification-box {
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &.positive {
    background-color: #e8f5e9;
    border: 1px solid #a5d6a7;

    .notification-header {
      color: #2e7d32;
    }

    .notification-link {
      background-color: #2e7d32;
      color: white;

      &:hover {
        background-color: #1b5e20;
      }
    }
  }

  &.negative {
    background-color: #ffebee;
    border: 1px solid #ef9a9a;

    .notification-header {
      color: #c62828;
    }

    .notification-link {
      background-color: #c62828;
      color: white;

      &:hover {
        background-color: #b71c1c;
      }
    }
  }

  .notification-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 500;
    }

    .notification-count {
      background-color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-weight: 500;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
  }

  .notification-content {
    color: var(--color-text);
  }

  .notification-list {
    list-style: none;
    padding: 0;
    margin: 0;

    :deep(li) {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--color-border);
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .notification-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 1rem;
  }

  .notification-text {
    flex: 1;
  }

  .notification-link {
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    white-space: nowrap;
    text-decoration: none;
    min-width: 80px;
    text-align: center;
  }
}
</style>
