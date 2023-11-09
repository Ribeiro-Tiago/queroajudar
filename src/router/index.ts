import { Notify } from "quasar";
import { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/Posts.vue"),
      },
      {
        name: "login",
        path: "/login",
        component: () => import("src/pages/Login.vue"),
        meta: {
          allowedAuthed: false,
          title: "Iniciar sessão",
        },
      },
      {
        name: "reset",
        path: "/reset",
        component: () => import("src/pages/ResetPassword.vue"),
        meta: {
          allowedAuthed: false,
          title: "Repôr palavra-passe",
        },
      },
      {
        name: "register",
        path: "/register",
        component: () => import("src/pages/Register.vue"),
        meta: {
          allowedAuthed: false,
          title: "Registar",
        },
      },
      {
        name: "createPost",
        path: "/post",
        component: () => import("src/pages/Register.vue"),
        meta: {
          requireAuth: true,
          title: "Nova publicação",
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
  history: createWebHistory(process.env.VUE_ROUTER_BASE),
});

Router.beforeEach((to, _, next) => {
  if (to.meta) {
    // trying to access routes that don't need auth (e.g: login, register)
    // while logged while, should not be possible
    if (to.meta.allowedAuthed === false && !!localStorage.getItem("token")) {
      return next("/");
    }

    // trying to access routes that need login without being logged in is not possible
    if (to.meta.requireAuth && !localStorage.getItem("token")) {
      Notify.create({
        type: "warning",
        message: "Precisa de iniciar sessão primeiro",
      });
      return next("login");
    }
  }

  document.title = `Quero Ajudar - ${
    to.meta.title ? `- ${to.meta.title}` : ""
  }`;

  next();
});

export default Router;
