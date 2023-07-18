import React, { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NavbarUser from "../Navbar/NavbarUser";
import NavbarDoctor from "../Navbar/NavbarDoctor";
import ResponsiveNavDoctor from "../ResponsiveNavDoctor";
import  Modal  from "react-modal";

export const SuggestPlanDetails = (props) => {
const navigate = useNavigate()
  const location=useLocation()
  const [data2, setData2] = useState([]);
  const [mealoption, setMealoption] = useState('');
  const [age, setAge] = useState(1);
  const [foods, setFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [remCalories, setRemCalories] = useState(0);
  const [dataList, setDataList] = useState([]);
 
  
  const[day_list,setDay_list]=useState([]);
  const [quantity, setQuantity] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState([]);
  const [sendcate,setSendcate]=useState('');
const[foodlist,setfoodlist]=useState([])
  const[ingshow,setIngshow]=useState([]);

  const calorieLimit = 500;
  const name1 = new URLSearchParams(location.search).get("name1");
  const calories1 = new URLSearchParams(location.search).get("calories1");
  const days1 = new URLSearchParams(location.search).get("days1");



    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);
    const [ingredientData, setIngredientData] = useState(null);

    const handleDetailsClick = async (food) => {
      setSelectedFood(food);
      console.log("food",food)
      console.log("food=fid",food.Fid)
      try {
        const response = await fetch(`${global.Apipath}/D_B_D_P/api/User/ingredientdetailsget?iid=${food.Fid}`);
        const data = await response.json();
        setIngredientData(data);
        console.log("data",data)
        console.log("setIngredientData",ingredientData)
        setModalIsOpen(true);
      } catch (error) {
        console.error('Error fetching ingredient data:', error);
      }
    };

    const closeModal = () => {
      setModalIsOpen(false);
      setSelectedFood(null);
      setIngredientData(null);
    };





  const foruploadingdayintodatabase=1;
  useEffect(()=>{
    setRemCalories(calories1 - totalCalories ); 
  })
  
  useEffect(() => {
    async function fetchData() {
      const response1 = await axios.get(`${global.Apipath}/D_B_D_P/api/User/getfoodcategoryitem`);
      setData2(response1.data);
    }
    fetchData();
  }, []);
  

  const days11=3;
  const dayOptions = Array.from(   {length: parseInt(days1)}, (_, index) => index + 1);


  const options2 = data2.map(item => (
    <option key={item.id} value={item.id}>{item.name}</option>
  ));
 
  const handleOption2Change = async (event) => {
    const id=event.target.value
    setSelectedCategoryId(id)
   // console.log("=============isididididididi"+id)
    const response = await axios.get(`${global.Apipath}/D_B_D_P/api/Doctor/getcategoryfood?iid=`+id);
    
    setFoods(response.data);
   
  };

  
  




  const handleOption2Change1 = async (event) => {
    const per_day = event.target.value;
    setAge(per_day);
    console.log("per day",per_day)
    console.log("per day in handleoption2change1",day_list)
    // Check if per_day exists in day_list
    const existingAge = day_list.find((item) => item.age == per_day);
    if (existingAge) {
      console.log("existing totacalories and day",existingAge)
      console.log("existing totacalories and day",existingAge.totalCalories)
      // per_day exists, set totalCalories to the existing totalCalories value
      setTotalCalories(existingAge.totalCalories);
      setRemCalories(calories1-existingAge.totalCalories)
    } else {
      setTotalCalories(0)
      setRemCalories(calories1-totalCalories)
    }
  
  };
  

  const handleSelectFood = (event, food, type) => {
    

    
    if (type === "checkbox") 
    {


      const isChecked = event.target.checked;
      console.log("ischecke with",isChecked)
      if (isChecked) {
        
        if (totalCalories + food.calories <= calories1) {
          setSelectedFoods([...selectedFoods, { ...food, quantity: 1, day : age,mealtype:mealoption}]);
          setTotalCalories(totalCalories + food.calories);
          const newData = {
            Fid: food.Fid,
            mealtype: mealoption,
            totalcalories1: totalCalories+food.calories,
            calorieslimit: calories1,
            selectedCategoryId:selectedCategoryId,
            day: age,
            quantity: 1 
          };
          setDataList([...dataList, newData]);
          setRemCalories(calories1 - totalCalories );    


          const existingAgeIndex = day_list.findIndex((item) => item.age === age);
      if (existingAgeIndex !== -1) {
        // Age already exists, update totalCalories
        day_list[existingAgeIndex].totalCalories = totalCalories+food.calories;
       // console.log("day_list in !==-1",day_list)
      } else {
        // Age does not exist, add new entry to day_list
        day_list.push({ age: age, totalCalories: totalCalories+food.calories });
        //console.log("day_list in else part",day_list)
      }
                  
        } 
        else {
          alert("You have exceeded the limit of 500 calories!");
          event.target.checked = false;
        }
      } 
      else {
        let arr = [];
        for (let i = 0; i < selectedFoods.length; i++) {
          if (
            selectedFoods[i].Fid === food.Fid &&
            selectedFoods[i].day === age &&
            selectedFoods[i].mealtype === mealoption
          ) {
            
          } 
          else 
          {
            arr.push(selectedFoods[i]);
          }
        }
              const filteredFoods = selectedFoods.filter((f) => f.Fid !== food.Fid && f.day != age && f.mealtype!=mealoption);
              setSelectedFoods(arr);
        
              const updatedDataList = dataList.filter(
                (item) => item.Fid !== food.Fid || item.mealtype !== mealoption
              );
              let counter=0;
              const quan = dataList.filter((item) => {
                if (item.Fid === food.Fid) {
                  counter=totalCalories - food.calories * item.quantity;
                  //console.log("counter  =",counter)
                  setTotalCalories(totalCalories - food.calories * item.quantity);
                 
                }
                return item.Fid !== food.Fid || item.quantity !== quantity;
              });
              

              const existingAgeIndex = day_list.findIndex((item) => item.age === age);
              if (existingAgeIndex !== -1) {
                // Age already exists, update totalCalories
                day_list[existingAgeIndex].totalCalories = counter;
                //console.log("ageesict calories",day_list)
              }




            
              setDataList(updatedDataList);

              setRemCalories(calories1 - totalCalories);
              
            }
    }
    else if (type === "quantity")
     {
      const updatedSelectedFoods = selectedFoods.map((f) => {
        if (f.Fid === food.Fid) {
          f.quantity = parseInt(event.target.value);
        }
        return f;
      });
      setSelectedFoods(updatedSelectedFoods);
    
      const updatedDataList = dataList.map((item) => {
        if (item.Fid === food.Fid) {
          item.quantity = parseInt(event.target.value);
        }
        return item;
      });
      setDataList(updatedDataList);
    
      const updatedTotalCalories = updatedSelectedFoods.reduce((total, f) => {
        return total + f.calories * f.quantity;
      }, 0);


      const existingAgeIndex = day_list.findIndex((item) => item.age === age);
      if (existingAgeIndex !== -1) {
        // Age exists, update totalCalories
        day_list[existingAgeIndex].totalCalories = updatedTotalCalories;
      }


      setTotalCalories(updatedTotalCalories);
    
      setRemCalories(calories1 - updatedTotalCalories);
    };

    }
    
    
  
  
  
  useEffect(() => {
    const lastSelectedFood = selectedFoods[selectedFoods.length - 1];
    if (totalCalories > calories1 && lastSelectedFood) {
      alert("calories limit exceed")
      setSelectedFoods(selectedFoods.filter((f) => f.Fid !== lastSelectedFood.Fid));
      setTotalCalories(totalCalories - lastSelectedFood.calories * lastSelectedFood.quantity);
      setRemCalories(calories1 - totalCalories);
    }
    
  }, [selectedFoods, totalCalories]);


  
  const handleChange = (event) => {

    // setSelectedFoods([])
    setMealoption(event.target.value);
    
  }
 



const postToDatabase = async () => {
  
  
  try {
    const response = await axios.post(`${global.Apipath}/D_B_D_P/api/Demo/PostDataofSuggestplan?planname=`+name1, dataList);
    //console.log(response.data);
    alert("Plan saved successfully!");
  } catch (error) {
    //console.error(error);
    alert("Failed to save data!");
  }
};








  
  return (
    <>
      <ResponsiveNavDoctor/>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6">

      <div>
      
      <div>
        <table>
          <tbody>
          <tr>
  <td>Plan Name {name1}</td>
  <td>Plan calories {calories1}</td>
  <td>Remaining calories {remCalories}</td>
</tr>
</tbody>
          
        </table>

        </div>


        <tr>
  <td cclassName="dropdown1">
    <label>Day:</label>
    <select className="day-input" value={age} onChange={handleOption2Change1}>
      {dayOptions.map((day) => (
        <option key={day} value={day}>{day}</option>
      ))}
    </select>
  </td>

  <td  className="dropdown2">
    <select className="cat-input" value={selectedCategoryId} onChange={handleOption2Change}>
      <option value="">Select Food category</option>
      {options2}
    </select>
  </td>

  <td  className="dropdown3">
    <select className="quantity-input" value={mealoption} onChange={handleChange}>
      <option value="">Select Meal Time</option>
      <option value="Breakfast">Breakfast</option>
      <option value="Lunch">Lunch</option>
      <option value="Snacks">Snacks</option>
      <option value="Dinner">Dinner</option>
    </select>
  </td>
</tr>

          


         

        <table>
  <tbody>
    {foods.map((food) => (
      <tr key={food.Fid}>
       <td style={{ width: '8%' }}>
  <input
    type="checkbox"
    checked={selectedFoods.some(
      (f) =>
        f.Fid === food.Fid &&
        f.day === age &&
        f.mealtype === mealoption
    )}
    onChange={(event) => handleSelectFood(event, food, 'checkbox')}
  />
</td>

        <td style={{ width: '5%' }}>
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
        <td style={{ width: '30%' }}>
          <h2 className="food-name">Unit: {food.unit}</h2>
          {selectedFoods.some((f) => f.Fid === food.Fid) && (
            <label>
            <span className="label-text">Quantity:</span>
            <input
              type="number"
              min={1}
              value={selectedFoods.find((f) => f.Fid === food.Fid)?.quantity}
              onChange={(event) => handleSelectFood(event, food, 'quantity')}
              className="quantity-input"
            />
          </label>
          
          )}
        </td>
        <td style={{ width: '5%' }}>
          <button type="button" class="btn btn-info" onClick={() => handleDetailsClick(food)}>Details</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


   
            <button type="button" class="btn btn-success" onClick={postToDatabase}>Save Plan</button>
    






            <div>
      {selectedFood && (
  <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
    <h2 ><b>Ingredients Of  {selectedFood.name}</b></h2>
    {ingredientData ? (
      <div>
        <table >
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {ingredientData.map((ingredient) => (
              <tr key={ingredient.id}>
                <td>{ingredient.name}</td>
                <td>{ingredient.quantity}</td>
                <td>{ingredient.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p>Loading data...</p>
    )}

    <button onClick={closeModal}>Close</button>
  </Modal>
)}
    </div>



         </div>
      
      
      
         </div>
         </div>
         </div>

      
    </>
  );
};


