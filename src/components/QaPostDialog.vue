<template>
  <q-dialog
    full-height
    :model-value="store.dialogVisible"
    @update:model-value="store.closeDialog()"
  >
    <q-card square class="q-pb-md" style="width: 90vw">
      <q-card-section class="bg-primary">
        <h2 class="text-h5 text-white q-my-xs">Nova publicação</h2>
      </q-card-section>

      <q-card-section>
        <q-form
          greedy
          no-error-focus
          no-reset-focus
          ref="form"
          class="q-px-sm q-pt-sm"
          @keydown.enter="submit"
        >
          <!-- title -->
          <q-input
            v-model="title"
            square
            lazy-rules
            type="text"
            label="Título"
            placeholder="E.g.: Precisa-se voluntário para ajudar com a distribuição de comida às sextas à noite"
            :rules="[required]"
            :error="!!errors.title"
            :error-message="errors.title"
          >
            <template v-slot:prepend>
              <q-icon name="title" />
            </template>
          </q-input>

          <!-- description -->
          <q-input
            v-model="description"
            square
            lazy-rules
            autogrow
            type="textarea"
            label="Descrição"
            placeholder="E.g.: Precisa-se voluntário"
            :rules="[required]"
            :error="!!errors.description"
            :error-message="errors.description"
          >
            <template v-slot:prepend>
              <q-icon name="description" />
            </template>
          </q-input>

          <!-- locations -->
          <q-select
            v-model="locationInput"
            use-input
            multiple
            options-dense
            use-chips
            hide-hint
            label="Área(s) de atuação"
            placeholder="E.g.: Barreiro; Bombarral; Lisboa"
            :rules="[required]"
            :error="!!errors.locations"
            :error-message="errors.locations"
            :options="locations"
            :loading="fetchingLocations"
            @filter="fetchLocations"
          >
            <template v-slot:prepend>
              <q-icon name="map" />
            </template>

            <template v-slot:selected-item="{ opt }">
              <q-chip
                square
                dense
                removable
                color="primary"
                text-color="white"
                @remove="onRemoveLocation(opt)"
              >
                {{ opt }}
              </q-chip>
            </template>

            <template v-slot:no-option="{ inputValue }">
              <q-item>
                <q-item-section>
                  {{
                    inputValue
                      ? "Sem resultados"
                      : "Escreva para procurar morada"
                  }}
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <!-- category -->
          <q-select
            v-model="categoryInput"
            multiple
            options-dense
            use-chips
            hide-hint
            label="Que ajuda precisa"
            class="q-mb-sm"
            :rules="[required]"
            :error="!!errors.category"
            :error-message="errors.category"
            :options="helpOptions"
          >
            <template v-slot:prepend>
              <q-icon name="support" />
            </template>

            <template v-slot:selected-item="{ opt }">
              <qa-post-tag
                :key="opt.value"
                :tag="opt.value"
                removable
                @click:remove="removeCategory(opt.value)"
              />
            </template>
          </q-select>

          <!-- horarios -->
          <label>Horário</label>
          <qa-post-schedule />
        </q-form>
      </q-card-section>

      <q-card-actions class="q-px-lg column justify-center">
        <q-btn
          color="secondary"
          label="Criar publicação"
          type="submit"
          class="full-width q-mb-md"
          outline
          :disable="hasErrors"
          :loading="submitting"
          @click="submit"
        />

        <q-btn
          flat
          label="Cancelar"
          :disable="submitting"
          @click="store.closeDialog()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QForm, QSelect } from "quasar";

import { required } from "src/utils/validators";
import { useFormErrors } from "src/composables/formErrors";
import { usePostsStore } from "src/stores/posts";
import { getCities } from "src/services/geoapify.service";
import QaPostTag from "./QaPostTag.vue";
import QaPostSchedule from "./QaPostSchedule.vue";
import { SelectOption } from "src/types/form";

const title = ref<string>("");
const description = ref<string>("");
const locationInput = ref<string[]>([]);
const locations = ref<string[]>([]);
const fetchingLocations = ref(false);

const form = ref<QForm>();
const categoryInput = ref<SelectOption[]>([]);
const helpOptions = ref<SelectOption[]>([
  { label: "Dinheiro", value: "money" },
  { label: "Voluntários", value: "people" },
  { label: "Bens & comida", value: "goods" },
  { label: "Outros", value: "other" },
]);

const submitting = ref<boolean>(false);

const { errors, hasErrors, handleErrors, clearErrors } = useFormErrors();

const store = usePostsStore();

const fetchLocations = async (
  text: string,
  update: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void,
  abort: () => void
) => {
  if (text?.length <= 2) {
    update(() => (locations.value = []));
    abort();
    fetchingLocations.value = false;
    return;
  }

  if (fetchingLocations.value) {
    update(() => (locations.value = []));
    return;
  }

  fetchingLocations.value = true;

  update(() => {
    getCities(text)
      .then((cities) => (locations.value = (cities as string[]) || []))
      .catch(abort)
      .finally(() => (fetchingLocations.value = false));
  });
};

const onRemoveLocation = (location: string) => {
  locationInput.value = locationInput.value.filter((l) => l !== location);
};

const removeCategory = (category: string) => {
  categoryInput.value = categoryInput.value.filter(({ value }) => {
    return category !== value;
  });
};

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

  // login(email.value, password.value)
  //   .then(() => store.closeDialog())
  //   .catch((errs) => {
  //     handleErrors(errs);
  //     submitting.value = false;
  //   });
};
</script>

<style scoped>
.q-list {
  max-height: 200px;
  overflow: auto;
}
</style>
