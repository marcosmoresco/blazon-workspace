import axios from "axios";

const RequestQueries = {
  getRequests: async (page: number, size: number) => {
    try {
      const requests = await axios.post(
        "http://demo2183093.mockable.io/blazon-workspace-backend/workspace/requests/filter",
        {}
      );
      return requests.data;
    } catch (error) {
      throw error;
    }
  },
};

export default RequestQueries;
