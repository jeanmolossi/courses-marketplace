interface Errors {
  [key: string]: string;
}

export default function getValidationErros(errors: any): Errors {
  const validationErrors: Errors = {};

  errors.inner.forEach((error: any) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
