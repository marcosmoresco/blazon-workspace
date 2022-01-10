import axios from "axios";
import { config } from "../utils";

export const FormFieldsQueries = {
  formFieldRender: async (parent: any, args: any, context: any) => {
    try {
      const formFields = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/forms/${args?.formId}/render`,
        { ...config(context) }
      );
      const result: {[key: string]: any} = {
        needRendering: formFields.data?.needRendering,
        attributes: {}
      };
      for( const category of Object.keys(formFields.data?.attributes) ) {     
        result["attributes"][category] = {
          fields: [],
          help: formFields.data?.attributes[category].help
        };
        for( const attribute of formFields.data?.attributes[category]?.fields ) {        
          let _att = {...attribute};
          if (attribute.type === "LIST") {          
            const listValues = await axios.get(
              attribute?.listValues,
              { ...config(context) }
            );
            _att.listValues = listValues.data || [];
          } else if(attribute.type === "CATEGORY") {
            if(attribute.entryType) {
              const values = await axios.get(
                `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/forms/fields/system/category/values?entryType=${attribute?.entryType}`,
                { ...config(context) }
              );
              _att.listValues = values.data || [];
            }            
          } else if(attribute.type === "CLASSIFICATION") {
            if(attribute.entryType) {
              const values = await axios.get(
                `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/forms/fields/system/classification/values?entryType=${attribute?.entryType}`,
                { ...config(context) }
              );
              _att.listValues = values.data || [];
            }  
          } else if(attribute.type === "ENVIRONMENT") {
            const values = await axios.get(
              `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/forms/fields/system/environment/values`,
              { ...config(context) }
            );
            _att.listValues = values.data || [];
          }
          result["attributes"][category].fields.push(_att);      
        }
      }
      return JSON.stringify(result);
    } catch (error) {
      throw error;
    }
  },
  generateUsernames: async (parent: any, args: any, context: any) => {
    try {
      const usernames = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/forms/${args?.formId}/generateUsernames?amountSuggestions=${args?.amountSuggestions}&usernamePolicyId=${args?.usernamePolicyId}`,
        {values: JSON.parse(args?.payload || "{}")},
        { ...config(context) }
      );

      return usernames?.data?.usernames || [];
    } catch (error) {
      return [];
    }
  },  
};