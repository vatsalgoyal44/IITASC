import axios from "axios";

const API_URL = "http://localhost:4000/auth/";

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    }, {withCredentials: true})
    .then((response) => {
      console.log(response)
      return response;
    });
};

const logout = () => {
  return axios.get(API_URL + "/logout");
};

export default {
  login,
  logout,
};
