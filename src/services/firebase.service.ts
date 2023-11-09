import { Notify } from "quasar";
import { initializeApp, getApp } from "firebase/app";
import {
  Functions,
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from "firebase/functions";

let functions: Functions | null = null;

const app = initializeApp({
  apiKey: "AIzaSyAiplsapBw5pBrX4SOwHbtd83Xo__fFw5U",
  authDomain: "queroajudar-7a74a.firebaseapp.com",
  projectId: "queroajudar-7a74a",
  storageBucket: "queroajudar-7a74a.appspot.com",
  messagingSenderId: "807555768727",
  appId: "1:807555768727:web:17b2d5e27d7e47a3d564d2",
  measurementId: "G-R0S7KJW8WT",
});

const getFuncs = () => {
  if (functions) {
    return functions;
  }

  functions = getFunctions(getApp(app.name), "eu-west1");
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
  return functions;
};

export const func = async <T>(name: string) => {
  try {
    const callable = httpsCallable<any, T>(getFuncs(), name, {});
    return (await callable()).data;
  } catch (err) {
    // todo: log to somewhere
    Notify.create({
      type: "negative",
      message: "Algo correu mal do nosso lado. \nTente mais tarde",
    });
    return [];
  }
};
