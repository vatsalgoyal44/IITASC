import axios from "axios";
import authHeader from "../../authorization/services/auth-header";
import auth from "../../statemanagement/reducers/auth";

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
    const res = axios.get(API_URL + "courseinfo/" + course_id, {
        headers: header //the token is a variable which holds the token
       });
    return res
};

export const dropCourse = (course_id, year, sem) => {
    const header = authHeader();
    const body = {
        course_id: course_id,
        year: year,
        sem: sem
    }
    const res = axios.post(API_URL + "studinfo/dropcourse", {
        headers: header,
        data: body
    });
    return res;
}