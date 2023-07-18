import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarUser from "../Navbar/NavbarUser";
import { color } from "framer-motion";
import ResponsiveNavUser from '../ResponsiveNavUser'

export const Wellcome = (props) => {
    const loginId = localStorage.getItem("loginId");
    const[activeplanday,setActiveplanDay]=useState(0);
    useEffect(() => {
        
     
          fetch(`http://localhost/D_B_D_P/api/User/Getactivedayplan?User_id=${loginId}`)
            .then(response => response.json())
            .then(data => setActiveplanDay(data))
            .catch(error => console.error(error));
            
      })
    


    return(
        
          <>
          <ResponsiveNavUser/>
          <h2>

            Your active plan day is {activeplanday}
          </h2>
          </>
      
    )
}