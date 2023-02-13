import React, { useState, useEffect } from "react";
import { Navigate, useNavigate,useParams,Link  } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getdeptinfo} from "../data/services/user.service";
import { logout } from "../statemanagement/actions/actionCreators";
import './deptpage.css';
import ReactLoading from "react-loading";


const DeptPage = (props) => {

  const [res, setRes] = useState('')
  const [loading, setLoading] = useState(true)


  let navigate = useNavigate();
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();


  const fetchdata = ()=>{
    getdeptinfo().then((res)=>{
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
    }).catch(()=>{
      console.log(res.status)
      setLoading(true)
        dispatch(logout())
            .then(() => {
              navigate("/login");
              window.location.reload();
            })
    })
  }

  useEffect(() => {
    fetchdata()
  }, [])


  if (loading){
    return(
    <div>
      <ReactLoading type="bubbles" color="#263238" className="loading"
        height={500} width={250} />
    </div>)
  }
  else return (
    <div className="deptpage">
      <h1 className="name">
            Department Offering Courses
      </h1>
      {/* <div className="about">
        <h3>Departments</h3>
        <ul>
            {res.data.deptdetails.map(item => {
                return <li key={item.dept_name}>{item.dept_name}</li>
              })}
        </ul>
      </div> */}
      <div className="cursem">
      <table className="cursemtable">
        <thead>
          <tr>
            <th>Department Name</th>
          </tr>
        </thead>
        <tbody>
          {res.data.deptdetails.map(item => {
            return (
              <tr key={item.dept_name}>
                <td>
                <Link to={"/course/running/"+ item.dept_name }>
                { item.dept_name }
                </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default DeptPage;