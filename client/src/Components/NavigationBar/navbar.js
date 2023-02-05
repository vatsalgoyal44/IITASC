import React from 'react';
import {
    Link
} from "react-router-dom";
import './navbar.css';

const Navbar = () => {
    return(
        <section className="navbar">
            <div className='cont'>
            <h1 className="ASC">ASC</h1>
            <ul className='nav-links'>
                <Link to='/home'>
                    <li>
                        <a>
                            My Profile
                        </a>
                    </li>
                </Link>
            </ul>
            </div>
        </section>
    )
}

export default Navbar;