import axios from "axios";

const IncidentReportDiscussionAPI = {
  createIncidentReportDiscussion: (description: any, incidentReportId: any) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .post(
        "http://localhost:8080/api/incident-report-discussions",
        { description, incidentReportId },
        { headers }
      )
      .then((response) => response.data);
  },

  // getIncidentReportStatusById: () =>
  //   axios
  //     .get("http://localhost:8080/api/incident-report-statuses/incident-report/", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //     })
  //     .then((response) => response.data),

  uploadImagesNews: (image: any) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const formData = new FormData();
    formData.append("image", image);

    return axios
      .post("http://localhost:8080/api/news/images", formData, { headers })
      .then((response) => response.data);
  },

  getNewsByTitle: (title: any) => {
    return axios
      .get(`http://localhost:8080/api/news/title/${title}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data);
  },

  getIncidentReportDiscussionById: (id: any) => {
    return axios
      .get(
        `http://localhost:8080/api/incident-report-discussions/incident-report/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => response.data);
  },

  getNewsByCategories: (categories: any) => {
    return axios
      .post(
        "http://localhost:8080/api/news/news-by-categories",
        {
          categories: categories,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => response.data);
  },
};

export default IncidentReportDiscussionAPI;
