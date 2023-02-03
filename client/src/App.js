import logo from './logo.svg';
import './App.css';
import LoginForm from './Components/pages/loginForm';
import SignUpForm from './Components/pages/signUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/signup" element={<SignUpForm />}/>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
