<template>
  <q-option-group
    v-model="scheduleType"
    :options="scheduleOptions"
    label="foo"
    type="radio"
    inline
  />

  <div v-show="scheduleType === 'recurring'" class="q-mx-auto text-center">
    <qa-post-schedule-recurring-selector
      v-model:model-value="recurringDays"
      @update:model-value="console.log"
    />
  </div>

  <div v-show="scheduleType === 'specific'" class="q-mx-auto text-center">
    <qa-post-schedule-specific-selector />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QForm, QSelect } from "quasar";

import QaPostScheduleRecurringSelector from "./QaPostScheduleRecurringSelector.vue";
import QaPostScheduleSpecificSelector from "./QaPostScheduleSpecificSelector.vue";
import { required } from "src/utils/validators";
import { useFormErrors } from "src/composables/formErrors";
import { SelectOption } from "src/types/form";
import { RecurringSchedule, SelectedDays } from "src/components/models";

const scheduleType = ref();
const recurringDays = ref<RecurringSchedule | undefined>(undefined);
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

const { errors, hasErrors, handleErrors, clearErrors } = useFormErrors();
</script>
