<template>
  <q-input
    v-model="date"
    square
    lazy-rules
    type="text"
    placeholder="E.g.: 18/05/2023"
    mask="##/##/####"
    :rules="[required, validDate]"
    :error="!!errors"
    :error-message="errors"
  >
    <template v-slot:prepend>
      <q-icon name="event" />
    </template>

    <q-popup-proxy
      fit
      transition-show="scale"
      transition-hide="scale"
      @before-show="updateProxy"
    >
      <q-date
        v-model:model-value="proxyDate"
        landscape
        minimal
        today-btn
        bordered
        first-day-of-week="1"
        :locale="{
          days: [
            'Domingo',
            'Segunda-feira',
            'Terça-feira',
            'Quarta-feira',
            'Quinta-feira',
            'Sexta-feira',
            'Sábado',
          ],
          daysShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
          months: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
          ],
          monthsShort: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez',
          ],
        }"
        :navigation-min-year-month="minMonthYear"
        style="width: 512px"
      >
        <div class="row items-center justify-end q-gutter-sm">
          <q-btn v-close-popup label="Cancelar" color="primary" flat />

          <q-btn
            v-close-popup
            label="Escolher"
            color="primary"
            offset
            @click="onSave"
          />
        </div>
      </q-date>
    </q-popup-proxy>
  </q-input>

  <template v-if="date">
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="time-group">
        <qa-post-schedule-recurring-time
          :model-value="times"
          @update:model-value="onTimesUpdate"
        />
      </div>
    </transition>
  </template>
</template>

<script setup lang="ts">
import dayjs from "src/services/dayjs.service";
import { ref } from "vue";

import { required, validDate } from "src/utils/validators";
import QaPostScheduleRecurringTime from "./QaPostScheduleRecurringTime.vue";
import { ScheduleTime, SpecificSchedule } from "../models";
import { getNewGroupTimes } from "src/utils/scheduling";

const $emit = defineEmits<{
  (e: "update:model-value", payload: SpecificSchedule): void;
}>();

const date = ref("");
const proxyDate = ref("");
const errors = ref("");
const minMonthYear = ref(dayjs().format("YYYY/MM"));
const times = ref<ScheduleTime[]>([]);

const updateProxy = () => {
  if (date.value) {
    const [d, m, y] = date.value.split("/");
    proxyDate.value = `${y}/${m}/${d}`;
  }
};

const onSave = () => {
  const [y, m, d] = proxyDate.value.split("/");
  date.value = `${d}/${m}/${y}`;

  if (!times.value.length) {
    times.value = [getNewGroupTimes()];
    $emit("update:model-value", {
      day: dayjs(date.value, "DD/MM/YYYY"),
      times: times.value,
    });
  }
};

const onTimesUpdate = (payload: ScheduleTime[]) => {
  times.value = payload;
  $emit("update:model-value", {
    day: dayjs(date.value, "DD/MM/YYYY"),
    times: payload,
  });
};
</script>

<style lang="scss" scoped>
.time-group {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
