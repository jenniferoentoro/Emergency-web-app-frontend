import axios from "axios";

const IncidentReportAPI = {
  getIncidentReport: () =>
    axios
      .get("http://localhost:8080/api/incident-reports", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data),

  getMineIncidentReport: () =>
    axios
      .get("http://localhost:8080/api/incident-reports/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data),

  uploadIncidentReport: (data: any) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // const formData = new FormData();
    // formData.append("title", data.title);
    // formData.append("description", data.description);
    // formData.append("longitude", data.longitude);
    // formData.append("latitude", data.latitude);
    // formData.append("incidentCategoryId", data.incidentCategoryId);
    // formData.append("file", data.file);

    return axios
      .post("http://localhost:8080/api/incident-reports", data, { headers })
      .then((response) => response.data);
  },

  getIncidentCategoryById: (id: any) => {
    return axios
      .get(`http://localhost:8080/api/incident-reports/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data);
  },

  getIncidentReportWaiting: () => {
    return axios
      .get(`http://localhost:8080/api/incident-reports/waiting`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data);
  },

  getIncidentReportInProgress: () => {
    return axios
      .get(`http://localhost:8080/api/incident-reports/in-progress`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data);
  },

  getIncidentReportFixed: () => {
    return axios
      .get(`http://localhost:8080/api/incident-reports/fixed`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data);
  },

  updateStatus(status: any, description: any, incidentReportId: any) {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .post(
        `http://localhost:8080/api/incident-report-statuses`,
        { status, description, incidentReportId },
        { headers }
      )
      .then((response) => response.data);
  },
};

export default IncidentReportAPI;
