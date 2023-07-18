








import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import NavbarUser from '../Navbar/NavbarUser';
import axios from 'axios';
import  Modal  from 'react-modal';
function ShowImage() {

  const location=useLocation()
 

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const[status,setStatus]=useState(null);
  useEffect(()=>{
    if(status!=null){
    alert('Status Updated!',status);
  }
  },[status])

  const foodid1=3028;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost/D_B_D_P/api/User/ingredientdetailsget?iid=' + foodid1);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const openModal = () => {
    setStatus('ButtonClicked');
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
    
  const [selectedFoodItems, setSelectedFoodItems] = useState([]);
  const [data2, setData2] = useState([]);
  const [mealoption, setMealoption] = useState('');
  const [age, setAge] = useState(1);
  const [quantity, setQuantity] = useState(0);
  const [foods, setFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const loginId = localStorage.getItem("loginId");
  const name1 = new URLSearchParams(location.search).get("name1");
  const calories1 = new URLSearchParams(location.search).get("calories1");
  const days1 = new URLSearchParams(location.search).get("days1");

  useEffect(() => {
    async function fetchData() {
      const response1 = await axios.get('http://localhost/D_B_D_P/api/User/getfoodcategoryitem');
      setData2(response1.data);
    }
    fetchData();
  }, []);


  const dayOptions = Array.from(   {length: parseInt(days1)}, (_, index) => index + 1);


  const options2 = data2.map(item => (
    <option key={item.id} value={item.id}>{item.name}</option>
  ));

  const handleChange = (event) => {
    setMealoption(event.target.value);
  }

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleCheckboxClick = (event, food) => {
    const isChecked = event.target.checked;
  
    if (isChecked) {
      setSelectedFoodItems([
        ...selectedFoodItems,
        {
          Fid: food.Fid,
          calories: food.calories,
          quantity: quantity,
          mealoption: mealoption,
          day: age
        }
      ]);
      console.log(selectedFoodItems)
    } else {
      setSelectedFoodItems(
        selectedFoodItems.filter((item) => item.Fid !== food.Fid)
      );
    }
  };
  
  const handleOption2Change = async (event) => {
    const selectedCategoryId = event.target.value;
    
    const response = await axios.get(`http://localhost/D_B_D_P/api/User/getcategoryfood?iid=`+selectedCategoryId);
    setFoods(response.data);
    console.log(response.data)
  };
   
  return (
    <>
      <NavbarUser/>
      <div className="form-container">
      <div className="form-box">
        <table>
          <tbody>
            <tr>
              <td colSpan="3">
                <label>Select Day: </label>
                <select value={age} onChange={event => setAge(event.target.value)}>
                  {dayOptions.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <label>Select Food Category: </label>
                <select value={age} onChange={handleOption2Change}>
                  <option value="">Select a category</option>
                  {options2}
                </select>
              </td>
            </tr>
            <tr>
              <td>
              <select value={mealoption} onChange={handleChange}>
      <option value="">Select an option</option>
      <option value="Breakfast">Breakfast</option>
      <option value="Lunch">Lunch</option>
      <option value="Snacks">Snacks</option>
      <option value="Dinner">Dinner</option>
    </select>
              </td>
            </tr>
          </tbody>
          
        </table>
      </div>
        <div className="form-div-food">
        
            {foods.map((food) => (
              <div key={food.Fid}>
                        <h2>{food.Fid}</h2>
                       <input type="checkbox" checked={selectedFoods.some((f) => f.Fid === food.Fid)}
                      onClick={(event) => handleCheckboxClick(event, food)} />
                        <img src={`http://localhost/D_B_D_P/Images1/${food.image}`} alt={food.name} />
                        <h2>{food.name}</h2>
                        <h2>{food.calories}</h2>
                        <h2>{food.unit}</h2>  
                        {selectedFoods.some((f) => f.Fid === food.Fid) && (
                               <label>
                               Quantity:
                               <input type="number" value={quantity} onChange={handleQuantityChange} />
                             </label>
                              )}
              </div>
            ))}
        </div>





      
      <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {data ? (
          <div>
            <h2>Data from API:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </Modal>
    </div>





      </div> 
    </>
  );
















//   const navigate = useNavigate()
//   const location=useLocation()
//   const [data2, setData2] = useState([]);
//   const [age, setAge] = useState(1);
//   const [foods, setFoods] = useState([]);
//   const [selectedFoods, setSelectedFoods] = useState([]);
//   const [totalCalories, setTotalCalories] = useState(0);
//   const [remCalories, setRemCalories] = useState(0);
//   const [dataList, setDataList] = useState([]);
//   const loginId = localStorage.getItem("loginId");
//   const name1 = new URLSearchParams(location.search).get("name1");
//   const calories1 = new URLSearchParams(location.search).get("calories1");
//   const days1 = new URLSearchParams(location.search).get("days1");

//   useEffect(() => {
//     async function fetchData() {
//       const response1 = await axios.get('http://localhost/D_B_D_P/api/User/getfoodcategoryitem');
//       setData2(response1.data);
//     }
//     fetchData();
//   }, []);


//   const dayOptions = Array.from(   {length: parseInt(days1)}, (_, index) => index + 1);


//   const options2 = data2.map(item => (
//     <option key={item.id} value={item.id}>{item.name}</option>
//   ));

//   // Function to handle dropdown list change event
//   const handleOption2Change = async (event) => {
//     const selectedCategoryId = event.target.value;
    
//     const response = await axios.get(`http://localhost/D_B_D_P/api/User/getcategoryfood?iid=`+selectedCategoryId);
//     // Do something with the data returned from the API
//     setFoods(response.data);
//     console.log(response.data)

    
//   };
//   const handleSelectFood = (event, food) => {
//     const isChecked = event.target.checked;
//     if (isChecked) {
//       if (totalCalories + food.calories <= calories1) {
//         setSelectedFoods([...selectedFoods, { ...food, quantity: 1 }]);
//         setTotalCalories(totalCalories + food.calories);
//       } else {
//         alert('You have exceeded the limit of 500 calories!');
//         event.target.checked = false;
//       }
//     } else {
      
//       const filteredFoods = selectedFoods.filter((f) => f.Fid !== food.Fid);
//       setSelectedFoods(filteredFoods);
      
//       setTotalCalories(totalCalories - food.calories * food.quantity);
//       setRemCalories(calories1-totalCalories)
//     }
//   };
//   const handleQuantityChange = (event, food) => {
//     const quantity = parseInt(event.target.value);
//     const updatedFoods = selectedFoods.map((f) =>f.Fid === food.Fid ? { ...f, quantity } : f);
//     setSelectedFoods(updatedFoods);
    
//     setTotalCalories(updatedFoods.reduce((total, f) => total + f.calories * f.quantity, 0));
    
//   };
//   useEffect(() => {
//     const lastSelectedFood = selectedFoods[selectedFoods.length - 1];
//     if (totalCalories > calories1 && lastSelectedFood) {
//       alert("calories limit exceed")
//       setSelectedFoods(selectedFoods.filter((f) => f.Fid !== lastSelectedFood.Fid));
//       setTotalCalories(totalCalories - lastSelectedFood.calories * lastSelectedFood.quantity);
//     }
    
//   }, [selectedFoods, totalCalories]);


//   const handleSaveDataofnuguter = (mealType) => {
//     const selectedFoodsForMeal = selectedFoods.filter((f) => f.checked);
//     const dataToSave = selectedFoodsForMeal.map((f) => ({ id: f.Fid, mealType }));

//     const newData = {
//       Fid: dataToSave.id,
//       mealtype: mealType,
//       totalcalories: totalCalories,
//       calorieslimit: calories1,
//       day:age
//     };
    
//     setDataList([...dataList, newData]);
//     console.log(dataList)
//     setSelectedFoods([]);
//     // code to save data to database or state management can be added here
//   }
   
 

//   const handleDetailsClick = async (food) => {
//     console.log("food id="+food.Fid)
//     const response = await fetch(`http://localhost/D_B_D_P/api/User/ingredientdetailsget?iid=`+food.Fid);
//     const ingredients = await response.json();
//     const formattedIngredients = JSON.stringify(ingredients, null,2);
//     alert(`Ingredients for ${food.name}:\n${formattedIngredients}`);
//   };
  
//   return (
//     <>
//       <NavbarUser/>
//       <div className="form-container">
//       <div className="form-box">
//         <table>
//           <tbody>
//             <tr>
//               <th>Plan name: {name1}</th>
//               <th>Plan calories: {calories1}</th>
//               <th>Remaining calories: {remCalories}</th>
//               <th>Login ID: {loginId}</th>
//             </tr>
//             <tr>
//               <td colSpan="3">
//                 <label>Select Day: </label>
//                 <select value={age} onChange={event => setAge(event.target.value)}>
//                   {dayOptions.map((day) => (
//                     <option key={day} value={day}>{day}</option>
//                   ))}
//                 </select>
//               </td>
//             </tr>
//             <tr>
//               <td colSpan="3">
//                 <label>Select Food Category: </label>
//                 <select value={age} onChange={handleOption2Change}>
//                   <option value="">Select a category</option>
//                   {options2}
//                 </select>
//               </td>
//             </tr>
//           </tbody>
          
//         </table>
//       </div>
//       <div className="form-box">
//         <div className="no-gutters">
//         <button type="button" onClick={() => handleSaveDataofnuguter('Breakfast')}>Breakfast</button>
//         <button type="button" onClick={() => handleSaveDataofnuguter('Lunch')}>Lunch</button>
//         <button type="button" onClick={() => handleSaveDataofnuguter('Snacks')}>Snacks</button>
//         <button type="button" onClick={() => handleSaveDataofnuguter('Dinner')}>Dinner</button>
//         </div>
//         </div>
//         <div className="form-div-food">
        
//             {foods.map((food) => (
//               <div key={food.Fid}>
//                 <div class="container">
//                        <input type="checkbox" checked={selectedFoods.some((f) => f.Fid === food.Fid)}
//                               onChange={(event) => handleSelectFood(event, food)} />
                    
//                     <div class="box">
//                         <div className="circle">
//                         <img src={`http://localhost/D_B_D_P/Images1/${food.image}`} alt={food.name} />
//                         </div>
//                     </div>
//                     <div class="box1">
//                    <h2>{food.name}</h2>
//                    <h2>{food.calories}</h2>
//                    </div>
                   
//                    <div class="box1">
//                           <h2>{food.unit}</h2>
                          
//                               {selectedFoods.some((f) => f.Fid === food.Fid) && (
//                                <label> Quantity: <input type="number" min={1} value={selectedFoods.find((f) => f.Fid === food.Fid)?.quantity}
//                                        onChange={(event) => handleQuantityChange(event, food)} />
//                                </label>
//                               )}
                          
//                    </div>
//                    <div class="box">
//                          <td>
//                          <button onClick={() => handleDetailsClick(food)}>Details</button>
//                          </td>
//                     </div>    
//               </div>
//               </div>
//             ))}
//                <p>Total Calories: {totalCalories}</p>
//                </div>
        
//         <div class="container">
//   <div class="box"></div>
//   <div class="box1">Container 2</div>
//   <div class="box1">Container 3</div>
// </div>



//       </div> 
//     </>
//   );

};

export default ShowImage;
