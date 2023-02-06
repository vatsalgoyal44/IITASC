import logo from './logo.svg';
import './App.css';
import LoginForm from './Components/authentication/pages/loginForm';
import Profile from './Components/pages/profile';
import Registration from './Components/pages/registration';
import InstructorProfile from './Components/pages/instprofile';
import CoursePage from './Components/pages/coursepage';
import Navbar from './Components/NavigationBar/navbar'

// import SignUpForm from './Components/authentication/pages/signUp';
import { BrowserRouter, Routes, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />

        <Routes>
          <Route path="/login" element={<LoginForm />}/>
          <Route path="/home/registration" element={<Registration />}/>
          <Route path="/home" element={<Profile />}/>
          <Route path="/instructor/:id" element={<InstructorProfile />} />
          <Route path="/course/:course_id" element={<CoursePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
