import axios from "axios";

import PasswordVaultQueries from "./PasswordVault";
import RequestQueries from "./Request";

const Queries = {
  getResume: async () => {
    try {
      const resume = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/tasks/executorresume`
      );
      return resume.data;
    } catch (error) {
      throw error;
    }
  },
  ...PasswordVaultQueries,
  ...RequestQueries,
};

export default Queries;
