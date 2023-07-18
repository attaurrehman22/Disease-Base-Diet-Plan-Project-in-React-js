import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NavbarUser from "../Navbar/NavbarUser";
import ResponsiveNavUser from "../ResponsiveNavUser";
import Modal from "react-modal";

export const SuggestedPlanDetails = (props) => {
  const location = useLocation();
  const [foodcat, setFoodcat] = useState([]);
  const [plancal, setPlancal] = useState([]);
  const [foods, setFoods] = useState([]);
  const [foodname, setFoodname] = useState([]);
  const [selectday, setSelectday] = useState([]);
  const [day, setDay] = useState([]);
  const [mealoption, setMealoption] = useState("");
  const [planDetails, setPlanDetails] = useState([]);
  const [numberOfDays, setNumberOfDays] = useState(0);

  const [days, setDays] = useState([]);

  const loginId = localStorage.getItem("loginId");
  const name1 = new URLSearchParams(location.search).get("name1");

  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [ingredientData, setIngredientData] = useState(null);

  const handleDetailsClick = async (food) => {
    setSelectedFood(food);
    console.log("food in ======================", food);
    try {
      const response = await fetch(
        `${global.Apipath}/D_B_D_P/api/User/ingredientdetailsget?iid=${food.fid}`
      );
      const data = await response.json();
      setIngredientData(data);
      console.log("data", data);
      console.log("setIngredientData", ingredientData);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error fetching ingredient data:", error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedFood(null);
    setIngredientData(null);
  };

  useEffect(() => {
    fetch(
      `${global.Apipath}/D_B_D_P/api/User/getdayofsuggestplan?planname=${name1}`
    )
      .then((response) => response.json())
      .then((data) => {
        const daysArray = Array.from({ length: data }, (_, i) => i + 1);
        setDays(daysArray);
      })
      .catch((error) => console.log(error));
  }, [name1, loginId]);

  useEffect(() => {
    if (selectday > 0) {
      fetch(
        `${global.Apipath}/D_B_D_P/api/User/getsuggestplancal?planname=${name1}&day=${selectday}`
      )
        .then((response) => response.json())
        .then((data) => setPlancal(data))
        .catch((error) => console.error(error));
    }
  });

  useEffect(() => {
    if (selectday > 0) {
      fetch(
        `${global.Apipath}/D_B_D_P/api/User/viewsuggestplandetailsnew?day=${selectday}&planname=${name1}`
      )
        .then((response) => response.json())
        .then((data) => setPlanDetails(data))
        .catch((error) => console.error(error));
    }
  });

  function getreco() {
    if (foodcat && day && mealoption) {
      fetch(
        `${global.Apipath}/D_B_D_P/api/User/viewplandetails?foodcat=${foodname}&day=${selectday}&mealoption=${mealoption}&loginId=${loginId}&planname=${name1}`
      )
        .then((response) => response.json())
        .then((data) => setPlanDetails(data))
        .catch((error) => console.error(error));
    }
  }
  

  const options2 = foodcat.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));
  const handleChange = (event) => {
    setMealoption(event.target.value);
  };

  const handleDayChange = (event) => {
    const selectedDay = event.target.value;
    setSelectday(selectedDay);
    setSelectday(null); // set the state variable to null first
    setSelectday(selectedDay); // then set it to the selected value
  };

  return (
    <>
      <ResponsiveNavUser />
    <div className="container-fluid">
       <table>
        <tbody>
          <tr>
            <td>Plan name: {name1}</td>
            <td>Plan calories: {plancal}</td>
          </tr>
        </tbody>
      </table>



      <div className="row">
  <div className="col-md-4 d-flex align-items-center">
    {/* <label htmlFor="dayDropdown">Day:</label> */}
    <select id="dayDropdown" value={selectday} onChange={handleDayChange} className="form-control">
      <option value="">Select Day</option>
      {days.map((day) => (
        <option key={day} value={day}>
          Day {day}
        </option>
      ))}
    </select>
  </div>
</div>


<div className="container-fluid">

      <div className="table-responsive">

      <table class="table">
        <thead>
          <tr style={{ fontWeight: "bold", fontSize: "24px" }}>
            <th></th>
            <th>Name</th>
            <th>Calories</th>
            <th>Unit</th>
            <th>Quantity</th>
            <th>MealTime</th>
            <th>Food category</th>
          </tr>
        </thead>
        <tbody>
          {planDetails.map((detail, index) => (
            <tr
              style={{
                background: "white",
                color: "black",
                fontWeight: "bold",
              }}
              key={index}>
              <div className="circle">
                <td>
                  <img
                    src={`${global.Apipath}/D_B_D_P/Images1/${detail.fimage}`}
                    alt={detail.fname}
                  />
                </td>
              </div>
              <td>{detail.fname}</td>
              <td>{detail.fcalories}</td>
              <td>{detail.funit}</td>
              <td>{detail.quantity}</td>
              <td>{detail.mealtime}</td>
              <td>{detail.fcategory}</td>
              <div class="box">
                <td>
                  <button  type="button" class="btn btn-info" onClick={() => handleDetailsClick(detail)}>
                    Details
                  </button>
                </td>
              </div>
            </tr>
          ))}
        </tbody>
      </table>


      
      <div>

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

    <button type="button" class="btn btn-success" onClick={closeModal}>Close</button>
  </Modal>
)}
</div>
</div>
</div>
</div>
    </>
  );
};
