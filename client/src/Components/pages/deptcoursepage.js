import React, { useState, useEffect } from "react";
import { Navigate, useNavigate,useParams,Link  } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getdeptcourseinfo} from "../data/services/user.service";
import { logout } from "../statemanagement/actions/actionCreators";
import './deptpage.css';
import ReactLoading from "react-loading";


const DeptCoursePage = (props) => {

  const [res, setRes] = useState('')
  const [loading, setLoading] = useState(true)


  let navigate = useNavigate();
  const { dept_name } = useParams();
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();


  const fetchdata = ()=>{
    getdeptcourseinfo(dept_name).then((res)=>{
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
  }, [dept_name])

  if (loading){
    return(
    <div>
      <ReactLoading type="bubbles" color="#263238" className="loading"
        height={500} width={250} />
    </div>)
  }
  else return (
    <div className="deptpage">
      <h1 className="name">
        {dept_name} Courses
      </h1>
      {/* <div className="about">
        <h3>Departments</h3>
        <ul>
            {res.data.deptdetails.map(item => {
                return <li key={item.dept_name}>{item.dept_name}</li>
              })}
        </ul>
      </div> */}
      <div className="cursem">
      <table className="cursemtable">
        <thead>
          <tr>
              <th>Course ID</th>
              <th>Course Title</th>
          </tr>
        </thead>
        <tbody>
          {res.data.courses.map(item => {
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
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default DeptCoursePage;