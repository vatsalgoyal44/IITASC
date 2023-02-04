import axios from "axios";
import authHeader from "../../authorization/services/auth-header";

const API_URL = "http://localhost:4000/";

export const getstudentinfo = () => {
    const header=authHeader();
    const res = axios.get(API_URL + "studentinfo", {
        headers: header //the token is a variable which holds the token
       });
    return res
};

