import logo from './logo.svg';
import './App.css';
import LoginForm from './Components/authentication/pages/loginForm';
import Profile from './Components/pages/profile';

// import SignUpForm from './Components/authentication/pages/signUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/home" element={<Profile />}/>
        {/* <Route path="/signup" element={<SignUpForm />}/> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
