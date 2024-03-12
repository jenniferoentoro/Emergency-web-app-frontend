import axios from "axios";

const IncidentReportStatusAPI = {
  createNews: (
    title: any,
    description: any,
    date: any,
    image: any,
    incidentCategoryId: any
  ) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("image", image);
    formData.append("incidentCategoryId", incidentCategoryId);

    return axios
      .post("http://localhost:8080/api/news", formData, { headers })
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

  getIncidentReportStatusById: (id: any) => {
    return axios
      .get(
        `http://localhost:8080/api/incident-report-statuses/incident-report/${id}`,
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

export default IncidentReportStatusAPI;
