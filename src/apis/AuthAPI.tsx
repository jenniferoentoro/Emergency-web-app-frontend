import axios from "axios";
import TokenManager from "./TokenManager";

// const AuthAPI = {
//     login: (username: any, password: any) => axios.post('http://localhost:8080/api/auth/authenticate', { username, password })
//         .then(response => response.data.token)
//         .then(accessToken => TokenManager.setAccessToken(accessToken))
// }

const AuthAPI = {
  login: (username: any, password: any) => {
    return axios
      .post("http://localhost:8080/api/auth/authenticate", {
        username,
        password,
      })
      .then((response) => {
        const accessToken = response.data.token;
        TokenManager.setAccessToken(accessToken);
        return response.data;
      });
  },

  register: (
    username: any,
    confirmPassword: any,
    password: any,
    email: any,
    firstName: any,
    lastName: any,
    birthDate: any,
    phoneNumber: any,
    identityCardNumber: any,
    address: any
  ) => {
    return axios
      .post("http://localhost:8080/api/auth/register-user", {
        username,
        confirmPassword,
        password,
        email,
        firstName,
        lastName,
        birthDate,
        phoneNumber,
        identityCardNumber,
        address,
      })
      .then((response) => response.data);
  },

  registerAny: (
    username: any,
    confirmPassword: any,
    password: any,
    email: any,
    firstName: any,
    lastName: any,
    birthDate: any,
    phoneNumber: any,
    identityCardNumber: any,
    address: any,
    roles: any
  ) => {
    return axios
      .post("http://localhost:8080/api/auth/register", {
        username,
        confirmPassword,
        password,
        email,
        firstName,
        lastName,
        birthDate,
        phoneNumber,
        identityCardNumber,
        address,
        roles,
      })
      .then((response) => response.data);
  },
};

export default AuthAPI;
