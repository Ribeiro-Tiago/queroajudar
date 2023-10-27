<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title class="cursor-pointer" @click="onHomeClick">
        Quero Ajudar
      </q-toolbar-title>

      <q-btn flat @click="onAccountClick"> Conta </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isAuthenticated = ref(false);
const router = useRouter();

const onAccountClick = () => {
  if (isAuthenticated.value) {
    router.push('account');
  } else {
    router.push('login');
  }
};

const onHomeClick = () => router.push('/');
</script>
