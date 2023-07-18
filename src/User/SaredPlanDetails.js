import React, { useState, useEffect } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import NavbarUser from "../Navbar/NavbarUser";
import { color } from "framer-motion";
import ResponsiveNavUser from '../ResponsiveNavUser'
import  Modal  from "react-modal";
import 'bootstrap/dist/css/bootstrap.css'

export const SaredPlanDetails = (props) => {
    const location = useLocation();

    const [plancal, setPlancal] = useState(0);
    const [foods, setFoods] = useState([]);
    const [planname, setPlanname] = useState('');
    const [sharedby, setSharedby] = useState('');


    const [planDetails, setPlanDetails] = useState([]);
   
    
  const [days, setDays] = useState([]);


    const plainid = new URLSearchParams(location.search).get("did");
    const name1 = new URLSearchParams(location.search).get("name1");


    const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [ingredientData, setIngredientData] = useState(null);

  const handleDetailsClick = async (food) => {
    setSelectedFood(food);
    console.log("food in ======================",food)
    try {
      const response = await fetch(`http://localhost/D_B_D_P/api/User/ingredientdetailsget?iid=${food.fid}`);
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


  useEffect(() => {
    fetch(`http://localhost/D_B_D_P/api/User/Getsharedplancal?plainid=${plainid}`)
      .then(response => response.json())
      .then(data => {
        setPlancal(data.Calories);
        setPlanname(data.Names);
        setSharedby(data.Uname);
      })
      .catch(error => console.error(error));
  }, []);





  useEffect(() => {
      fetch(`http://localhost/D_B_D_P/api/User/Viewsharedplandetails?plainid=${plainid}`)
        .then(response => response.json())
        .then(data => setPlanDetails(data))
        .catch(error => console.error(error));
  })


    return (
        <>
     <ResponsiveNavUser />
    
     <div className="form-container">
  <div className="form-box1">
    <table className="table">
      <tr>
        <td>
          <h4>Plan Name: {planname}</h4>
        </td>
        <td>
          <h4>Plan Calories: {plancal}</h4>
        </td>
        <td>
          <h4>Shared By: {sharedby}</h4>
        </td>
      </tr>
      <br />
    </table>
  </div>

  <div className="table-responsive">
    <table className="table">
      <thead>
        <tr className="fw-bold fs-4">
          <th style={{color:"white"}}></th>
          <th style={{color:"white"}}>Name</th>
          <th style={{color:"white"}}>Calories</th>
          <th style={{color:"white"}}>Unit</th>
          <th style={{color:"white"}}>Quantity</th>
          <th style={{color:"white"}}></th>
        </tr>
      </thead>
      <tbody>
        {planDetails.map((detail, index) => (
          <tr
            className="bg-black text-white fw-bold"
            key={index}
          >
            <div className="circle">
              <td>
                <img
                  src={`http://localhost/D_B_D_P/Images1/${detail.fimage}`}
                  alt={detail.fname}
                />
              </td>
            </div>
            <td>{detail.fname}</td>
            <td>{detail.fcalories}</td>
            <td>{detail.funit}</td>
            <td>{detail.quantity}</td>
            <td>{detail.fcategory}</td>
            <div className="box">
              <td>
              <button onClick={() => handleDetailsClick(detail)} className="custom-btn-size">
  <span className="d-flex align-items-center justify-content-center">Details</span>
</button>



              </td>
            </div>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div>
    {selectedFood && (
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2 className="text-center">
          <b>Ingredients Of {selectedFood.name}</b>
        </h2>

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

        <button className="btn btn-primary" onClick={closeModal}>
          Close
        </button>
      </Modal>
    )}
  </div>
</div>


    </>
    )
}
