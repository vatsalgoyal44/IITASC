import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';
import React, { useState, useRef } from "react";
import "./login.css";

import { login } from "../../statemanagement/actions/actionCreators";


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


const LoginForm = (props) => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // form.current.validateAll();
      dispatch(login(username, password))
        .then(() => {
          navigate("/home");
          window.location.reload();
        })
  
}

  if (isLoggedIn) {
    console.log(localStorage.getItem("user"))
    return <Navigate to="/home" />;
  }


  function validateForm() {
    return username.length > 0 && password.length > 0;
  }


  return (
    <div class="LoginForm">
      <div class="center">
      <h1 class>Login</h1>
      <form method="post" onSubmit={handleLogin} ref={form}>
        <div class="textfield">
          <input type="text" name="username" id="username" autoComplete="off" value={username} onChange={onChangeUsername} validations={[required]}/>
          
          <label htmlFor="username">
            <span class="content-name">
              Username
            </span>
          </label>
          
        </div>
        <div class="textfield">
          <input type="password" name="password" id="password" autoComplete="off" value={password} onChange={onChangePassword} validations={[required]}/>
          
          <label htmlFor="password">
            <span class="content-name">
              Password
            </span>
          </label>
          
        </div>
        {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        <button type = "submit" ref={checkBtn}>Login</button>
      </form>
      </div>
    </div>
  );
};
export default LoginForm;