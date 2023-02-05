
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getstudentinfo} from "../data/services/user.service";
import { logout } from "../statemanagement/actions/actionCreators";
import './profile.css';
import ReactLoading from "react-loading";


const Profile = (props) => {

  const [res, setRes] = useState('')
  const [loading, setLoading] = useState(true)


  let navigate = useNavigate();
  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();


  const fetchdata = ()=>{
    getstudentinfo().then((res)=>{
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
    <div className="homepage">
      <p className="welcome">Welcome,</p>
      <h1 className="name">
        {res.data.studentdetails.name}
      </h1>
      <div className="about">
        <h3>About</h3>
        <ul>
          <li>Student ID: {res.data.studentdetails.id}</li>
          <li>Department: {res.data.studentdetails.dept_name}</li>
          <li>Total Credits: {res.data.studentdetails.tot_cred} </li>
        </ul>
      </div>

      <div className="cursem">
        
      </div>
    </div>
  );
}

export default Profile;