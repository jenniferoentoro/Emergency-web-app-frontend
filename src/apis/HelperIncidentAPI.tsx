import axios from "axios";

const HelperIncidentAPI = {
  assignHelp: (username: any, incidentCategoryId: any) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return axios
      .post(
        `http://localhost:8080/api/helper-incident/create/${username}`,
        {
          incidentCategoryId,
        },
        { headers }
      )
      .then((response) => response.data);
  },

  getIncidentAssigned: (username: any) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .get(
        `http://localhost:8080/api/helper-incident/get-by-username/${username}`,
        { headers }
      )
      .then((response) => response.data);
  },

  getByHelp: () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .get(`http://localhost:8080/api/helper-incident/get-by-helper`, {
        headers,
      })
      .then((response) => response.data);
  },
  getByUser: () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .get(`http://localhost:8080/api/helper-incident/get-by-user`, {
        headers,
      })
      .then((response) => response.data);
  },

  assignHelpChoose: (chatId: any, longitude: any, latitude: any) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return axios
      .put(
        `http://localhost:8080/api/helper-incident/assign/${chatId}`,
        {
          longitude,
          latitude,
        },
        { headers }
      )
      .then((response) => response.data);
  },

  updateStatusDone: (incidentId: any) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return axios
      .post(
        `http://localhost:8080/api/helper-incident/update-status/${incidentId}`,
        {},
        { headers }
      )
      .then((response) => response.data);
  },
};

export default HelperIncidentAPI;
