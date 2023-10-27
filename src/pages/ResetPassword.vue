<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24 q-pb-md" style="width: 600px">
          <q-card-section class="bg-primary">
            <h2 class="text-h5 text-white q-my-xs">Recuperar palavra passe</h2>
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
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-lg">
            <q-btn
              type="submit"
              unelevated
              size="md"
              color="secondary"
              class="full-width text-white"
              label="Recuperar"
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

            <router-link to="login" class="text-grey-6 q-pb-sm">
              Iniciar sessão
            </router-link>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { QForm } from "quasar";
import { ref } from "vue";

import { required, isEmail } from "src/utils/validators";

const email = ref<string>("");

const form = ref<QForm>();
const submitting = ref<boolean>(false);

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
