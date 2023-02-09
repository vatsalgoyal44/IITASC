import './App.css';
import LoginForm from './Components/authentication/pages/loginForm';
import Profile from './Components/pages/profile';
import Registration from './Components/pages/registration';
import InstructorProfile from './Components/pages/instprofile';
import CoursePage from './Components/pages/coursepage';
import DeptPage from './Components/pages/deptpage';
import DeptCoursePage from './Components/pages/deptcoursepage';
import Navbar from './Components/NavigationBar/navbar'
import { keepTheme } from './Components/pages/themes';
import React, { useEffect } from "react";



// import SignUpForm from './Components/authentication/pages/signUp';
import { BrowserRouter, Routes, Switch, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    keepTheme();
})

  return (
    <>
      <BrowserRouter>
      <Navbar />

        <Routes>
          <Route path="/login" element={<LoginForm />}/>
          <Route exact path="/home" element={<Profile />}/>
          <Route exact path="/home/registration" element={<Registration />}/>
          <Route path="/instructor/:id" element={<InstructorProfile />} />
          <Route exact path="/course/:course_id" element={<CoursePage />} />
          <Route exact path="/course/running" element={<DeptPage />} />
          <Route exact path="/course/running/:dept_name" element={<DeptCoursePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
