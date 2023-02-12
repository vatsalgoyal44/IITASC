
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate,useParams,Link  } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getcourseinfo} from "../data/services/user.service";
import { logout } from "../statemanagement/actions/actionCreators";
import './coursepage.css';
import ReactLoading from "react-loading";


const CoursePage = (props) => {

  const [res, setRes] = useState('')
  const [loading, setLoading] = useState(true)
//   const [courseid, setCourseid] = useState('')

//   to={{ pathname: '/same-component', state: { data: 'Updated Data' } }}
  let navigate = useNavigate();
  const { course_id } = useParams();
//   setCourseid(course_id);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();
  const [running, setRunning] = useState(false);


  const fetchdata = ()=>{
    getcourseinfo(course_id).then((res)=>{
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
      if(res.data.coursedetails[0]!=null){
        setRunning(true);
      }
      else{
        setRunning(false);
      }
    })
  }

  useEffect(() => {
    fetchdata()
  }, [course_id])

  if (loading){
    return(
    <div>
      <ReactLoading type="bubbles" color="#263238" className="loading"
        height={500} width={250} />
    </div>)
  }
  else if(running!=true){
    return(
      <div>
        <ReactLoading type="bubbles" color="#263238" className="loading"
          height={500} width={250} />
      </div>)
  }
  else return (
    <div className="coursepage">
      <h1 className="name">
            {res.data.coursedetails[0].title}
      </h1>
      <div className="about">
        <h3>About</h3>
        <ul>
          <li>Course ID: {res.data.coursedetails[0].course_id}</li>
          <li>Department: {res.data.coursedetails[0].dept_name}</li>
          <li>Credits: {res.data.coursedetails[0].credits} </li>
        </ul>
      </div>

      <div className="cursem">
      <h3>Prerequisites:</h3>
      <table className="cursemtable">
        <thead>
          <tr>
            <th>Prerequisite ID</th>
            <th>Prerequisite Title</th>
          </tr>
        </thead>
        <tbody>
          {res.data.prereqdetails.map(item => {
            return (
              <tr key={item.prereq_id}>
                <td>
                {/* to={{ pathname: '/same-component', state: { data: 'Updated Data' } }} */}
                {/* <Link to={{ pathname: "/course/"+item.prereq_id, state: { courseid: item.prereq_id }}}> */}
                <Link to={"/course/"+item.prereq_id}>
                { item.prereq_id }
                </Link>
                </td>
                <td>
                <Link to={"/course/"+item.prereq_id}>
                { item.title }
                </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>

      <div className="cursem">
      <h3>Instructors:</h3>
      <table className="cursemtable">
        <thead>
          <tr>
            <th>Instructor</th>
            <th>Section</th>
            <th>Semester</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {res.data.instructordetails.map(item => {
            return (
              <tr key={item.sec_id}>
                <td>
                <Link to={"/instructor/"+item.id}>
                { item.name }
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

export default CoursePage;