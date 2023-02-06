import React, { useState, useEffect } from "react";
import { Navigate, useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getrunningcourses} from "../data/services/user.service";
import { logout } from "../statemanagement/actions/actionCreators";
import './profile.css';
import ReactLoading from "react-loading";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'


const Registration = (props) => {

    const [res, setRes] = useState('')
    const [loading, setLoading] = useState(true)
    const [cursem, setCursem] = useState([])
    const [pastsem, setPastsem] = useState([])
    const [items, setItems] = useState([])

    let navigate = useNavigate();
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const fetchdata = ()=>{
        getrunningcourses().then(res => {
            
            setItems(res.data);
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchdata()
    }, [])

    
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }
    // console.log(data)
  
    if (false){
      return(
      <div>
        <ReactLoading type="bubbles" color="#263238" className="loading"
          height={500} width={250} />
      </div>)
    }
    else return (
      <div className="homepage">
        <p className="welcome">Welcome to</p>
        <h1 className="name">
          Registration
        </h1>
        <div className="search">
          <ReactSearchAutocomplete
            // items={items}
            // onSearch={handleOnSearch}
            // onHover={handleOnHover}
            // onSelect={handleOnSelect}
            // onFocus={handleOnFocus}
            // autoFocus
            // formatResult={formatResult}
          />
        </div>
      </div>
    );
  }
  
  export default Registration;