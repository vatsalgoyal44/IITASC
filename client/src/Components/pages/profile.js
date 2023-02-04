
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getstudentinfo} from "../data/services/user.service";
import { logout } from "../statemanagement/actions/actionCreators";



const Profile = (props) => {

  const [res, setRes] = useState([])


  let navigate = useNavigate();
  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();


  const fetchdata = ()=>{
    getstudentinfo().then((res)=>{
      setRes(res);
      console.log(res)

    })
  }

  useEffect(() => {
    fetchdata()
  }, [])

  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // if(res.status != 200){
  //   dispatch(logout())
  //       .then(() => {
  //         navigate("/login");
  //         window.location.reload();
  //       })
  // }
  // console.log(data)

  return (
    <div className="Header">
      Welcome,
      <h1>
        Your Name
      </h1>
    </div>
  );
}

export default Profile;