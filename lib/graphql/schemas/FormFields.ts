export const Queries = `
  formFieldRender(formId: Int): String
`;

export const Mutations = `
  validateFormField(fieldId: Int, payload: String): String
  validateForm(formId: Int, payload: String): String
`;