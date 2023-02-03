import axios from "axios";
import authHeader from "../../authorization/services/auth-header";

const API_URL = "http://localhost:4000/";

const getstudentinfo = () => {
    return axios.get(API_URL + "studentinfo");
};


export default {
    getstudentinfo
};
