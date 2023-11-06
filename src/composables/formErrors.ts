import { ref } from "vue";

import { FormErrors } from "src/types/form";
import { AxiosError } from "src/exceptions";

// by convention, composable function names start with "use"
export function useFormErrors() {
  const errors = ref<FormErrors>({});

  const handleErrors = (err: unknown) => {
    // unexpected error happened somewhere
    if (!(err instanceof AxiosError)) {
      return;
    }

    if (err.status === 422) {
      // show form errors
      for (const [field, error] of Object.entries(err.data.errors)) {
        errors.value[field] = error;
      }
    }
  };

  const clearErrors = () => (errors.value = {});

  return { errors, handleErrors, clearErrors };
}
