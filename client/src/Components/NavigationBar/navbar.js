import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import {
    Link
} from "react-router-dom";
import './navbar.css';

import { logout } from "../statemanagement/actions/actionCreators";
import authService from "../authentication/services/auth.service";

const Navbar = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const pathname = window.location.pathname

  const [isLoggedIn, setAuth] = useState(false)
  const [currentUrl, setCurrentUrl] = React.useState(pathname)
    React.useEffect(() => {
    setCurrentUrl(pathname)
    }, [pathname])


  useEffect(() => {
    authService.check().then((res)=>{
        console.log(res.status)
        if(res.status===200){
            
            setAuth(true)
        }
        else{
            setAuth(false)
        }
    })
  }, [currentUrl])

  if (!isLoggedIn) {
    return <></>;
  }

    const handlelogout = (e) => {
        dispatch(logout())
            .then(() => {
              navigate("/login");
              window.location.reload();
            })
    }

    return(
        <section className="navbar">
            <div className='cont'>
            <h1 className="ASC">ASC</h1>
            <ul className='nav-links'>
                <Link to='/home'>
                    <li>
                            My Profile
                    </li>
                </Link>
                <Link to='/home/registration'>
                    <li>
                            Registration
                    </li>
                </Link>
                <Link to='/course/running'>
                    <li>
                            Running Courses
                    </li>
                </Link>
            </ul>
            <button onClick={handlelogout}><a>Logout</a></button>
            </div>
        </section>
    )
}

export default Navbar;