import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, Link  } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getrunningcourses} from "../data/services/user.service";
import { logout } from "../statemanagement/actions/actionCreators";
import './profile.css';
import ReactLoading from "react-loading";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
// import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-dropdown';
import Select from 'react-select'





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
            res = res.data.reduce(function (r, a) {
                r[a.course_id] = r[a.course_id] || [];
                r[a.course_id].push(a);
                return r;
            }, Object.create(null));
            console.log(res)
            setRes(res)
            setItems((Object.keys(res)).map(course_id=>{return {course_id:course_id}}));
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchdata()
    }, [])

    const handleSectionChange = () => {

    }

    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
        console.log(results.map(result=>{return res[result.course_id]}))
        setResult(results.map(result=>{return res[result.course_id]}))
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
            <th>Register</th>

          </tr>
        </thead>
        <tbody>
          {result.map(item => {
            return (
              <tr key={item[0].course_id}>
                <td><Link to={"/course/"+item[0].course_id}>{item[0].course_id}</Link></td>
                <td><Link to={"/course/"+item[0].course_id}>{item[0].title}</Link></td>
                <Select options={item.map((it)=>{
                    return {value: it.sec_id, label: it.sec_id}
                    })} className="dropdown" onChange={handleSectionChange} defaultInputValue='1'/>
                <td>Register</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    );
  }
  
  export default Registration;