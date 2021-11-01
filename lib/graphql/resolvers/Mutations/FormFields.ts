import axios from "axios";
import { config } from "../utils";

export const FormFieldsMutations = {
  validateFormField: async (parent: any, args: any, context: any) => {
    try {
      const result = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/forms/fields/${args?.fieldId}/validate`,
        JSON.parse(args?.payload),
        { ...config(context) }
      );      
      return JSON.stringify(result.data);
    } catch (error) {
      throw error;
    }
  },
  validateForm: async (parent: any, args: any, context: any) => {
    try {
      const result = await axios.post(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/forms/${args?.formId}/validate`,
        {values: JSON.parse(args?.payload)},
        { ...config(context) }
      );      
      return JSON.stringify(result.data);
    } catch (error) {
      throw error;
    }
  }  
};