import axios from 'axios'

const PasswordVaultQueries = {        
  getPasswordVaultEntries: async () => {
    try {
      const entries = await axios.get('http://demo2183093.mockable.io/blazon-workspace-backend/workspace/passwordvault/entries');        
      return entries.data
    } catch (error) {
      throw error
    }
  }
}

export default PasswordVaultQueries

