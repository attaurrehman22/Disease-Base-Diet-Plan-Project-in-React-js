// import React,{useState} from "react";
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.css';
// import NavbarDoctor from "../Navbar/NavbarDoctor";
// import { useLocation, useNavigate } from "react-router-dom";
// import ResponsiveNavDoctor from "../ResponsiveNavDoctor";
// function SuggestPlan() {
//   const navigate = useNavigate()
//   const [planName, setPlanName] = useState("");
//   const [calories, setCalories] = useState("");
//   const [noOfDays, setNoOfDays] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = {
//       name: planName,
//       calories: calories,
//       noofdays: noOfDays,
//     };
//     axios
//       .post(`${global.Apipath}//D_B_D_P/api/Doctor/suggestplan`, data)
//       .then((response) => {
//         console.log(response);
//         navigate(`/SuggestPlanDetails?name1=${planName}&calories1=${calories}&days1=${noOfDays}`);
        
//       })
//       .catch((error) => {
//         console.log(error);
//         // handle error response
//       });
//   };

//   return (
//     <>
//           <ResponsiveNavDoctor />
//            <div>
           
//             <div>
    
//       <form  onSubmit={handleSubmit}>
       
          
//           <input type="text" value={planName} placeholder="Plan Name" onChange={(e) => setPlanName(e.target.value)} />
       
//         <br/>
        
         
//           <input type="number" value={calories} placeholder="Calories" onChange={(e) => setCalories(e.target.value)} />
        
//           <br/>
        
//           <input type="number" value={noOfDays} placeholder="Number of Days"  onChange={(e) => setNoOfDays(e.target.value)} />
       
//           <br/>
//         <button type="submit">Suggest Plan</button>
//       </form>
//       </div>
//       </div>
//    </>
//   );
  
//     }
// export default SuggestPlan









import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import NavbarDoctor from "../Navbar/NavbarDoctor";
import { useLocation, useNavigate } from "react-router-dom";
import ResponsiveNavDoctor from "../ResponsiveNavDoctor";

function SuggestPlan() {
  const navigate = useNavigate();
  const [planName, setPlanName] = useState("");
  const [calories, setCalories] = useState("");
  const [noOfDays, setNoOfDays] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: planName,
      calories: calories,
      noofdays: noOfDays,
    };
    axios
      .post(`${global.Apipath}//D_B_D_P/api/Doctor/suggestplan`, data)
      .then((response) => {
        console.log(response);
        navigate(
          `/SuggestPlanDetails?name1=${planName}&calories1=${calories}&days1=${noOfDays}`
        );
      })
      .catch((error) => {
        console.log(error);
        // handle error response
      });
  };

  return (
    <>
      <ResponsiveNavDoctor />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  value={planName}
                  className="form-control"
                  placeholder="Plan Name"
                  onChange={(e) => setPlanName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={calories}
                  className="form-control"
                  placeholder="Calories"
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={noOfDays}
                  className="form-control"
                  placeholder="Number of Days"
                  onChange={(e) => setNoOfDays(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Suggest Plan
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuggestPlan;
