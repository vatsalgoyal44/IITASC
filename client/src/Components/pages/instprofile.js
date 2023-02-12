import React, { useState, useEffect } from "react";
import { Navigate, useNavigate,useParams,Link  } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getinstinfo} from "../data/services/user.service";
import { logout } from "../statemanagement/actions/actionCreators";
// import './profile.css';
import ReactLoading from "react-loading";


const InstructorProfile = (props) => {

    const [res, setRes] = useState('')
    // const [cursemcourse, setcursemcourse] = useState('')
    // const [prevsemcourse, setprevsemcourse] = useState('')
    const [loading, setLoading] = useState(true)

  let navigate = useNavigate();
  const { id } = useParams();
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();


  const fetchdata = ()=>{
    getinstinfo(id).then((res)=>{
      setRes(res);
      console.log(res)
      setLoading(false)
      if(res.status != 200){
        setLoading(true)
        dispatch(logout())
            .then(() => {
              navigate("/login");
              window.location.reload();
            })
      }
    }).catch(()=>{
      console.log(res.status)
      setLoading(true)
        dispatch(logout())
            .then(() => {
              navigate("/login");
              window.location.reload();
            })
    })
  }

  useEffect(() => {
    fetchdata()
  }, [id])

  if (loading){
    return(
    <div>
      <ReactLoading type="bubbles" color="#263238" className="loading"
        height={500} width={250} />
    </div>)
  }
  else return (
    <div className="insthomepage">
      <p className="welcome">Hi I am,</p>
      <h1 className="name">
        {res.data.instructordetails[0].name}
      </h1>
      <div className="about">
        <h3>About</h3>
        <ul>
            <li>ID: {res.data.instructordetails[0].id}</li>
            <li>Department Name: {res.data.instructordetails[0].dept_name}</li>
        </ul>
      </div>

      <div className="cursem">
      <h3>Current Semester Courses</h3>
      <table className="cursemtable">
        <thead>
          <tr>
            <th>Course</th>
            <th>Course Title</th>
            <th>Section</th>
            <th>Semester</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {res.data.thissemcourses.map(item => {
            return (
              <tr key={item.course_id}>
                <td>
                <Link to={"/course/"+item.course_id}>
                { item.course_id }
                </Link>
                </td>
                <td>
                <Link to={"/course/"+item.course_id}>
                { item.title }
                </Link>
                </td>
                <td>{ item.sec_id }</td>
                <td>{ item.semester }</td>
                <td>{ item.year }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>

      <div className="cursem">
      <h3>Previous Semester Courses</h3>
      <table className="cursemtable">
        <thead>
          <tr>
            <th>Course</th>
            <th>Course Title</th>
            <th>Section</th>
            <th>Semester</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {res.data.prevsemcourses.map(item => {
            return (
              <tr key={item.course_id}>
                <td>
                <Link to={"/course/"+item.course_id}>
                { item.course_id }
                </Link>
                </td>
                <td>
                <Link to={"/course/"+item.course_id}>
                { item.title }
                </Link>
                </td>
                <td>{ item.sec_id }</td>
                <td>{ item.semester }</td>
                <td>{ item.year }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>

    </div>
  );
}

export default InstructorProfile;