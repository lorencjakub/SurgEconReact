<script setup lang="ts">
import type { IRoomRow } from '@/types';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import DetailItem from './DetailItem.vue';

const router = useRouter();
const isDetailsVisible = ref(false);

const props = withDefaults(
  defineProps<{
    element: IRoomRow;
    detailAllowed?: boolean;
    compact?: boolean;
  }>(),
  {
    detailAllowed: true,
    compact: false,
  },
);

function toggleDetails() {
  isDetailsVisible.value = !isDetailsVisible.value;
}

function goToEntityDetail() {
  router.push({ name: 'room', params: { roomId: String(props.element.id) } });
}
</script>

<template>
  <div class="room-row" :class="{ 'room-row--compact': compact }">
    <div class="room-row-info">
      <div class="room-basic-info">
        <span class="room-name">{{ element.identifier }}</span>
      </div>
      <div class="room-actions">
        <button class="action-button detail-button" @click="goToEntityDetail">Detail</button>
<!--        <button v-if="detailAllowed" class="action-button toggle-button" @click="toggleDetails">-->
<!--          <svg-->
<!--            xmlns="http://www.w3.org/2000/svg"-->
<!--            width="24"-->
<!--            height="24"-->
<!--            viewBox="0 0 24 24"-->
<!--            fill="none"-->
<!--            stroke="currentColor"-->
<!--            stroke-width="2"-->
<!--            stroke-linecap="round"-->
<!--            stroke-linejoin="round"-->
<!--            :class="{ 'rotate-180': isDetailsVisible }"-->
<!--          >-->
<!--            <path d="m6 9 6 6 6-6" />-->
<!--          </svg>-->
<!--        </button>-->
      </div>
    </div>
<!--    <div-->
<!--      v-if="detailAllowed"-->
<!--      class="room-row-details"-->
<!--      :class="{ 'details-visible': isDetailsVisible }"-->
<!--    >-->
<!--      <div class="room-row-details-info">-->
<!--        <div class="detail-section">-->
<!--          <h3>Osobní údaje</h3>-->
<!--          <div class="detail-grid">-->
<!--            <div class="detail-row">-->
<!--              <DetailItem label="Popis:" :value="element.description" />-->
<!--&lt;!&ndash;              <DetailItem label="Příjmení:" :value="patient.last_name" />&ndash;&gt;-->
<!--&lt;!&ndash;              <DetailItem label="Pohlaví:" :value="translateGender(patient.gender)" />&ndash;&gt;-->
<!--            </div>-->
<!--&lt;!&ndash;            <div class="detail-row">&ndash;&gt;-->
<!--&lt;!&ndash;              <DetailItem label="Datum narození:" :value="patient.date_of_birth" />&ndash;&gt;-->
<!--&lt;!&ndash;              <DetailItem label="Rodné číslo:" :value="patient.birth_number" />&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="detail-row">&ndash;&gt;-->
<!--&lt;!&ndash;              <DetailItem label="Adresa:" :value="patient.address" />&ndash;&gt;-->
<!--&lt;!&ndash;              <DetailItem label="Email:" :value="patient.email" />&ndash;&gt;-->
<!--&lt;!&ndash;              <DetailItem label="Telefon:" :value="patient.phone_number" />&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="detail-actions">-->
<!--          <button class="action-button detail-button" @click="goToEntityDetail">-->
<!--            Detail léčby-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<style scoped lang="scss">
.room-row {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;

  &.room-row--compact {
    .room-row-info {
      .room-basic-info {
        gap: 1rem;

        .room-name {
          font-size: 0.9rem;
          min-width: 150px;
        }

        .room-birth-number {
          font-size: 0.9rem;
        }
      }

      .room-actions {
        gap: 1rem;
      }
    }

    .action-button {
      padding: 0.35rem 0.75rem;
      font-size: 0.9rem;

      &.toggle-button {
        padding: 0.35rem;
      }
    }

    .room-row-details {
      .room-row-details-info {
        .detail-section {
          margin-bottom: 1rem;

          h3 {
            font-size: 1rem;
            margin-bottom: 0.75rem;
          }

          .detail-grid {
            gap: 1rem;

            .detail-row {
              gap: 1.5rem;
            }
          }
        }
      }
    }
  }

  .room-row-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    gap: 2rem;

    .room-basic-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 2rem;
      flex: 1;

      .room-name {
        font-size: 1.1rem;
        font-weight: 500;
        color: var(--color-heading);
        min-width: 200px;
      }

      .room-birth-number {
        font-size: 1.1rem;
        font-weight: 500;
        color: var(--color-text);
        opacity: 0.7;
      }
    }

    .room-actions {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }
  }

  .room-row-details {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;

    &.details-visible {
      max-height: 500px;
    }

    .room-row-details-info {
      padding: 1.5rem;
      border-top: 1px solid var(--color-border);

      .detail-section {
        margin-bottom: 1.5rem;

        h3 {
          margin-bottom: 1rem;
          color: var(--color-heading);
        }

        .detail-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;

          .detail-row {
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
          }
        }
      }

      .detail-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 1rem;
      }
    }
  }
}

.action-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &.detail-button {
    background-color: var(--navbar-active-bg);
    color: var(--navbar-active-text);

    &:hover {
      background-color: var(--navbar-hover-bg);
    }
  }

  &.toggle-button {
    background-color: transparent;
    color: var(--color-text);
    padding: 0.5rem;

    &:hover {
      background-color: var(--color-background-mute);
    }

    svg {
      transition: transform 0.3s ease;
    }

    .rotate-180 {
      transform: rotate(180deg);
    }
  }
}
</style>
