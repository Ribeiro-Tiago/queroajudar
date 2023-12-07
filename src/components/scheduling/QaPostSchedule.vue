<template>
  <q-option-group
    v-model="scheduleType"
    :options="scheduleOptions"
    type="radio"
  />

  <div v-show="scheduleType === 'recurring'" class="q-mx-auto text-center">
    <qa-post-schedule-recurring-selector />
  </div>

  <div v-show="scheduleType === 'specific'" class="q-mx-auto text-center">
    <qa-post-schedule-specific-selector />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import QaPostScheduleRecurringSelector from "./QaPostScheduleRecurringSelector.vue";
import QaPostScheduleSpecificSelector from "./QaPostScheduleSpecificSelector.vue";
import { SelectOption } from "src/types/form";
import { ScheduleType } from "src/components/models";

const scheduleType = ref<ScheduleType>("anytime");
const scheduleOptions = ref<SelectOption[]>([
  {
    label: "Qualquer altura",
    value: "anytime",
  },
  {
    label: "Dia e hora especifica",
    value: "specific",
  },
  {
    label: "Horário recurrente",
    value: "recurring",
  },
]);
</script>
