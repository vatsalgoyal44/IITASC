import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';
import React from 'react';
import {
    Link
} from "react-router-dom";
import './navbar.css';

import { logout } from "../statemanagement/actions/actionCreators";

const Navbar = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(state => state.auth);

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
            </ul>
            <button onClick={handlelogout}><a>Logout</a></button>
            </div>
        </section>
    )
}

export default Navbar;