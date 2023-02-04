import logo from './logo.svg';
import './App.css';
import LoginForm from './Components/authentication/pages/loginForm';
import Profile from './Components/pages/profile';
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
          <Route path="/home" element={<Profile />}/>
          {/* <Route path="/signup" element={<SignUpForm />}/> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
