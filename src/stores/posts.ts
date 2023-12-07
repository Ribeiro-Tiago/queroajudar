import { defineStore } from "pinia";

import dayjs from "src/services/dayjs.service";
import { Post, PostSchedule } from "src/types/post";
import { getPosts } from "src/services/posts.service";

interface EmptyPost {
  schedule: PostSchedule;
  id?: string;
  description?: string;
  title?: string;
  tags?: string[];
  locations?: string[];
}

interface PostState {
  _post: Post | EmptyPost;
  _posts: Post[];
  _loading: boolean;
  _dialogVisible: boolean;
  _dialogRendered: boolean;
}

const DEFAULT_POST: EmptyPost = { schedule: { type: "anytime" } };

const formatDate = (date: number) => {
  return dayjs(date).format("hh:mm DD/MM/YYYY");
};

export const usePostsStore = defineStore("posts", {
  state: (): PostState => ({
    _posts: [],
    _post: { ...DEFAULT_POST },
    _loading: true,
    _dialogVisible: true,
    _dialogRendered: false,
  }),
  getters: {
    posts: (state) => state._posts,
    loading: (state) => state._loading,
    dialogVisible: (state) => state._dialogVisible,
    dialogRendered: (state) => state._dialogRendered,
  },
  actions: {
    async getPosts() {
      this._loading = true;

      try {
        const posts = await getPosts();

        this._posts = posts.map((p) => ({
          ...p,
          // created_at: formatDate(p.created_at.seconds),
        }));
      } catch (err) {
        console.log(err);
      }

      this._loading = false;
    },

    updatePost(prop: string, val: string | string[] | PostSchedule) {
      this._post = { ...this._post, [prop]: val };
    },

    setPost(post: Post) {
      this._post = post || { ...DEFAULT_POST };
    },

    async createPost() {
      // await addPost(this._post);
    },

    openDialog() {
      if (!this._dialogRendered) {
        this._dialogRendered = true;
      } else {
        this._dialogVisible = true;
      }
    },

    closeDialog() {
      this._dialogVisible = false;
    },
  },
});
