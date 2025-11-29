<script setup lang="ts">
import RoomRow from '@/components/RoomRow.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import NotificationBox from '@/components/NotificationBox.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import type {IRoomRow} from "@/types.ts";

const router = useRouter();

const currentDateTime = ref(new Date().toLocaleString());
const processedPatients = ref(5); // Example data
const totalPatients = ref(10); // Example data

// Update notifications with current and next appointments
const positiveNotifications = [
  { id: 1, identifier: 'Sál 1' },
  { id: 2, identifier: 'Sál 2' },
];

// Example negative notifications with random patients
const negativeNotifications = [
  { id: 1, identifier: 'Sál 1' },
  { id: 2, identifier: 'Sál 2' },
];

let timer: number;

onMounted(() => {
  timer = window.setInterval(() => {
    currentDateTime.value = new Date().toLocaleString();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <div class="dashboard">
    <div class="column left-column">
      <div class="date-time-container">
        <span class="current-date-time">{{ currentDateTime }}</span>
      </div>
      <div class="progress-container">
        <ProgressBar :current="processedPatients" :total="totalPatients" />
      </div>
    </div>
    <div class="column right-column">

    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 1rem;
  height: 100%;
}

.column {
  padding: 1.5rem;
}

.date-time-container {
  text-align: center;
  margin-bottom: 3rem;

  .current-date-time {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--color-heading);
  }
}

.progress-container {
  margin-bottom: 5rem;
}

.patient-row-container {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 1.5rem;

  &.smaller {
    width: 80%;
  }
}

.notification-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--color-border);

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

  &.positive {
    background-color: #2e7d32;
    color: white;

    &:hover {
      background-color: #1b5e20;
    }
  }

  &.negative {
    background-color: #c62828;
    color: white;

    &:hover {
      background-color: #b71c1c;
    }
  }
}
</style>
