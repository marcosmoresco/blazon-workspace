import axios from 'axios'

export const resolvers = {
  Query: {    
    getResume: async () => {
      try {
        const resume = await axios.get('http://demo2183093.mockable.io/blazon-workspace-backend/workspace/tasks/executorresume');        
        return resume.data
      } catch (error) {
        throw error
      }
    },
    getPasswordVaultEntries: async () => {
      try {
        const entries = await axios.get('http://demo2183093.mockable.io/blazon-workspace-backend/workspace/passwordvault/entries');        
        return entries.data
      } catch (error) {
        throw error
      }
    }
  }
};