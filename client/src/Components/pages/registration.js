import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, Link  } from 'react-router-dom';
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
    const [result, setResult] = useState([])


    let navigate = useNavigate();
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const fetchdata = ()=>{
        getrunningcourses().then(res => {
            
            setItems(res.data);
            console.log(res.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchdata()
    }, [])

    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
        setResult(results)
      }
    
    
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
            items={items}
            fuseOptions={{ keys: ["course_id"] }}
            resultStringKeyName={"course_id"}

            onSearch={handleOnSearch}
            // onHover={handleOnHover}
            // onSelect={handleOnSelect}
            // onFocus={handleOnFocus}
            // autoFocus
            // formatResult={formatResult}
          />
        </div>
        <table className="cursemtable">
        <thead>
          <tr>
            <th>Course</th>
            <th>Title</th>
            <th>Section</th>
          </tr>
        </thead>
        <tbody>
          {result.map(item => {
            return (
              <tr key={item.course_id}>
                <td><Link to={"/course/"+item.course_id}>{item.course_id}</Link></td>
                <td><Link to={"/course/"+item.course_id}>{item.title}</Link></td>
                <td>{ item.sec_id }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    );
  }
  
  export default Registration;