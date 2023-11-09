<template>
  <q-card>
    <img
      src="https://re-food.org/wp-content/uploads/2020/02/RE-FOOD-logo-02.png"
    />

    <q-card-section class="row">
      <div class="text-h6 column">
        {{ post.title }}
        <span class="text-subtitle2 font-weight-normal">
          {{ post.created_by }}, {{ post.created_at }}
        </span>
      </div>
    </q-card-section>

    <q-card-section>
      {{ post.description }}
    </q-card-section>

    <q-card-section>
      <div class="q-mb-sm">
        <q-chip
          v-for="location in post.locations"
          :key="location"
          class="cursor-pointer"
          @click="onLocationClick"
        >
          {{ location }}
        </q-chip>
      </div>

      <qa-post-tag
        v-for="tag in post.tags"
        :key="tag"
        :tag="tag"
        @click="onTagClick"
      />
    </q-card-section>

    <!-- <q-separator dark /> -->

    <!-- <q-card-actions>
      <q-btn flat>Action 1</q-btn>
      <q-btn flat>Action 2</q-btn>
    </q-card-actions> -->
  </q-card>
</template>

<script setup lang="ts">
import QaPostTag from "src/components/QaPostTag.vue";
import { Post } from "src/types/post";

defineProps<{
  post: Post;
}>();

const onLocationClick = () => {};

const onTagClick = () => {};
</script>

<style scoped>
img {
  position: absolute;
  top: 0;
  bottom: 0;
  height: 90%;
  width: auto;
  opacity: 0.2;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
