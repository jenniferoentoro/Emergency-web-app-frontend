import axios from "axios";

const StatisticAPI = {
  countChatGoingAdmin: () => {
    return axios
      .get(`http://localhost:8080/api/connect-chat/count-ongoing-admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data);
  },
  countChatGoingOpenAi: () => {
    return axios
      .get(`http://localhost:8080/api/connect-chat/count-ongoing-openai`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data);
  },

  countGetGoingChat: () => {
    return axios
      .get(`http://localhost:8080/api/connect-chat/count-ongoing`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data);
  },

  countChatEnded: () => {
    return axios
      .get(`http://localhost:8080/api/connect-chat/count-ended`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data);
  },

  //   incident report statistic

  getIncidentReportWaiting: () => {
    return axios
      .get(`http://localhost:8080/api/incident-reports/waiting/count`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data);
  },

  getIncidentReportInProgress: () => {
    return axios
      .get(`http://localhost:8080/api/incident-reports/in-progress/count`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data);
  },
  getIncidentReportFixed: () => {
    return axios
      .get(`http://localhost:8080/api/incident-reports/fixed/count`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data);
  },

  getIncidentReportStatusInProgress: () => {
    return axios
      .get(
        `http://localhost:8080/api/incident-reports/status-in-progress/count`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => response.data);
  },

  getIncidentReportStatusFixed: () => {
    return axios
      .get(`http://localhost:8080/api/incident-reports/status-fixed/count`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data);
  },

  getIncidentReportByCategory: () => {
    return axios
      .get(`http://localhost:8080/api/incident-reports/category/count`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data);
  },

  get5daysIncidentReport: () => {
    return axios
      .get(`http://localhost:8080/api/incident-reports/last-5-days/count`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data);
  },
};

export default StatisticAPI;
