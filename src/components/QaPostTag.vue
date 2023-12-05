<template>
  <q-chip
    text-color="white"
    class="cursor-pointer"
    square
    :icon="config.icon"
    :color="config.color"
    :removable="removable"
    @click="onClick"
    @remove="onRemoveClick"
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

const props = defineProps({
  tag: { type: String, required: true },
  removable: { type: Boolean, default: false },
});

const emit = defineEmits<{
  (e: "click" | "click:remove", payload: string): void;
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
    label: "Bens & comida",
  },
  people: {
    icon: "person",
    color: "accent",
    label: "Pessoas",
  },
  other: {
    icon: "help",
    color: "orange",
    label: "Outros",
  },
};

const config = ref<ConfigItem>(TAG_MAPPING[props.tag]);

const onClick = () => emit("click", props.tag);

const onRemoveClick = () => emit("click:remove", props.tag);
</script>
