import React, { useState, useEffect, useHistory } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarUser from "../Navbar/NavbarUser";
import ResponsiveNavUser from "../ResponsiveNavUser";

function Suggestedfoods() {
  const [selecteddisease, setSelecteddisease] = useState([]);
  const [disease, setdisease] = useState("");
  const [foodcat, setFoodcat] = useState([]);
  const [food, setFood] = useState("");
  const [foodslist, setFoodslist] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response1 = await axios.get(
        `${global.Apipath}/D_B_D_P/api/Doctor/Diseasename`
      );
      setSelecteddisease(response1.data);
    }
    fetchData();
  }, []);

  const options2 = selecteddisease.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));

  const handleOption2Change = async (event) => {
    const id = event.target.value;
    setdisease(id);
    if (food && id) {
      console.log("comeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      fetch(
        `${global.Apipath}/D_B_D_P/api/Doctor/getsuggestfood?category=${id}&disease=${disease}`
      )
        .then((response) => response.json())
        .then((data) => setFoodslist(data))
        .catch((error) => console.error(error));
    }
    console.log("disease=", disease);
  };

  useEffect(() => {
    async function fetchData() {
      const response1 = await axios.get(
        `${global.Apipath}/D_B_D_P/api/User/getfoodcategoryitem`
      );
      setFoodcat(response1.data);
    }
    fetchData();
  }, []);

  const optionsforfood = foodcat.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));

  const handleOptionData2 = async (event) => {
    const id = event.target.value;
    setFood(id);
    // console.log("=============isididididididi"+id)
    if (id && disease) {
      console.log("food", food);
      console.log("disease", disease);
      console.log("comeeeeeeeeeeeeeeeeeeeeeeeeee");
      fetch(
        `${global.Apipath}/D_B_D_P/api/Doctor/getsuggestfood?category=${id}&disease=${disease}`
      )
        .then((response) => response.json())
        .then((data) => setFoodslist(data))
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      <ResponsiveNavUser />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h4 className="h5">
              <b>Select Disease</b>
            </h4>
            <select
              className="form-select"
              value={disease}
              onChange={handleOption2Change}>
              <option value="">Select Disease</option>
              {options2}
            </select>
          </div>
          <div className="col-md-6">
            <h4 className="h5">
              <b>Select Food Category</b>
            </h4>
            <select
              className="form-select"
              value={food}
              onChange={handleOptionData2}>
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
       {/* <td style={{ width: '8%' }}>
  <input
    type="checkbox"
    checked={selectedFoods.some((f) => f.Fid === food.Fid)}
    onChange={(event) => handleSelectFood(event, food, 'checkbox')}
  />
</td> */}

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




      {/* <div style={{ height: "400px", overflowY: "scroll" }}>
        {foodslist.map((food) => (
          <div key={food.Fid}>
            <div class="container">
             
              <div class="circle">
                <div class="column">
                  <div class="col-12">
                    <img
                      src={`${global.Apipath}/D_B_D_P/Images1/${food.image}`}
                      alt={food.name}
                      class="enlarged-image"
                    />
                  </div>
                </div>
              </div>

             
              <div class="box1">
                <h2>{food.name}</h2>
                <h2>Calories :{food.calories}</h2>
              </div>

              <div class="box1">
                <h2>Unit :{food.unit}</h2>
              </div>
              <div class="box"></div>
            </div>
          </div>
        ))}
      </div> */}
    </>
  );
}
export default Suggestedfoods;
