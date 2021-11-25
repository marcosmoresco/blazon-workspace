export const Queries = `
  formFieldRender(formId: Int): String
  generateUsernames(formId: Int, amountSuggestions: Int, usernamePolicyId: Int, payload: String): [String]
`;

export const Mutations = `
  validateFormField(fieldId: Int, payload: String): String
  validateForm(formId: Int, payload: String): String  
`;