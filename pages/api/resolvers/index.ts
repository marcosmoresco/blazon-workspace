import axios from 'axios'

export const resolvers = {
  Query: {    
    getResume: async () => {
      try {
        const resume = await axios.get('http://demo2183093.mockable.io/blazon-workspace-backend/workspace/tasks/executorresume');        
        return resume.data;
      } catch (error) {
        throw error;
      }
    },
    getPasswordVaultEntries: async () => {
      try {
        return await axios.get('http://demo2183093.mockable.io/blazon-workspace-backend/workspace/passwordvault/entries');        
      } catch (error) {
        throw error;
      }
    }
  }
};