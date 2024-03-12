import axios from "axios";

const BASE_URL = "http://localhost:8080/api";
const TutorialAPI = {
  createTutorial: (
    title: any,
    description: any,
    linkToVideo: any,
    incidentCategory: any,
    videoFile: any
  ) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("linkToVideo", linkToVideo);
    formData.append("incidentCategory", incidentCategory);
    formData.append("videoFile", videoFile);

    return axios
      .post(`${BASE_URL}/tutorial`, formData, { headers })
      .then((response) => response.data);
  },

  getTutorials: () =>
    axios
      .get(`${BASE_URL}/tutorial`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data),

  getTutorialById: (id: any) => {
    return axios
      .get(`${BASE_URL}/tutorial/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data);
  },

  deleteTutorialById: (id: any) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .delete(`${BASE_URL}/tutorial/${id}`, {
        headers,
      })
      .then((response) => response.data);
  },

  updateTutorial: (
    id: any,
    title: any,
    description: any,
    linkToVideo: any,
    incidentCategory: any,
    videoFile: any
  ) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("linkToVideo", linkToVideo);
    formData.append("incidentCategory", incidentCategory);
    formData.append("videoFile", videoFile);

    return axios
      .put(`${BASE_URL}/tutorial/${id}`, formData, { headers })
      .then((response) => response.data);
  },
};

export default TutorialAPI;
