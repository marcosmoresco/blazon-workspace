import axios from 'axios'

import PasswordVaultQueries from './PasswordVault'
import RequestQueries from './Request'

const Queries = {      
  getResume: async () => {
    try {
      const resume = await axios.get('http://demo2183093.mockable.io/blazon-workspace-backend/workspace/tasks/executorresume');        
      return resume.data
    } catch (error) {
      throw error
    }
  },
  ...PasswordVaultQueries,
  ...Request
}

export default Queries

