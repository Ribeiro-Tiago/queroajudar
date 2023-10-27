<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24 q-pb-md" style="width: 600px">
          <q-card-section class="bg-primary">
            <h2 class="text-h5 text-white q-my-xs">Iniciar sessão</h2>
          </q-card-section>

          <q-card-section>
            <q-form
              greedy
              no-error-focus
              no-reset-focus
              ref="form"
              class="q-px-sm q-pt-sm"
            >
              <q-input
                v-model="email"
                square
                clearable
                lazy-rules
                type="email"
                label="Email"
                :rules="[required, isEmail]"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>

              <q-input
                v-model="password"
                square
                clearable
                lazy-rules
                label="Palavra passe"
                autocorrect="off"
                autocapitalize="off"
                autocomplete="off"
                spellcheck="false"
                :type="passwordFieldType"
                :rules="[required, isValidPassword]"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>

                <template v-slot:append>
                  <q-icon
                    class="cursor-pointer"
                    :name="visibilityIcon"
                    @click="switchVisibility"
                  />
                </template>
              </q-input>
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-lg">
            <q-btn
              type="submit"
              unelevated
              size="md"
              color="secondary"
              class="full-width text-white"
              label="Iniciar sessão"
              :loading="submitting"
              @click="submit"
            />
          </q-card-actions>

          <q-card-section
            class="text-center q-pa-sm column justify-center items-center"
          >
            <router-link to="register" class="text-grey-6 q-pb-sm">
              Criar conta
            </router-link>

            <router-link to="reset" class="text-grey-6 q-pb-sm">
              Esqueci-me da palavra passe
            </router-link>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { QInputProps, QForm } from "quasar";
import { ref } from "vue";

import { required, isEmail, isValidPassword } from "src/utils/validators";

const email = ref<string>("");
const password = ref<string>("");

const form = ref<QForm>();
const passwordFieldType = ref<QInputProps["type"]>("password");
const visibility = ref<boolean>(false);
const visibilityIcon = ref<"visibility" | "visibility_off">("visibility");
const submitting = ref<boolean>(false);

// form controls
const switchVisibility = () => {
  if (visibility.value) {
    visibility.value = false;
    passwordFieldType.value = "password";
    visibilityIcon.value = "visibility";
  } else {
    visibility.value = true;
    passwordFieldType.value = "text";
    visibilityIcon.value = "visibility_off";
  }
};

const submit = async () => {
  // won't really happen, but keeps linter happy
  if (!form.value) {
    return;
  }

  if (!(await form.value.validate())) {
    return;
  }

  submitting.value = true;
  setTimeout(() => {
    submitting.value = false;
  }, 2000);
};
</script>
