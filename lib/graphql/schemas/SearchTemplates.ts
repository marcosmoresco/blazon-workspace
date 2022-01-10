export const SearchTemplates = `  

  type SearchTemplates {
    identifier: Int
    name: String
    description: String
    enabled: Boolean
    formId: Int     
  }  
`;

export const Queries = `
  getSearchTemplates: [SearchTemplates] 
`;
