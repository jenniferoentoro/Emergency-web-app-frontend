import axios from "axios";

const ConnectChatAPI = {
  endChat: () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .put(
        "http://localhost:8080/api/connect-chat/end-chat-connection",
        {},
        { headers }
      )
      .then((response) => response.data);
  },

  endChatByUser: (username: any) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .put(
        `http://localhost:8080/api/connect-chat/end-chat-connection-by-username/${username}`,
        {},
        { headers }
      )
      .then((response) => response.data);
  },

  connectChat: (longitude: any, latitude: any) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .post(
        "http://localhost:8080/api/connect-chat",
        { longitude, latitude },
        { headers }
      )
      .then((response) => response.data);
  },

  reconnectChat: (longitude: any, latitude: any) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .post(
        "http://localhost:8080/api/connect-chat/reconnect",
        { longitude, latitude },
        { headers }
      )
      .then((response) => response.data);
  },
  updateTypeConnectionOpenAI: (username: any) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .put(
        "http://localhost:8080/api/connect-chat/update-type-connection-openai",
        { username },
        { headers }
      )
      .then((response) => response.data);
  },

  updateTypeConnectionAdmin: (username: any) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .put(
        "http://localhost:8080/api/connect-chat/update-type-connection-admin",
        { username },
        { headers }
      )
      .then((response) => response.data);
  },

  getOngoing: () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .get("http://localhost:8080/api/connect-chat/get-ongoing", { headers })
      .then((response) => response.data.typeConnection);
  },

  getAllHelperOngoing: () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .get("http://localhost:8080/api/connect-chat/get-all-ongoing", {
        headers,
      })
      .then((response) => response.data);
  },
};

export default ConnectChatAPI;
