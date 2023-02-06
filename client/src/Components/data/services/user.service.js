import axios from "axios";
import authHeader from "../../authorization/services/auth-header";

const API_URL = "http://localhost:4000/";

export const getstudentinfo = () => {
    const header=authHeader();
    console.log(header)
    const res = axios.get(API_URL + "studinfo", {
        headers: header //the token is a variable which holds the token
       });
    return res
};

export const getinstinfo = (id) => {
    const header=authHeader();
    console.log(header)
    const res = axios.get(API_URL + "instinfo/" + id, {
        headers: header //the token is a variable which holds the token
       });
    return res
};

export const getcourseinfo = (course_id) => {
    const header=authHeader();
    console.log(header)
    const res = axios.get(API_URL + "course/" + course_id, {
        headers: header //the token is a variable which holds the token
       });
    return res
};

export const getdeptinfo = () => {
    const header=authHeader();
    console.log(header)
    const res = axios.get(API_URL + "dept/running", {
        headers: header //the token is a variable which holds the token
       });
    console.log(res)
    return res
};

export const getdeptcourseinfo = (dept_name) => {
    const header=authHeader();
    console.log(header)
    const res = axios.get(API_URL + "dept/courses/" + dept_name, {
        headers: header //the token is a variable which holds the token
       });
    console.log(res)
    return res
};
