import axios from "axios";

const MessageAPI = {
  sendChat: (message: any) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axios
      .post("http://localhost:8080/api/message", { message }, { headers })
      .then((response) => response.data);
  },
  getChat: (username: any) =>
    axios
      .get(`http://localhost:8080/api/message/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data),

  sendMessageAdmin(usernameUser: any, message: any) {
    return axios
      .post(
        `http://localhost:8080/api/message/admin`,
        { message, usernameUser },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => response.data);
  },
};

export default MessageAPI;
