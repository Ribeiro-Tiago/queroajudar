import { initializeApp, FirebaseApp } from "firebase/app";

import { Functions, getFunctions, httpsCallable } from "firebase/functions";

let app: FirebaseApp | null = null;
let functions: Functions | null = null;

const getFuncs = () => {
  if (functions) {
    return functions;
  }

  functions = getFunctions();
  return functions;
};

export const getApp = () => {
  if (app) {
    return app;
  }

  app = initializeApp({
    apiKey: "AIzaSyAiplsapBw5pBrX4SOwHbtd83Xo__fFw5U",
    authDomain: "queroajudar-7a74a.firebaseapp.com",
    projectId: "queroajudar-7a74a",
    storageBucket: "queroajudar-7a74a.appspot.com",
    messagingSenderId: "807555768727",
    appId: "1:807555768727:web:17b2d5e27d7e47a3d564d2",
    measurementId: "G-R0S7KJW8WT",
  });
};

export const func = (name: string) => httpsCallable(getFuncs(), name);
