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
          >
            <q-input
              v-model="name"
              square
              clearable
              lazy-rules
              type="text"
              label="Nome"
              :rules="[required]"
            >
              <template v-slot:prepend>
                <q-icon name="face" />
              </template>
            </q-input>

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
              v-model="email2"
              square
              clearable
              lazy-rules
              type="email"
              label="Repita email"
              :rules="[required, isEmail, emailMatch]"
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

import { register } from "src/services/user.service";
import { required, isEmail, isValidPassword } from "src/utils/validators";

const email = ref<string>("");
const email2 = ref<string>("");
const password = ref<string>("");
const name = ref<string>("");
const type = ref<string>("");
const userCreated = ref<boolean>(false);

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

const emailMatch = () => {
  return email.value === email2.value || "Emails não são iguais";
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

  try {
    await register(email.value, password.value);
    userCreated.value = true;
  } catch (err) {
    console.log("error", err);
  }

  submitting.value = false;
};
</script>
