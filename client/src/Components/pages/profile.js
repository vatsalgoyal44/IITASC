
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate , Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getstudentinfo, dropCourse} from "../data/services/user.service";
import { logout } from "../statemanagement/actions/actionCreators";
import './profile.css';
import ReactLoading from "react-loading";


const Profile = (props) => {

  const [res, setRes] = useState('')
  const [loading, setLoading] = useState(true)
  const [cursem, setCursem] = useState([])
  const [pastsem, setPastsem] = useState([])

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handledropCourse = (item) => {
      dropCourse(item.course_id, item.year, item.semester).then(res=>{
        console.log(res)

        if(res.status==200){
          const cursemnew = cursem.filter((item2)=>item2.course_id!=item.course_id)
          setCursem(cursemnew)
        }
      })
  }

  const fetchdata = ()=>{
    getstudentinfo().then((res)=>{
      
      console.log(res)
      if(res.status != 200){
        console.log(res.status)
        setLoading(true)
        dispatch(logout())
            .then(() => {
              navigate("/login");
              window.location.reload();
            })
        }
        setRes(res);
      const courses = res.data.coursedetails
      const cursemnew = []
      const pastsemnew = []
      const sem_dict = {
        'Spring': 0,
        'Summer': 1,
        'Fall': 3,
        'Winter': 4
      }
      for(let i = 0; i < courses.length; i++){
        let course = courses[i]
        if(course.year==course.yr && course.semester==course.sem){
          cursemnew.push(course)
        }
        else{
          if(course.year<course.yr ||(course.year===course.yr && sem_dict[course.semester]<sem_dict[course.sem])){
            pastsemnew.push(course)
          }
        }
      }
      const grouped = Object.values(pastsemnew.reduce((acc, item) => {
        // Append the item to the array for each country
        // acc[item.year + item.semester] = {...(acc[item.year + item.semester] || []), item};
        const key = item.year + item.semester
        console.log(key)
        if(acc[key]){
          acc[key].push(item)
        }
        else{
          console.log(item)
          acc[key] = [item]
        }
        return acc;
    }, {}))
      console.log(grouped)
      setCursem(cursemnew)
      setPastsem(grouped)
      setLoading(false)

    })
    .catch(()=>{
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

  
  // if (!isLoggedIn) {
  //   return <Navigate to="/login" />;
  // }
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
      <h3>Current Semester</h3>
      <table className="cursemtable">
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Title</th>
            <th>Section</th>
            <th>Drop Course</th>
          </tr>
        </thead>
        <tbody>
          {cursem.map(item => {
            return (
              <tr key={item.course_id}>
                <td><Link to={"/course/"+item.course_id}>{item.course_id}</Link></td>
                <td><Link to={"/course/"+item.course_id}>{item.title}</Link></td>
                <td>{ item.sec_id }</td>
                <td><button onClick={() => handledropCourse(item)}><a>Drop</a></button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      <div >
      {pastsem.map(item => {
        return (
          <div className="cursem">
            <h3>{item[0].semester + " "+ item[0].year}</h3>
          <table className="cursemtable">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Title</th>
                <th>Section</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {item.map(item2 => {
                return (
                  <tr key={item2.course_id}>
                    <td><Link to={"/course/"+item2.course_id}>{item2.course_id}</Link></td>
                    <td><Link to={"/course/"+item2.course_id}>{item2.title}</Link></td>
                    <td>{ item2.sec_id }</td>
                    <td>{ item2.grade }</td>

                  </tr>
                );
              })}
            </tbody>
      </table>
       </div> )
      })}      
      </div>
    </div>
  );
}

export default Profile;