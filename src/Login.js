import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// "C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir=~/chromeTemp


export const Login = (props) => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    setData({ ...data, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  try {
    const response = await fetch(`${global.Apipath}D_B_D_P/api/User/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log(responseData);
    if (responseData === "admin") {
      alert("Admin Login Succesfully")
      navigate("/Adddoctor");
    } else if(responseData === "doctor")
    {
      alert("Doctor Login Succesfully")
      navigate("/AddDisease");
    }
    else if(responseData === "")
    {
      alert("Invalid Username and Password")
      navigate("/Login");
    }
    else if(responseData === "not")
    {
      alert("Invalid Username and Password")
      navigate("/Login");
    }
    else{
      localStorage.setItem("loginId", responseData);
      navigate("/ViewPlan");
    }
  } catch (error) {
    console.error(error);
    // handle error
  }
  };
  return (
    <>
      <div className="App">
        <div className="auth-form-container">
           <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="Login-name">Login</h2>
      <input
        onChange={handleInputChange}
        id="username"
        value={data.username}
        placeholder="username"
        type="text"
      ></input>
      <input
        onChange={handleInputChange}
        id="password"
        value={data.password}
        placeholder="*******"
        type="password"
      ></input>
      <button type="submit">Login</button>
           </form>







           <div>
        <h4> Don't have an account? <a style={{color:"blue",marginTop:"2px"}} href="Register">Register</a></h4>
        
      </div>


        </div>
        
      </div>
      

      
    </>
  );
};
