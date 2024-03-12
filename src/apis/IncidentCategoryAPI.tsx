import axios from "axios";

const IncidentCategoryAPI = {
  createIncidentCategory: (name: any) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .post(
        "http://localhost:8080/api/incident-categories",
        { name },
        { headers }
      )
      .then((response) => response.data);
  },

  getIncidentCategories: () =>
    axios
      .get(`http://localhost:8080/api/incident-categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data),

  updateIncidentCategory: (id: any, name: any) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .put(
        `http://localhost:8080/api/incident-categories/${id}`,
        { name },
        { headers }
      )
      .then((response) => response.data);
  },

  deleteIncidentCategory: (id: any) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .delete(`http://localhost:8080/api/incident-categories/${id}`, {
        headers,
      })
      .then((response) => response.data);
  },

  deleteIncidentCategories: (ids: any) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .delete(`http://localhost:8080/api/incident-categories`, {
        headers,
        data: { ids },
      })
      .then((response) => response.data);
  },
};

export default IncidentCategoryAPI;
