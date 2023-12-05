<template>
  <div class="w-100 item-group">
    <template v-for="(time, idx) in times" :key="idx">
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div class="picker-group">
          <qa-time-picker
            :model-value="time.start"
            :error="time.error"
            @update:model-value="onChange($event, 'start', time)"
          />

          -

          <qa-time-picker
            :model-value="time.end"
            :error="time.error"
            @update:model-value="onChange($event, 'end', time)"
          />

          <div class="button-group">
            <q-btn
              v-if="idx > 0"
              round
              dense
              outline
              size="xs"
              icon="remove"
              color="secondary"
              @click="onRemove(time.id)"
            >
              <q-tooltip>Remover horário</q-tooltip>
            </q-btn>

            <q-btn
              v-if="idx === times.length - 1"
              round
              dense
              outline
              size="xs"
              icon="add"
              class="q-ml-sm"
              color="secondary"
              @click="onAdd"
            >
              <q-tooltip>Adicionar outro horário</q-tooltip>
            </q-btn>
          </div>
        </div>
      </transition>

      <small v-if="time.error" class="text-negative text-left block q-mt-xs">
        Hora inicio tem que ser antes de hora de fim
      </small>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import QaTimePicker from "./QaTimePicker.vue";
import { ScheduleTime } from "src/components/models";
import { getNewGroupTimes } from "src/utils/scheduling";

const props = defineProps({
  modelValue: { type: Array<ScheduleTime>, required: true },
});

const $emit = defineEmits<{
  (e: "update:model-value", payload: ScheduleTime[]): void;
}>();

const times = ref<ScheduleTime[]>(props.modelValue);

const onAdd = () => {
  times.value = [...times.value, getNewGroupTimes()];

  $emit("update:model-value", times.value);
};

const onRemove = (id: string) => {
  times.value = times.value.filter((t) => t.id !== id);
  $emit("update:model-value", times.value);
};

const onChange = (val: string, field: "start" | "end", item: ScheduleTime) => {
  const validateTime = (
    [hour1, minute1]: number[],
    [hour2, minute2]: number[]
  ) => {
    return hour1 > hour2 || (hour1 === hour2 && minute1 >= minute2);
  };

  const newTime = val.split(":").map((v) => Number(v));

  if (field === "start") {
    // check if start time is lower than end time
    const currTime = item.end.split(":").map((v) => Number(v));

    item.error = validateTime(newTime, currTime);
    item.start = val;
  } else {
    // check if end time is higher than start time
    const currTime = item.start.split(":").map((v) => Number(v));

    item.error = validateTime(currTime, newTime);
    item.end = val;
  }

  times.value = times.value.map((t) => (t.id === item.id ? item : t));

  if (!item.error) {
    $emit("update:model-value", times.value);
  }
};
</script>

<style lang="scss" scoped>
.item-group {
  width: 50%;

  .picker-group {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:first-child {
      .button-group {
        justify-content: flex-end;
        padding-right: 4px;
      }
    }

    .button-group {
      width: 50px;
      justify-content: flex-start;
      display: flex;
    }
  }
}

// .text-error
</style>
