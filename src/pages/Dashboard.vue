<template>
  <q-page class="items-center justify-evenly">
    <q-btn @click="store.openDialog">criar</q-btn>

    <qa-filter />

    <q-virtual-scroll
      v-slot="{ item }"
      style="max-height: 400px"
      separator
      :items="store.posts"
    >
      <qa-post :post="item" />
    </q-virtual-scroll>

    <q-pagination
      v-model="page"
      max="5"
      direction-links
      boundary-numbers
      flat
      color="grey"
      active-color="primary"
    />
  </q-page>

  <qa-post-dialog v-if="store.dialogRendered" />
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

import QaFilter from "src/components/QaFilter.vue";
import QaPost from "src/components/QaPost.vue";
import QaPostDialog from "src/components/QaPostDialog.vue";
import { usePostsStore } from "src/stores/posts";

const page = ref(0);
const store = usePostsStore();

onBeforeMount(() => store.getPosts());
</script>

<style scoped>
.q-page {
  width: 60vw;
  display: block;
  margin: auto;
}
</style>
