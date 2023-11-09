import { defineStore } from "pinia";
import dayjs from "dayjs";

import { Post } from "src/types/post";
import { getPosts } from "src/services/posts.service";

interface postState {
  _posts: Post[];
  _loading: boolean;
}

const formatDate = (date: number) => {
  return dayjs(date).format("hh:mm DD/MM/YYYY");
};

export const usePostsStore = defineStore("posts", {
  state: (): postState => ({
    _posts: [],
    _loading: true,
  }),
  getters: {
    posts: (state) => state._posts,
    loading: (state) => state._loading,
  },
  actions: {
    async getPosts() {
      this._loading = true;
      await getPosts()
        .then((posts) => {
          this._posts = posts.map((p) => ({
            ...p,
            created_at: formatDate(p.created_at.seconds),
          }));
        })
        .catch((err) => console.log(err))
        .finally(() => (this._loading = false));
    },
  },
});