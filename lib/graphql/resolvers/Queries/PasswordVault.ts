import axios from "axios";

export const PasswordVaultQueries = {
  getPasswordVaultEntries: async () => {
    try {
      const entries = await axios.get(
        `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/passwordvault/entries`
      );
      return entries.data;
    } catch (error) {
      throw error;
    }
  },
};
