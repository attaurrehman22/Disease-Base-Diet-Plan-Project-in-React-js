import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarUser from "../Navbar/NavbarUser";
import { color } from "framer-motion";
import ResponsiveNavUser from '../ResponsiveNavUser'

export const SharedPlan = (props) => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const loginId = localStorage.getItem("loginId");
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios.get(
            "http://localhost/D_B_D_P/api/User/ViewSharedPlanname?loginId="+loginId
          );
          setData(result.data);
          console.log("data od",data)
        };
        fetchData();
      }, []);
 

      const handleClick = (name,did) => {
        // setActivatedPlan(name);
        // setActiveButton(name);
        console.log("name============"+name)
        console.log("ID============"+did)
        navigate(`/SaredPlanDetails?name1=${name}&did=${did}`);
      };

      return (
        <>
        <ResponsiveNavUser/>
         <div className="form-container" style={{ height: "700px", overflowY: "scroll" }}>
         {data.map((item) => (
          <div key={item.id}>
            <button onClick={() => handleClick(item.name,item.did)} style={{ color:"white",backgroundColor:"grey",width:"100%"}} >
              {item.name}
            </button>
            
          </div>
        ))}
         </div>
        </>
      );
}
