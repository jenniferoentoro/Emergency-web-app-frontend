import axios from "axios";
import TokenManager from "./TokenManager";

const UserAPI = {
  getMySelf: () =>
    axios
      .get(`http://localhost:8080/api/user/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data),

  getUserChatAdmin: () =>
    axios
      .get(`http://localhost:8080/api/user/chatAdmins`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data),

  getRoleUser: () =>
    axios
      .get(`http://localhost:8080/api/user/role/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data),

  getAdmins: () =>
    axios
      .get(`http://localhost:8080/api/user/admins`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => response.data),
};

export default UserAPI;
