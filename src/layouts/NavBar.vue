<template>
  <q-header elevated class="bg-primary">
    <q-toolbar>
      <q-toolbar-title class="cursor-pointer" @click="onHomeClick">
        Quero Ajudar
      </q-toolbar-title>

      <q-btn flat @click="onAccountClick"> {{ accountText }} </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useSessionStore } from "src/stores/session";

const accountText = ref("Iniciar Sessão");
const router = useRouter();
const userStore = useSessionStore();

let authenticated = false;

userStore.$subscribe(
  (_, store) => {
    authenticated = !!store._user;

    accountText.value = "Conta";
  },
  { immediate: true }
);

const onAccountClick = () => {
  if (authenticated) {
    router.push("account");
  } else {
    router.push("login");
  }
};

const onHomeClick = () => router.push("/");
</script>
