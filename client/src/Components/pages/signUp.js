import React, { useState } from "react";
import "./login.css";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    if(validateForm()){
        
    }
  }

  return (
    <div class="LoginForm">
      <div class="center">
      <h1 class>Sign Up</h1>
      <form method="post">
        <div class="textfield">
          <input type="text" name="username" id="username" autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)}/>
          
          <label htmlFor="username">
            <span class="content-name">
              Username
            </span>
          </label>
          
        </div>
        <div class="textfield">
          <input type="password" name="password" id="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)}/>
          
          <label htmlFor="password">
            <span class="content-name">
              Password
            </span>
          </label>
          
        </div>

        <button type = "submit" onClick={handleSubmit}>Register</button>
      </form>
      </div>
    </div>
  );
}

export default SignUpForm;