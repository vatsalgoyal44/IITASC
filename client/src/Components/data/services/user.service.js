import axios from "axios";
import authHeader from "../../authorization/services/auth-header";
import auth from "../../statemanagement/reducers/auth";

const API_URL = "http://localhost:4000/";

export const getstudentinfo = () => {
    const res = axios.get(API_URL + "studinfo", { withCredentials: true });
    return res
};

export const getinstinfo = (id) => {
    const res = axios.get(API_URL + "instinfo/" + id, { withCredentials: true });
    return res
};

export const getcourseinfo = (course_id) => {
    const res = axios.get(API_URL + "course/" + course_id, { withCredentials: true });
    return res
};

export const getdeptinfo = () => {
    const res = axios.get(API_URL + "dept/running", { withCredentials: true });
    console.log(res)
    return res
};

export const getdeptcourseinfo = (dept_name) => {
    const res = axios.get(API_URL + "dept/courses/" + dept_name, { withCredentials: true });
    console.log(res)
    return res
};


export const getrunningcourses = () => {
    const res = axios.get(API_URL + "runningcourses/", { withCredentials: true });
    return res
};

export const dropCourse = (course_id, year, sem) => {
    const body = {
        course_id: course_id,
        year: year,
        sem: sem
    }
    const res = axios.post(API_URL + "studinfo/dropcourse", {
        data: body, 
        withCredentials: true
    });
    return res;
}

export const registerCourse = (course_id, year, sem, sec_id) => {
    const body = {
        course_id: course_id,
        year: year,
        sem: sem,
        sec_id:sec_id
    }
    const res = axios.post(API_URL + "studinfo/regcourse", {
        data: body, 
        withCredentials: true
    });
    return res;
}