<template>
  <q-header elevated class="bg-primary">
    <q-toolbar>
      <q-toolbar-title>
        <router-link to="/"> Quero Ajudar </router-link>
      </q-toolbar-title>

      <q-btn-dropdown v-if="user" :label="user.name" auto-close flat>
        <q-list>
          <q-item clickable v-close-popup to="account">
            <q-item-section>
              <q-item-label>Conta</q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-close-popup @click="logout">
            <q-item-section>
              <q-item-label>Sair</q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-btn v-else flat to="login"> Iniciar sessão </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useSessionStore } from "src/stores/session";

const { user, logout } = useSessionStore();
</script>

<style scoped>
.q-toolbar__title a {
  text-decoration: none;
  color: #fff;
}
</style>
