import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ResponsiveNavbar from "../ResponsiveNavbar";


function Adddoctor() {
  const navigate = useNavigate()
  const baseUrl = "http://192.168.0.108/D_B_D_P/api/Admin/adddoctor";
  const [data, setData] = useState({
    name: "",
    username: "",
    contact: "",
    password: "",
  });

  async function submit(e) {
    e.preventDefault();

    var dataApi = JSON.stringify({
      name: data.name,
      username: data.username,
      contact: data.contact,
      password: data.password,
    });

    console.log("data of api",dataApi)
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "${global.Apipath}D_B_D_P/api/Admin/adddoctor",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "192.168.0.110",
      },
      data: dataApi,
    };
    console.log("here");
    try {
      const { data } = await axios(config);
      alert("Doctor Add Succesfully")
      console.log("Data: ",{success:true})
      setData({
        name: "",
        username: "",
        contact: "",
        password:""
      });
      if(data.success == true){

      }else{
        // alert("wrong username or password")
      }
      console.log("Pass: ", data);
    } catch (error) {
      alert("Fail")
      console.log("Fail: ", error);
    }

   
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(data);
  }

  return (
    <>
      <ResponsiveNavbar />
<div className="container">
      <div className="row justify-content-center" style={{ width: "100%" }}>
        <div className="col-md-10">
        </div>
       
          <div className="form-box" style={{ width: "100%" }}>
            <form className="form-field" onSubmit={(e) => submit(e)}>
              <div className="form-group">
                <input
                   onChange={(e) => handle(e)}
                  id="name"
                  value={data.name}
                  className="form-control"
                  placeholder="Name"
                  type="text"
                />
              </div>
              <div className="form-group">
                <input
                  onChange={(e) => handle(e)}
                  id="username"
                  value={data.username}
                  className="form-control"
                  placeholder="Username"
                  type="text"
                />
              </div>
              <div className="form-group">
                <input
                 onChange={(e) => handle(e)}
                  id="contact"
                  value={data.contact}
                  className="form-control"
                  placeholder="Contact"
                  type="text"
                />
              </div>
              <div className="form-group">
                <input
               onChange={(e) => handle(e)}
                  id="password"
                  value={data.password}
                  className="form-control"
                  placeholder="***********"
                  type="password"
                />
              </div>
              <button className="btn btn-primary add-but" type="handlesubmit">
                Add Doctor
              </button>
            </form>
          </div>
       
      </div>
    </div>
    </>
  );
}
export default Adddoctor;
