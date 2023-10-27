export const required = (val: string) => {
  return val?.length > 0 || "Campo obrigatório";
};

export const isEmail = (val: string) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || "Não é um email válido";
};

export const isValidPassword = (val: string) => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Z\d]{8,}$/;

  return (
    passwordPattern.test(val) ||
    "Tem que contar pelo menos 1 maiúscula, 1 minúscula, 1 número e 8 caracteres"
  );
};
