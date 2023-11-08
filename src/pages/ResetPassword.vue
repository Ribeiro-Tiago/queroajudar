<template>
  <q-page class="row justify-center items-center">
    <q-card square class="shadow-24 q-pb-md" style="width: 600px">
      <q-card-section class="bg-primary">
        <h2 class="text-h5 text-white q-my-xs">Recuperar palavra passe</h2>
      </q-card-section>

      <template v-if="!emailSent">
        <q-card-section>
          <q-form
            greedy
            no-error-focus
            no-reset-focus
            ref="form"
            class="q-px-sm q-pt-sm"
            @keydown.enter="submit"
          >
            <q-input
              v-model="email"
              square
              lazy-rules
              type="email"
              label="Email"
              :error="!!errors.email"
              :error-message="errors.email"
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
      </template>

      <q-card-section v-else>
        <h6 class="q-my-md">Pedido de recuperação enviado</h6>

        <span class="q-text-center">
          Foi enviado um email com os passos seguintes do processo
        </span>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { QForm } from "quasar";
import { ref } from "vue";

import { required, isEmail } from "src/utils/validators";
import { useFormErrors } from "src/composables/formErrors";
import { resetPassword } from "src/services/user.service";

const email = ref<string>("");

const form = ref<QForm>();
const submitting = ref<boolean>(false);
const emailSent = ref<boolean>(false);
const { errors, handleErrors, clearErrors } = useFormErrors();

const submit = async () => {
  // won't really happen, but keeps linter happy
  if (!form.value) {
    return;
  }

  if (!(await form.value.validate())) {
    return;
  }

  clearErrors();
  submitting.value = true;

  resetPassword(email.value)
    .then(() => (emailSent.value = true))
    .catch(handleErrors)
    .finally(() => (submitting.value = false));
};
</script>
