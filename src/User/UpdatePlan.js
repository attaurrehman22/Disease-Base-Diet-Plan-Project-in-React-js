import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NavbarUser from "../Navbar/NavbarUser";
import { color } from "framer-motion";
import ResponsiveNavUser from '../ResponsiveNavUser';

export const UpdatePlan = (props) => {
  const location = useLocation();
  const loginId = localStorage.getItem("loginId");
  const navigate = useNavigate();
  const name1 = new URLSearchParams(location.search).get("name1");

  const [planData, setPlanData] = useState([]);
  const [updatedName, setUpdatedName] = useState('');
  const [calories, setCalories] = useState(0);
  const [noOfDays, setNoOfDays] = useState(0);
  const [originalName, setOriginalName] = useState('');
  const [userId, setUserId] = useState(0);
  const [updateMessage, setUpdateMessage] = useState('');

  // Fetch plan data for update
  const fetchPlanForUpdate = async () => {
    try {
      const response = await axios.get(`${global.Apipath}/D_B_D_P/api/User/GetPlanforUpdate?name=${name1}&id=${loginId}`);
      const plan = response.data[0];
      setPlanData(plan);
      setUpdatedName(plan.name);
      setCalories(plan.calories);
      setNoOfDays(plan.noofdays);
    } catch (error) {
      console.error(error);
    }
  };

  // Update plan data
  const updatePlan = async () => {
    try {
      const response = await axios.get(
        `${global.Apipath}/D_B_D_P/api/User/UpdatePlan?updatedname=${updatedName}&calories=${calories}&noofdays=${noOfDays}&name=${name1}&id=${loginId}`
      );
      setUpdateMessage(response.data);
      navigate(`/UpdatePlanDetails?name1=${updatedName}&calories1=${calories}&days1=${noOfDays}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPlanForUpdate();
  }, []);

  return (
    <>
      <ResponsiveNavUser />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="form-group">
              {planData ? (
                <>
                  <label htmlFor="updatedName">Update Plan Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="updatedName"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    required
                  />
                  <br />
                  <label htmlFor="calories">Update Plan Calories</label>
                  <input
                    type="number"
                    className="form-control"
                    id="calories"
                    value={calories}
                    onChange={(e) => setCalories(Number(e.target.value))}
                    required
                  />
                  <br />
                  <label htmlFor="noOfDays">Update Number of Days</label>
                  <input
                    type="number"
                    className="form-control"
                    id="noOfDays"
                    value={noOfDays}
                    onChange={(e) => setNoOfDays(Number(e.target.value))}
                    required
                  />
                  <br />
                </>
              ) : (
                <p>No plan data available.</p>
              )}
              <button className="btn btn-primary" onClick={updatePlan}>Update Plan</button>
              {updateMessage && <p>{updateMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
