import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import NavbarUser from "../Navbar/NavbarUser";
import ResponsiveNavUser from '../ResponsiveNavUser'
function Userdisease() {

  const navigate = useNavigate()
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const loginId = localStorage.getItem("loginId");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${global.Apipath}/D_B_D_P/api/Demo/userdiseasenamebyloginid?loginId=`+loginId);
        const data = await response.json();
        if (Array.isArray(data)) {
          const userDiseases = data.map(disease => ({ id: disease.id, name: disease.name, loginId: loginId }));
          setCheckedItems(userDiseases);
          //console.log(userDiseases)
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  
    fetch(`${global.Apipath}D_B_D_P/api/User/userdiseasenamegetacute`)
      .then(response => response.json())
      .then(data => setData1(data));
  
    fetch(`${global.Apipath}D_B_D_P/api/User/userdiseasenamechronic`)
      .then(response => response.json())
      .then(data => setData2(data));
  }, [loginId]);
 


  function handleChange(event) {
    const isChecked = event.target.checked;
    const itemId = event.target.id;
    const itemName = event.target.name;
    
    if (isChecked) {
      setCheckedItems([...checkedItems, { id: itemId, name: itemName, loginId: loginId }]);
      console.log(checkedItems)
    } 
    else
     {
     
      const newCheckedItems = checkedItems.filter(item => item.name !== itemName);
      setCheckedItems(newCheckedItems);
      console.log(checkedItems)
    }
  }
  
  


  function renderCheckboxes(data) {
    return data.map(item => (
      <div>
        <input
          key={item.id+item.name}
          type="checkbox"
          id={item.id}
          name={item.name}
          checked={checkedItems.some(checkedItem => checkedItem.name === item.name)}
          onChange={handleChange}
        />
        <h10 htmlFor={item.id}>{item.name}</h10>        
      </div>
      
    ));
    
  }


  function handleSave() {
    fetch(`${global.Apipath}D_B_D_P/api/Demo/UserDisease`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkedItems)
    })
      .then(response => response.json())
      
      .then(data => console.log(data))
      .catch(error => console.error(error));
      navigate("/CreatePlan")
  }
  function handleskip() {
    navigate("/CreatePlan")

  }
  return (
    <>
    <ResponsiveNavUser/>
    
   
 
    <div className="container" style={{ height: "auto", overflowY: "scroll" }}>
    <div className="userdis">
      <h1> <b>Acute</b></h1>
      {renderCheckboxes(data1)}
      </div>
      <div className="userdis">
      <h1><b>Chronic</b></h1>
      {renderCheckboxes(data2)}
      </div>
      </div>
      <div style={{width:"300px",alignSelf:"center"}}>
     
     
      </div>
     
    
    <button type="button" class="btn btn-success" onClick={handleSave}>Save Disease</button>
   
    
    
    </>
  );
}

export default Userdisease;
