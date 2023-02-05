import React, { useState, useEffect } from "react";
import { Navigate, useNavigate,useParams  } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getstudentinfo} from "../data/services/user.service";
import {getinstinfo} from "../data/services/user.service";
import { logout } from "../statemanagement/actions/actionCreators";
import './profile.css';
import ReactLoading from "react-loading";


const InstructorProfile = (props) => {

  const [res, setRes] = useState('')
  const [loading, setLoading] = useState(true)

  let navigate = useNavigate();
  const { id } = useParams();
  const { isLoggedIn } = useSelector(state => state.auth);
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
    <div className="insthomepage">
      <p className="welcome">Hi I am,</p>
      <h1 className="name">
        {res.data.instructordetails.name}
      </h1>
      <div className="about">
        <h3>About</h3>
        <ul>
          <li>Instructor ID: {res.data.instructordetails.id}</li>
          <li>Name: {res.data.instructordetails.dept_name}</li>
        </ul>
      </div>

      <div className="cursem">
        
      </div>
    </div>
  );
}

export default InstructorProfile;