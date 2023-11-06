interface Errors {
  [key: string]: string;
}

export class AxiosError extends Error {
  data: {
    reason: string;
    errors: Errors;
  };
  status: number;

  constructor(reason: string, status: number, errors: Errors = {}) {
    super(reason);

    this.data = { reason, errors };
    this.status = status;
  }
}
