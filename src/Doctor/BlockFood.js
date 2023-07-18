import React, { useState, useEffect,useHistory } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import ResponsiveNavUser from "../ResponsiveNavUser";

function BlockFood() {
    const [foodcat, setFoodcat] = useState([]);
    const [food, setFood] = useState([]);
    const [foodslist, setFoodslist] = useState([]);
    const [selectedFoods, setSelectedFoods] = useState([]);

    const loginId = localStorage.getItem("loginId");

      useEffect(() => {
        async function fetchData() {
          const response1 = await axios.get('http://localhost/D_B_D_P/api/User/getfoodcategoryitem');
          setFoodcat(response1.data);
        }
        fetchData();
      }, []);

      

      const optionsforfood = foodcat.map(item => (
        <option key={item.id} value={item.id}>{item.name}</option>
      ));


      useEffect(() => {
        async function fetchData() {
          const response1 = await axios.get(`http://localhost/D_B_D_P/api/User/GetdislikeFood?loginId=`+loginId);
          setSelectedFoods(response1.data);
          console.log("res",response1.data)
        }
        fetchData();
      }, []);



      const handleOptionData2 = async (event) => {
        const id=event.target.value
        setFood(id)
       // console.log("=============isididididididi"+id)
        const response = await axios.get(`http://localhost/D_B_D_P/api/User/GetcategoryfoodForDislike?iid=`+id);
        
        setFoodslist(response.data);
       
      };


      const handleSelectFood = (event, food) => {
        console.log("food",food)
        console.log("selected Food",selectedFoods)
        const isChecked = event.target.checked;
        if (isChecked) {
          setSelectedFoods([...selectedFoods, { ...food }]);
        } else {
          setSelectedFoods(selectedFoods.filter((selectedFood) => selectedFood.Fid !== food.Fid));
        }
        
      };
      
   

        const postToDatabase = async () => {

            try {
              const response = await axios.post("http://localhost/D_B_D_P/api/User/PostDislikeFood?loginId="+loginId,selectedFoods);
              console.log(response.data);
              alert("Data saved successfully!");
            } catch (error) {
              //console.error(error);
              alert("Failed to save data!");
            }
          };



    return (
        <>
        <ResponsiveNavUser/>
        <div className="form-container">
          <table style={{height:"50px"}}>
          <tr>
            <td>
            <div class="box3">
            <tr>
            <h4 style={{}}> <b>Select Food Category </b></h4>
              <td colSpan="3">
                <select value={food} onChange={handleOptionData2}>
                  <option value="">Select Food category</option>
                  {optionsforfood}
                </select>
              </td>
            </tr>
            </div>
            </td>
          </tr>
          
        

            
            </table>

            <div style={{ height: "400px", overflowY: "scroll" }}>
            {foodslist.map((food) => (
              <div key={food.Fid} >
                <div class="container">
                       <input type="checkbox" checked={selectedFoods.some((f) => f.Fid === food.Fid)}
                       //{/* <input type="checkbox" checked={selectedFoods.some(dataList => dataList.Fid === food.Fid)} */}
                              onChange={(event) => handleSelectFood(event, food)} />
                    
                    <div class="box">
                        <div className="circle">
                        {/* <img src={`http://localhost/D_B_D_P/Images1/${food.image}`} alt={food.name} /> */}
                        <img src={`http://localhost/D_B_D_P/Images1/${food.image}`} alt={food.name} />
                        </div>
                    </div>
                    <div class="box1">
                   <h2>{food.name}</h2>
                   <h2>Calories :{food.calories}</h2>
                   </div>
                   
                   <div class="box1">
                          <h2>Unit :{food.unit}</h2>
                          
                             
                          
                   </div>
                   <div class="box">
                    </div>    
                    
              </div>
              
              </div>
            ))}
            </div>   
            <button onClick={postToDatabase}>Dislike Food</button>
    
         </div>
        
        

        </>
    );
};
export default BlockFood;