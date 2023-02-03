import React, { useState } from "react";
import "./login.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div class="LoginForm">
      <div class="center">
      <h1 class>Login</h1>
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

        <button type = "submit">Login</button>
        <button type = "button">Sign Up</button>
      </form>
      </div>
    </div>
  );
}

export default LoginForm;