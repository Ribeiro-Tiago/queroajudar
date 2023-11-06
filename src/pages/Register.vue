<template>
  <q-page class="row justify-center items-center">
    <q-card square class="shadow-24 q-pb-md" style="width: 600px">
      <q-card-section class="bg-primary">
        <h2 class="text-h5 text-white q-my-xs">Registar</h2>
      </q-card-section>

      <template v-if="!userCreated">
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
              v-model="name"
              square
              lazy-rules
              type="text"
              label="Nome"
              :error="!!errors.name"
              :error-message="errors.name"
              :rules="[required]"
            >
              <template v-slot:prepend>
                <q-icon name="face" />
              </template>
            </q-input>

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

            <q-input
              v-model="email2"
              square
              lazy-rules
              type="email"
              label="Repita email"
              :rules="[required, isEmail, match(email, 'Emails')]"
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>

            <q-input
              v-model="password"
              square
              lazy-rules
              label="Palavra passe"
              autocorrect="off"
              autocapitalize="off"
              autocomplete="off"
              spellcheck="false"
              :error="!!errors.password"
              :error-message="errors.password"
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

            <q-input
              v-model="password2"
              square
              lazy-rules
              label="Repita palavra passe"
              autocorrect="off"
              autocapitalize="off"
              autocomplete="off"
              spellcheck="false"
              :type="passwordFieldType"
              :rules="[
                required,
                isValidPassword,
                match(password, 'Palavras passe'),
              ]"
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

            <q-option-group
              v-model="type"
              :options="userTypes"
              label="foo"
              type="radio"
              inline
            />
          </q-form>
        </q-card-section>

        <q-card-actions class="q-px-lg">
          <q-btn
            type="submit"
            unelevated
            size="md"
            color="secondary"
            class="full-width text-white"
            label="Registar"
            :loading="submitting"
            @click="submit"
          />
        </q-card-actions>

        <q-card-section
          class="text-center q-pa-sm column justify-center items-center"
        >
          <router-link to="login" class="text-grey-6 q-pb-sm">
            Iniciar sessão
          </router-link>
        </q-card-section>
      </template>

      <q-card-section v-else>
        <h6 class="q-my-md">Criado com sucesso</h6>

        <span class="q-text-center">
          Foi enviado um email para confirmar o registo, utilize o link no email
          para ativar a sua conta e poder iniciar sessão
        </span>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { QInputProps, QForm } from "quasar";
import { ref } from "vue";

import { UserType } from "src/types/user";
import { register } from "src/services/user.service";
import {
  required,
  isEmail,
  isValidPassword,
  match,
} from "src/utils/validators";
import { AxiosError } from "src/exceptions";

const email = ref<string>("");
const email2 = ref<string>("");
const password = ref<string>("");
const password2 = ref<string>("");
const name = ref<string>("");
const type = ref<UserType>("org");
const userCreated = ref<boolean>(false);
const errors = ref<{ [key: string]: string }>({});

const form = ref<QForm>();
const userTypes = ref([
  { label: "Voluntário", value: "volunteer" },
  { label: "Organização", value: "org" },
]);
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

  errors.value = {};
  submitting.value = true;

  try {
    await register({
      email: email.value,
      password: password.value,
      name: name.value,
      type: type.value,
    });
    userCreated.value = true;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.status === 422) {
        // show form errors
        for (const [field, error] of Object.entries(err.data.errors)) {
          errors.value[field] = error;
        }

        return;
      }
    }
  } finally {
    submitting.value = false;
  }
};
</script>
