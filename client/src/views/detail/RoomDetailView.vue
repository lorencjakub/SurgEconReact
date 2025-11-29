<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router';
  import { ref } from 'vue';
  import type { IRoom, IRoomRow } from '@/types.ts';
  import { useQuery, useQueryClient } from '@tanstack/vue-query';
  import type { AxiosError } from 'axios';
  import backendServices from '@/services/apiServices.ts';
  import OperationsListView from "@/views/list/OperationsListView.vue";
  import OperationRow from "@/components/OperationRow.vue";

  const queryClient = useQueryClient();
  const route = useRoute();
  const router = useRouter();

  const isCreating = ref(false);
  const selectPlan = ref(false);
  const selectedTemplate = ref<IRoomRow | null>(null);
  const isNewlyCreated = ref(false);
  const treatmentPlanId = ref<string>('');

  const defaultRoom = {
    id: "placeholder",
    identifier: "placeholder",
    operations: [],
    personal: []
  };

  const roomDetailQuery = useQuery<IRoom, AxiosError>({
    queryKey: ['room-detail-query'],
    queryFn: async () => await backendServices.getRoomById(String(route.params.roomId)),
    enabled: true
  }, queryClient);

  const handleBack = () => {
    isCreating.value = false;
    selectedTemplate.value = null;
  };

</script>

<template>
  <div class="room-detail-view">
    <div v-if="roomDetailQuery.data.value" class="room-detail-container">
      <div class="main-info">
        <div class="top-row">
          <div class="name-section">
            <h1>
              {{ roomDetailQuery.data.value.id }}
            </h1>
            <span class="birth-number">{{ roomDetailQuery.data.value.identifier }}</span>
          </div>
<!--          <div class="contact-section">-->
<!--            <div class="contact-item">-->
<!--              <span class="label">Email:</span>-->
<!--              <span class="value">{{ roomQuery.data.value.email }}</span>-->
<!--            </div>-->
<!--            <div class="contact-item">-->
<!--              <span class="label">Telefon:</span>-->
<!--              <span class="value">{{ roomQuery.data.value.phone_number }}</span>-->
<!--            </div>-->
<!--          </div>-->
        </div>
<!--        <div class="bottom-row">-->
<!--          <div class="secondary-info">-->
<!--            <div class="info-item">-->
<!--              <span class="label">Datum narození:</span>-->
<!--              <span class="value">{{ roomQuery.data.value.date_of_birth }}</span>-->
<!--            </div>-->
<!--            <div class="info-item">-->
<!--              <span class="label">Pohlaví:</span>-->
<!--              <span class="value">{{ translateGender(roomQuery.data.value.gender) }}</span>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="address-section">-->
<!--            <div class="info-item">-->
<!--              <span class="label">Adresa:</span>-->
<!--              <span class="value">{{ roomQuery.data.value.address }}</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
      </div>

      <div v-if="roomDetailQuery.data.value.operations && roomDetailQuery.data.value.operations.length > 0" class="templates-plan-section">
        <div v-if="roomDetailQuery.data.value.operations?.filter(o => new Date(o.op_real_start) > new Date()).length != 0" >
          <h3>
            Nejnovější operace
          </h3>
          <OperationsListView
            :data="roomDetailQuery.data.value.operations?.filter(o => new Date(o.op_real_start) > new Date())"
            :item="OperationRow"
          />
        </div>

        <div v-if="roomDetailQuery.data.value.operations?.filter(o => o.op_real_end).length != 0" >
          <h3>
            Proběhlé operace
          </h3>
          <OperationsListView
            :data="roomDetailQuery.data.value.operations?.filter(o => o.op_real_end)"
            :item="OperationRow"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.room-detail-view {
  padding: 0 2rem;
  height: var(--navbar-height);
  display: flex;
  align-items: center;
  background-color: var(--color-background);
}

.room-detail-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.main-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 1rem;
}

.top-row,
.bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.name-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  min-width: 300px;

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    color: var(--color-heading);
    white-space: nowrap;
  }

  .birth-number {
    font-size: 1.1rem;
    color: var(--color-text);
    opacity: 0.7;
    white-space: nowrap;
  }
}

.contact-section {
  display: flex;
  gap: 3rem;
  min-width: 400px;
}

.contact-item {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  white-space: nowrap;

  .label {
    font-size: 0.9rem;
    color: var(--color-text);
    opacity: 0.7;
  }

  .value {
    font-size: 1rem;
    color: var(--color-heading);
  }
}

.secondary-info {
  display: flex;
  gap: 3rem;
}

.address-section {
  padding-left: 0.5rem;
}

.info-item {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  min-width: 200px;

  .label {
    font-size: 0.8rem;
    color: var(--color-text);
    opacity: 0.6;
    white-space: nowrap;
  }

  .value {
    font-size: 0.9rem;
    color: var(--color-text);
    opacity: 0.8;
    white-space: nowrap;
  }
}

.templates-plan-section {
  margin-top: 0;
  padding: 0;
  height: calc(100% - 120px);
  overflow: hidden;

  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    padding: 0 1rem;

    h2 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
      color: var(--color-heading);
    }
  }
}

.templates-plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
  gap: 24px;
  padding: 1rem;
}

.create-new-card {
  width: 256px;
  height: 256px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  border: 2px dashed #e5e7eb;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #3b82f6;
    background-color: #f8fafc;
  }
}

.create-new-content {
  text-align: center;
  color: #4b5563;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 16px 0 8px;
    color: #1f2937;
  }

  p {
    font-size: 0.875rem;
    margin: 0;
  }
}

.create-new-icon {
  width: 48px;
  height: 48px;
  color: #3b82f6;
}

.save-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2563eb;
  }

  &:active {
    background-color: #1d4ed8;
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
</style>
