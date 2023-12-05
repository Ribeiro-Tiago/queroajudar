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

  <!-- <q-select
    v-if="scheduleType === 'specific'"
    v-model="scheduleInput"
    multiple
    options-dense
    use-chips
    hide-hint
    label="Que ajuda precisa"
    :rules="[required]"
    :error="!!errors.category"
    :error-message="errors.category"
    :options="helpOptions"
  >
    <template v-slot:prepend>
      <q-icon name="support" />
    </template>

    <template v-slot:selected-item="{ opt }">
      <qa-post-tag
        :key="opt.value"
        :tag="opt.value"
        removable
        @click:remove="removeCategory(opt.value)"
      />
    </template>
  </q-select> -->

  <q-date
    v-if="scheduleType === 'specific'"
    v-model:model-value="date"
  ></q-date>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QForm, QSelect } from "quasar";

import { required } from "src/utils/validators";
import QaPostScheduleRecurringSelector from "./QaPostScheduleRecurringSelector.vue";
import { useFormErrors } from "src/composables/formErrors";
import { SelectOption } from "src/types/form";
import { RecurringSchedule, SelectedDays } from "./models";

const scheduleType = ref();
const date = ref();
const recurringDays = ref<RecurringSchedule | undefined>(undefined);
const scheduleOptions = ref<SelectOption[]>([
  {
    label: "Qualquer dia / hora",
    value: "anytime",
  },
  {
    label: "Dia / hora especifica",
    value: "specific",
  },
  {
    label: "Horário recurrente",
    value: "recurring",
  },
]);

const { errors, hasErrors, handleErrors, clearErrors } = useFormErrors();
</script>
