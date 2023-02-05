
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate,useParams  } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getcourseinfo} from "../data/services/user.service";
import { logout } from "../statemanagement/actions/actionCreators";
import './coursepage.css';
import ReactLoading from "react-loading";


const CoursePage = (props) => {

  const [res, setRes] = useState('')
  const [loading, setLoading] = useState(true)


  let navigate = useNavigate();
  const { course_id } = useParams();
  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();


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
    })
  }

  useEffect(() => {
    fetchdata()
  }, [])

  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  // console.log(data)

  if (loading){
    return(
    <div>
      <ReactLoading type="bubbles" color="#263238" className="loading"
        height={500} width={250} />
    </div>)
  }
  else return (
    <div className="coursepage">
      <h1 className="name">
        {res.data.coursedetails.title}
      </h1>
      <div className="about">
        <h3>About</h3>
        <ul>
          <li>course ID: {res.data.coursedetails.course_id}</li>
          <li>Department: {res.data.coursedetails.dept_name}</li>
          <li>Credits: {res.data.coursedetails.credits} </li>
        </ul>
      </div>

      <div className="cursem">
        
      </div>
    </div>
  );
}

export default CoursePage;