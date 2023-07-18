import React, { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NavbarUser from "../Navbar/NavbarUser";
import ResponsiveNavUser from '../ResponsiveNavUser'
import  Modal  from "react-modal";
import 'bootstrap/dist/css/bootstrap.css'

export const ViewPlanDetails = (props) => {
    const location = useLocation();
    const [foodcat, setFoodcat] = useState([]);
    const [plancal, setPlancal] = useState([]);
    const [foods, setFoods] = useState([]);
    const [foodname, setFoodname] = useState([]);
    const [selectday, setSelectday] = useState([]);
    const [day, setDay] = useState([]);
    const [mealoption, setMealoption] = useState('');
    const [planDetails, setPlanDetails] = useState([]);
    const [numberOfDays, setNumberOfDays] = useState(0);
    
  const [days, setDays] = useState([]);

  const loginId = localStorage.getItem("loginId");
  const name1 = new URLSearchParams(location.search).get("name1");

  useEffect(() => {
    fetch(
      `${global.Apipath}/D_B_D_P/api/User/getdayofplan?planname=${name1}&userId=${loginId}`
    )
      .then((response) => response.json())
      .then((data) => {
        const daysArray = Array.from({ length: data }, (_, i) => i + 1);
        setDays(daysArray);
      })
      .catch((error) => console.log(error));
  }, [name1, loginId]);


  const handleDayChange = (event) => {
    const selectedDay = event.target.value;
    setSelectday(selectedDay);

    console.log("selected day",selectedDay)
 
  };

  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [ingredientData, setIngredientData] = useState(null);

  const handleDetailsClick = async (food) => {
    setSelectedFood(food);
    console.log("food in ======================",food)
    try {
      const response = await fetch(`${global.Apipath}/D_B_D_P/api/User/ingredientdetailsget?iid=${food.fid}`);
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

  useEffect(() =>{    
      fetch(`${global.Apipath}/D_B_D_P/api/User/getplancal?planname=${name1}&userid=${loginId}`)
        .then(response => response.json())
        .then(data => setPlancal(data))
        .catch(error => console.error(error)); 
            

  }
  )

 
   useEffect(() => {
    if(selectday>0)
    {
      fetch(`${global.Apipath}/D_B_D_P/api/User/viewplandetailsnew?day=${selectday}&loginId=${loginId}&planname=${name1}`)
        .then(response => response.json())
        .then(data => setPlanDetails(data))
        .catch(error => console.error(error));
      }
  })


  return (
    <>
     <ResponsiveNavUser />
      <div class="container-md">
      

      <h1> Plan Name :{name1}</h1>
      <h1> Plan Calories :{plancal}</h1>
      
      <div className="row">
    <div className="col-md-6">
      <div>
        <label>Select Day</label>
        <select
          id="dayDropdown"
          value={selectday}
          onChange={handleDayChange}
          className="form-select"
        >
          <option value="">Select Day</option>
          {days.map((day) => (
            <option key={day} value={day}>
              Day {day}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>



   <div className="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Calories</th>
            <th>Unit</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Meal Time</th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
          {planDetails.map((detail, index) => (
            <tr key={index}>
              <div className="circle">
              <td><img src={`${global.Apipath}/D_B_D_P/Images1/${detail.fimage}`} alt={detail.fname} /></td>
              </div>
              <td>{detail.fname}</td>
              <td>{detail.fcalories}</td>
              <td>{detail.funit}</td>
              <td>{detail.quantity}</td>
              <td>{detail.fcategory}</td>
              <td>{detail.mealtime}</td>
              {/* <div class="box"> */}
                         <td>
                         <button class="btn btn-primary btn-sm" onClick={() => handleDetailsClick(detail)}>Details</button>
                         </td>
              {/* </div>   */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
     
      <div>
      {/* Rest of your code */}
      {selectedFood && (
  <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
    <h2 style={{textAlign:"center"}}><b>Ingredients Of  {selectedFood.name}</b></h2>

    

    {ingredientData ? (
      <div>
        <table className="table">
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


    </>
  );
};