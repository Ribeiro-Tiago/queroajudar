<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title class="cursor-pointer" @click="onHomeClick">
        Quero Ajudar
      </q-toolbar-title>

      <q-btn flat @click="onAccountClick"> {{ accountText }} </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const isAuthenticated = ref(false);
const accountText = computed(() => {
  return isAuthenticated.value ? "Conta" : "Iniciar sessão";
});
const router = useRouter();

const onAccountClick = () => {
  if (isAuthenticated.value) {
    router.push("account");
  } else {
    router.push("login");
  }
};

const onHomeClick = () => router.push("/");
</script>
