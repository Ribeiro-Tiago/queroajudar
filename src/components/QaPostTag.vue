<template>
  <q-chip
    text-color="white"
    class="cursor-pointer"
    :icon="config.icon"
    :color="config.color"
    @click="onClick"
  >
    {{ config.label }}
  </q-chip>
</template>

<script setup lang="ts">
import { NamedColor } from "quasar";
import { ref } from "vue";

interface ConfigItem {
  icon: string;
  color: NamedColor;
  label: string;
}

interface Config {
  [key: string]: ConfigItem;
}

const props = defineProps<{
  tag: string;
}>();

const emit = defineEmits<{
  (e: "click", payload: string): void;
}>();

const TAG_MAPPING: Config = {
  money: {
    icon: "euro",
    color: "green",
    label: "Dinheiro",
  },
  goods: {
    icon: "category",
    color: "blue",
    label: "Bens",
  },
  people: {
    icon: "person",
    color: "accent",
    label: "Pessoas",
  },
};

const config = ref<ConfigItem>(TAG_MAPPING[props.tag]);

const onClick = () => emit("click", props.tag);
</script>
