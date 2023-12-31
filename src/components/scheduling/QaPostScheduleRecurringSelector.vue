<template>
  <q-btn
    :outline="!selected['monday']"
    round
    color="primary"
    size="md"
    padding="sm md"
    class="q-mr-sm"
    label="S"
    @click="toggleDay('monday')"
  >
    <q-tooltip transition-show="scale" transition-hide="scale">
      Segunda-feira
    </q-tooltip>
  </q-btn>

  <q-btn
    :outline="!selected['tuesday']"
    round
    color="primary"
    size="md"
    padding="sm md"
    class="q-mr-sm"
    label="T"
    @click="toggleDay('tuesday')"
  >
    <q-tooltip transition-show="scale" transition-hide="scale">
      Terça-feira
    </q-tooltip>
  </q-btn>

  <q-btn
    :outline="!selected['wednesday']"
    round
    color="primary"
    size="md"
    padding="sm md"
    class="q-mr-sm"
    label="Q"
    @click="toggleDay('wednesday')"
  >
    <q-tooltip transition-show="scale" transition-hide="scale">
      Quarta-feira
    </q-tooltip>
  </q-btn>

  <q-btn
    :outline="!selected['thursday']"
    round
    color="primary"
    size="md"
    padding="sm md"
    class="q-mr-sm"
    label="Q"
    @click="toggleDay('thursday')"
  >
    <q-tooltip transition-show="scale" transition-hide="scale">
      Quinta-feira
    </q-tooltip>
  </q-btn>

  <q-btn
    :outline="!selected['friday']"
    round
    color="primary"
    size="md"
    padding="sm md"
    class="q-mr-sm"
    label="S"
    @click="toggleDay('friday')"
  >
    <q-tooltip transition-show="scale" transition-hide="scale">
      Sexta-feira
    </q-tooltip>
  </q-btn>

  <q-btn
    :outline="!selected['saturday']"
    round
    color="primary"
    size="md"
    padding="sm md"
    class="q-mr-sm"
    label="S"
    @click="toggleDay('saturday')"
  >
    <q-tooltip transition-show="scale" transition-hide="scale">
      Sábado
    </q-tooltip>
  </q-btn>

  <q-btn
    :outline="!selected['sunday']"
    round
    color="primary"
    size="md"
    padding="sm md"
    class="q-mr-sm"
    label="D"
    @click="toggleDay('sunday')"
  >
    <q-tooltip transition-show="scale" transition-hide="scale">
      Domingo
    </q-tooltip>
  </q-btn>

  <br />
  <br />

  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    v-for="({ day, times }, idx) in timeGroups"
    :key="day"
  >
    <div class="time-group" :class="{ 'q-mt-md': idx !== 0 }">
      <span>{{ toHumanDay(day) }}</span>

      <qa-post-schedule-recurring-time
        :model-value="times"
        @update:model-value="onTimesUpdate(day, $event)"
      />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { PropType, onBeforeMount, ref } from "vue";

import {
  Day,
  RecurringSchedule,
  ScheduleTime,
  RecurringScheduleTimeGroup,
} from "src/components/models";
import QaPostScheduleRecurringTime from "./QaPostScheduleRecurringTime.vue";
import { getNewGroupTimes } from "src/utils/scheduling";
import { toHumanDay } from "src/utils/scheduling";
import { usePostsStore } from "src/stores/posts";

// setup

const props = defineProps({
  modelValue: {
    type: Object as PropType<RecurringSchedule>,
    default: () => ({
      monday: [getNewGroupTimes()],
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null,
    }),
  },
});

const $store = usePostsStore();

// data
const selected = ref<RecurringSchedule>(props.modelValue);

const timeGroups = ref<RecurringScheduleTimeGroup[]>();

// hooks
onBeforeMount(() => setupTimeGroups(selected.value));

// methods

const toggleDay = (day: Day) => {
  const updated = { ...selected.value };

  if (!selected.value[day]) {
    updated[day] = [getNewGroupTimes()];
  } else {
    updated[day] = null;
  }

  setupTimeGroups(updated);

  selected.value = updated;

  onUpdate(updated);
};

const onTimesUpdate = (day: Day, newTimes: ScheduleTime[]) => {
  selected.value[day] = newTimes;
  onUpdate(selected.value);
};

const setupTimeGroups = (updated: RecurringSchedule) => {
  timeGroups.value = Object.entries(updated).reduce((result, [key, times]) => {
    if (times) {
      result.push({ day: key as Day, times });
    }

    return result;
  }, [] as RecurringScheduleTimeGroup[]);
};

const onUpdate = (payload: RecurringSchedule) => {
  $store.updatePost("schedule", {
    type: "recurring",
    payload: Object.fromEntries(
      Object.entries(payload).filter(([_, value]) => value !== null)
    ) as RecurringSchedule,
  });
};
</script>

<style lang="scss" scoped>
.time-group {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  span {
    width: 90px;
    display: inline-block;
    text-align: left;
    margin-top: 10px;
  }
}
</style>
