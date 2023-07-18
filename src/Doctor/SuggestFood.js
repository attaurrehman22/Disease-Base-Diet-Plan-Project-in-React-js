// import React, { useState, useEffect,useHistory } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from 'axios';
// import NavbarDoctor from "../Navbar/NavbarDoctor";
// import ResponsiveNavDoctor from "../ResponsiveNavDoctor";

// function SuggestFoods() {
//     const [selecteddisease, setSelecteddisease] = useState([]);
//     const [disease, setdisease] = useState([]);
//     const [foodcat, setFoodcat] = useState([]);
//     const [food, setFood] = useState([]);
//     const [foodslist, setFoodslist] = useState([]);
//     const [selectedFoods, setSelectedFoods] = useState([]);

//     useEffect(() => {
//         async function fetchData() {
//           const response1 = await axios.get(`${global.Apipath}/D_B_D_P/api/Doctor/Diseasename`);
//           setSelecteddisease(response1.data);
//         }
//         fetchData();
//       }, []);

      
//       const options2 = selecteddisease.map(item => (
//         <option key={item.id} value={item.id}>{item.name}</option>
//       ));
      
//       const handleOption2Change = async (event) => {
//         const id=event.target.value
//         setdisease(id)
//         console.log("disease=",disease)
//       };


//       useEffect(() => {
//         async function fetchData() {
//           const response1 = await axios.get(`${global.Apipath}/D_B_D_P/api/User/getfoodcategoryitem`);
//           setFoodcat(response1.data);
//         }
//         fetchData();
//       }, []);

//       const optionsforfood = foodcat.map(item => (
//         <option key={item.id} value={item.id}>{item.name}</option>
//       ));

//       const handleOptionData2 = async (event) => {
//         const id=event.target.value
//         setFood(id)
//        // console.log("=============isididididididi"+id)
//         const response = await axios.get(`${global.Apipath}/D_B_D_P/api/Doctor/getcategoryfood?iid=`+id);
        
//         setFoodslist(response.data);
       
//       };

//       const handleSelectFood = (event, food) => {
//         const isChecked = event.target.checked;
//         if (isChecked) {
//           setSelectedFoods([...selectedFoods, { ...food }]);
//         } else {
//           setSelectedFoods(selectedFoods.filter((f) => f.Fid !== food.Fid));
//         }
//       };
      
        

//         const postToDatabase = async () => {
           
        
//             try {
//               const response = await axios.post(`${global.Apipath}/D_B_D_P/api/Doctor/PostSuggestedfood?diseasename=`+disease,selectedFoods);
//               //console.log(response.data);
//               alert("Data saved successfully!");
//             } catch (error) {
//               //console.error(error);
//               alert("Failed to save data!");
//             }
//           };



//     return (
//         <>
//         <ResponsiveNavDoctor/>
//         <div>
//           <table>
//           <tr>
            
//             <div>
//             <h4 > <b>Select Disease </b></h4>
//             <tr >
              
             
//                 <select 
//                  value={disease} onChange={handleOption2Change}>
//                   <option value="">Select Disease</option>
//                   {options2}
//                 </select>
              
//             </tr>
//             </div>
          
//             </tr>
//            <tr>
        
//             <div>
//             <h4 > <b>Select FoodCategory </b></h4>
//             <tr >
        
            
//                 <select 
//                  value={food} onChange={handleOptionData2}>
//                   <option value="">Select Food category</option>
//                   {optionsforfood}
//                 </select>
          
//             </tr>
//             </div>
            
//           </tr>
          
        

            
//             </table>

//             <div >
//             {foodslist.map((food) => (
//               <div key={food.Fid} >
//                 <div >
//                        <input type="checkbox" checked={selectedFoods.some(f => f.Fid === food.Fid)}
//                             onChange={(event) => handleSelectFood(event, food)} />
                    
//                     <div>
//                         <div className="circle">
//                         <img src={`${global.Apipath}/D_B_D_P/Images1/${food.image}`} alt={food.name} />
//                         </div>
//                     </div>
//                     <div >
//                    <h2>{food.name}</h2>
//                    <h2>Calories :{food.calories}</h2>
//                    </div>
                   
//                    <div >
//                           <h2>Unit :{food.unit}</h2>
                          
//                               {/* {selectedFoods.some((f) => f.Fid === food.Fid) && (
//                                <label> Quantity: <input type="number" min={1} value={selectedFoods.find((f) => f.Fid === food.Fid)?.quantity}
//                                        onChange={(event) => handleSelectFood(event, food,"quantity")} />
//                                </label>
//                               )} */}
                          
//                    </div>
//                    <div>
//                          {/* <td>
//                          <button onClick={() => handleDetailsClick(food)}>Details</button>
//                          </td> */}
//                     </div>    
                    
//               </div>
              
//               </div>
//             ))}
//             </div>   
//             <button onClick={postToDatabase}>Suggest Foods</button>
    
//          </div>
        
        

//         </>
//     );
// };
// export default SuggestFoods;




import React, { useState, useEffect } from "react";
import axios from 'axios';
import NavbarDoctor from "../Navbar/NavbarDoctor";
import ResponsiveNavDoctor from "../ResponsiveNavDoctor";

function SuggestFoods() {
  const [selecteddisease, setSelecteddisease] = useState([]);
  const [disease, setdisease] = useState("");
  const [foodcat, setFoodcat] = useState([]);
  const [food, setFood] = useState("");
  const [foodslist, setFoodslist] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response1 = await axios.get(`${global.Apipath}/D_B_D_P/api/Doctor/Diseasename`);
      setSelecteddisease(response1.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response1 = await axios.get(`${global.Apipath}/D_B_D_P/api/User/getfoodcategoryitem`);
      setFoodcat(response1.data);
    }
    fetchData();
  }, []);

  const handleOption2Change = (event) => {
    const id = event.target.value;
    setdisease(id);
  };

  const handleOptionData2 = async (event) => {
    const id = event.target.value;
    setFood(id);
    const response = await axios.get(`${global.Apipath}/D_B_D_P/api/Doctor/getcategoryfood?iid=` + id);
    setFoodslist(response.data);
  };

  const handleSelectFood = (event, food) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedFoods([...selectedFoods, { ...food }]);
    } else {
      setSelectedFoods(selectedFoods.filter((f) => f.Fid !== food.Fid));
    }
  };

  const postToDatabase = async () => {
    try {
      const response = await axios.post(`${global.Apipath}/D_B_D_P/api/Doctor/PostSuggestedfood?diseasename=` + disease, selectedFoods);
      alert("Data saved successfully!");
    } catch (error) {
      alert("Failed to save data!");
    }
  };

  const options2 = selecteddisease.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));

  const optionsforfood = foodcat.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));

  return (
    <>
      <ResponsiveNavDoctor />
      <div className="container">
  <div className="row">
    <div className="col-md-6">
      <h4 className="h5">
        <b>Select Disease</b>
      </h4>
      <select className="form-select" value={disease} onChange={handleOption2Change}>
        <option value="">Select Disease</option>
        {options2}
      </select>
    </div>
    <div className="col-md-6">
      <h4 className="h5">
        <b>Select Food Category</b>
      </h4>
      <select className="form-select" value={food} onChange={handleOptionData2}>
        <option value="">Select Food category</option>
        {optionsforfood}
      </select>
    </div>
  </div>
</div>





<table>
  <tbody>
    {foodslist.map((food) => (
      <tr key={food.Fid}>
       <td style={{ width: '8%' }}>
  <input
    type="checkbox"
    checked={selectedFoods.some((f) => f.Fid === food.Fid)}
    onChange={(event) => handleSelectFood(event, food, 'checkbox')}
  />
</td>

        <td style={{ width: '8%' }}>
          <div className="circle">
            <img
              src={`${global.Apipath}/D_B_D_P/Images1/${food.image}`}
              alt={food.name}
            />
          </div>
        </td>
        <td>
          <h2 className="food-name">{food.name}</h2>
          <h2 className="food-name">Calories: {food.calories}</h2>
        </td>
        <td>
          <h2 className="food-name">Unit: {food.unit}</h2>
         
        </td>
      </tr>
    ))}
  </tbody>
</table>









{/* 
<div className="row">
  {foodslist.map((food) => (
    <div className="col-md-4 col-sm-6" key={food.Fid}>
      <div className="card mb-3">
        <div className="card-body">
          <input
            type="checkbox"
            checked={selectedFoods.some((f) => f.Fid === food.Fid)}
            onChange={(event) => handleSelectFood(event, food)}
          />
          <div className="circle">
            <img src={`${global.Apipath}/D_B_D_P/Images1/${food.image}`} alt={food.name} />
          </div>
          <div>
            <h2>{food.name}</h2>
            <h2>Calories: {food.calories}</h2>
          </div>
          <div>
            <h2>Unit: {food.unit}</h2>
          </div>
        </div>
      </div>
    </div>
  ))}
</div> */}


        <button className="btn btn-primary" onClick={postToDatabase}>
          Suggest Foods
        </button>
     
    </>
  );
}

export default SuggestFoods;




