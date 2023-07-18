// import React,{useState} from "react";
// import Axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.css';
// import { Login } from "../Login";
// import NavbarDoctor from "../Navbar/NavbarDoctor";
// import { Link, useNavigate } from "react-router-dom";
// import ResponsiveNavDoctor from "../ResponsiveNavDoctor";

// function AddDisease(){
//   const navigate = useNavigate()
//   const [name, setName] = useState('');
//   const [type, setType] = useState('');

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };


//   const handleTypeChange = (e) => {
//     setType(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = { name,type };
//   fetch(`${global.Apipath}D_B_D_P/api/Doctor/adddisease`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
    
//   })
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error));
//   navigate('/RestrictIngredient', { state: { name } })
//   };

//   return (
//     <>
//     <ResponsiveNavDoctor/>
//             <div >
//                 <div >
//                     <form onSubmit={handleSubmit}>
//       <div>
        
//         <input type="text" id="name" value={name} placeholder="Disease Name" onChange={handleNameChange} />
//       </div>

//       <div>
//         <label >Disease Type</label>
//         <br/>
//         <label htmlFor="Chronic">
//         Chronic
//           <input  type="radio" id="chronic" name="type" value="chronic" checked={type === 'chronic'} onChange={handleTypeChange} />
          
//         </label>

//         <label htmlFor="Acute">
//         Acute
//           <input  type="radio" id="acute" name="type" value="acute" checked={type === 'acute'} onChange={handleTypeChange} />
         
//         </label>
//       </div>

//       <button type="submit">Restrict Ingredient</button>
//                     </form>
//                 </div>
//             </div> 

//     </>
//   );
//     }
// export default AddDisease





import React, { useState } from "react";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Login } from "../Login";
import NavbarDoctor from "../Navbar/NavbarDoctor";
import { Link, useNavigate } from "react-router-dom";
import ResponsiveNavDoctor from "../ResponsiveNavDoctor";

function AddDisease() {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, type };
    fetch(`${global.Apipath}/D_B_D_P/api/Doctor/adddisease`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)

    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    navigate('/RestrictIngredient', { state: { name } })
  };

  return (
    <>
      <ResponsiveNavDoctor />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input type="text" id="name" value={name} className="form-control" placeholder="Disease Name" onChange={handleNameChange} />
              </div>

              <div className="mb-3">
                <label className="d-block">Disease Type</label>
                <div className="form-check form-check-inline">
                  <input type="radio" id="chronic" name="type" value="chronic" checked={type === 'chronic'} onChange={handleTypeChange} className="form-check-input" />
                  <label htmlFor="chronic" className="form-check-label">Chronic</label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" id="acute" name="type" value="acute" checked={type === 'acute'} onChange={handleTypeChange} className="form-check-input" />
                  <label htmlFor="acute" className="form-check-label">Acute</label>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">Restrict Ingredient</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddDisease;
