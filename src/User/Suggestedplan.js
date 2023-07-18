import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { color } from "framer-motion";
import ResponsiveNavUser from '../ResponsiveNavUser'

export const Suggestedplan = (props) => {
  const loginId = localStorage.getItem("loginId");
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `${global.Apipath}/D_B_D_P/api/User/viewsuggestedplan1`
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  const handleClick = (name) => {
    console.log({name})
    const name1={name}
     navigate(`/SuggestedPlanDetails?name1=${name}`);
  };

  return (
    <>
      <ResponsiveNavUser />
     
      <div className="form-container" style={{ height: "700px", overflowY: "scroll" }}>
        {data.map((item) => (
          <button style={{ color:"white",textAlign: "center" , background:"black"}} key={item.id} onClick={() => handleClick(item.name)}>
            {item.name}
          </button>
        ))}
        </div>
      {/* </div> */}
      
      
    </>
  );
};







// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import NavbarUser from "../Navbar/NavbarUser";

// export const ViewPlan = (props) => {
//     const loginId = localStorage.getItem("loginId");
//     const navigate = useNavigate()
//     const [data, setData] = useState([]);
//     useEffect(() => {
//         const fetchData = async () => {
//           const result = await axios.get('${global.Apipath}/D_B_D_P/api/User/viewplan?id='+loginId);
//           setData(result.data);
//         };
//         fetchData();
//       }, []);

//     return (
//         <>
//          <NavbarUser />
//          <h1 style={{textAlign:"center"}}>Ingredients of  {loginId}</h1>
//         <div className="form-container">
//         {data.map(item => (
//         <button key={item.id}>{item.name}</button>
//       ))}
//       </div>
//         </>
//     );
// };
