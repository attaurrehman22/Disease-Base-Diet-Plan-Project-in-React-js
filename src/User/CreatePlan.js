// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from 'axios';
// //import NavbarUser from "../Navbar/NavbarUser";
// import ResponsiveNavUser from '../ResponsiveNavUser'

// function CreatePlan() {
//   const navigate = useNavigate()
//   const [planName, setPlanName] = useState("");
//   const [calories, setCalories] = useState("");
//   const [noOfDays, setNoOfDays] = useState("");
//   const loginId = localStorage.getItem("loginId");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = {
//       name: planName,
//       calories: calories,
//       noofdays: noOfDays,
//     };
//     axios
//       .post(`${global.Apipath}//D_B_D_P/api/User/UserPlan?loginId=`+loginId, data)
//       .then((response) => {
//         console.log(response);
//         navigate(`/PlanDetails?name1=${planName}&calories1=${calories}&days1=${noOfDays}`);
//         // handle success response
//       })
//       .catch((error) => {
//         console.log(error);
//         // handle error response
//       });
//   };

//   return (
//     <>
//           <ResponsiveNavUser />
//            <div >
           
//             <div >
    
//       <form onSubmit={handleSubmit}>
       
          
//           <input type="text" value={planName} placeholder="Plan Name" onChange={(e) => setPlanName(e.target.value)} />
//         <br/>
      
        
         
//           <input type="number" value={calories} placeholder="Calories" onChange={(e) => setCalories(e.target.value)} />
        
//           <br/>
        
//           <input type="number" value={noOfDays} placeholder="Number of Days"  onChange={(e) => setNoOfDays(e.target.value)} />
       
//           <br/>
//         <button type="submit">Create Plan</button>
//       </form>
//       </div>
//       </div>
//    </>
//   );


// }

// export default CreatePlan;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ResponsiveNavUser from '../ResponsiveNavUser';

function CreatePlan() {
  const navigate = useNavigate()
  const [planName, setPlanName] = useState("");
  const [calories, setCalories] = useState("");
  const [noOfDays, setNoOfDays] = useState("");
  const loginId = localStorage.getItem("loginId");


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: planName,
      calories: calories,
      noofdays: noOfDays,
    };
  
    const url = `${global.Apipath}//D_B_D_P/api/User/UserPlan?loginId=${loginId}`;
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        navigate(`/PlanDetails?name1=${planName}&calories1=${calories}&days1=${noOfDays}`);
        // handle success response
      })
      .catch((error) => {
        console.log(error);
        // handle error response
      });
  };
  

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = {
  //     name: planName,
  //     calories: calories,
  //     noofdays: noOfDays,
  //   };
  //   axios
  //     .post(`${global.Apipath}//D_B_D_P/api/User/UserPlan?loginId=` + loginId, data)
  //     .then((response) => {
  //       console.log(response);
  //       navigate(`/PlanDetails?name1=${planName}&calories1=${calories}&days1=${noOfDays}`);
  //       // handle success response
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // handle error response
  //     });
  // };

  return (
    <>
      <ResponsiveNavUser />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input className="form-control" type="text" value={planName} placeholder="Plan Name" onChange={(e) => setPlanName(e.target.value)} />
              </div>
              <div className="form-group">
                <input className="form-control" type="number" value={calories} placeholder="Calories" onChange={(e) => setCalories(e.target.value)} />
              </div>
              <div className="form-group">
                <input className="form-control" type="number" value={noOfDays} placeholder="Number of Days" onChange={(e) => setNoOfDays(e.target.value)} />
              </div>
              <button className="btn btn-primary" type="submit">Create Plan</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePlan;
