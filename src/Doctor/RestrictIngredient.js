import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavbarDoctor from "../Navbar/NavbarDoctor";
import ResponsiveNavDoctor from "../ResponsiveNavDoctor";
import Modal from "react-modal";

function RestrictIngredient() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [age, setAge] = useState('');
  const [food, setFood] = useState('');
  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [data1, setData1] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [foodlist,setFoodslist]=useState([]);
  const [food1, setFood1] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${global.Apipath}/D_B_D_P/api/Doctor/getingredientname`);
      const response1 = await axios.get(`${global.Apipath}/D_B_D_P/api/Doctor/getingredientunit`);
      const response2 = await axios.get(`${global.Apipath}/D_B_D_P/api/User/getfoodcategoryitem`);
      setData(response.data);
      setData2(response1.data);
      setData3(response2.data);
      console.log("response of data data3",data3)
    }
    fetchData();
  }, []);

  const handleFoodcategory = async (event) => {
    console.log("event", event);
    const id = event.target.options[event.target.selectedIndex].value;
    setFood1(id);
    console.log("food", id);
    const response = await axios.get(`${global.Apipath}/D_B_D_P/api/Doctor/getcategoryfood?iid=` + id);
    setFoodslist(response.data);
    console.log("foodlist data", foodlist);
  };
  


  const name1 = location.state?.name;
  const options = data.map(item => (
    <option key={item.id} value={item.id}>{item.name}</option>
  ));

  const options2 = data2.map(item => (
    <option key={item.id} value={item.id}>{item.name}</option>
  ));

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTableData = [...tableData];
    newTableData.push({
      name: name,
      quantity: quantity,
      unit: age
    });
    setTableData(newTableData);
    setName('');
    setQuantity('');
    setAge('');
  }

  const handleDelete = (index) => {
    const newTableData = [...tableData];
    newTableData.splice(index, 1);
    setTableData(newTableData);
  }

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${global.Apipath}/D_B_D_P/api/Demo/restrictingredient12?diseasename=` + name1,
        tableData
      );
      alert("data saved Successfully")
      navigate('/AddDisease')
    } catch (error) {
      console.error(error); // log any errors to the console
    }
  }

  const tableRows = tableData.map((item, index) => (
   
    <tr key={index}>
      <td >{editIndex === index ? <select  value={name} onChange={event => setName(event.target.value)}>{options}</select> : item.name}</td>
      <td>{editIndex === index ? <input type="text" value={quantity} onChange={event => setQuantity(event.target.value)} /> : item.quantity}</td>
      <td>{editIndex === index ? <select  value={age} onChange={event => setAge(event.target.value)}>{options2}</select> : item.unit}</td>
      <td>
        {editIndex === index ? (
          <button  class="btn btn-success"  onClick={() => {
            const newTableData = [...tableData];
            newTableData[editIndex] = {
              name: name,
              quantity: quantity,
              unit: age
            };
            setTableData(newTableData);
            setEditIndex(null);
          }}> <span>Save</span></button>
        ) : (
          <button type="button" class="btn btn-secondary"  onClick={() => setEditIndex(index)}><span>Edit</span>
</button>
        )}
        <button type="button" class="btn btn-danger" onClick={() => handleDelete(index)}><span>Delete</span></button>
      </td>
    </tr>
   
  ));



  const handleCheckboxChange = (event, itemId) => {
    console.log("itemid",itemId)
    if (event.target.checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== itemId));
    }
  };



  const openModal = async () => {
    // const response = await axios.get(`${global.Apipath}/D_B_D_P/api/User/getfoodcategoryitem`);
    // setFoodslist(response.data);
    setModalIsOpen(true);

  };

  const closeModal = async () => {
    console.log("selected items",selectedItems)
    console.log("name1",name1)
   
    try {
      await axios.post(
        `${global.Apipath}/D_B_D_P/api/Doctor/Blockfoodbydoctor?name1=`+name1,
        selectedItems
      );
      alert("Food Block successfully!");
    } catch (error) {
      console.error(error);
    }
    setModalIsOpen(false);
  };



  const optionsforfood = data3.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));

  return (
    <>
      <ResponsiveNavDoctor />
      <div >
        
      <tr> <label>Disease Name   :   {name1}  </label></tr>
      <tr>    <div>
          <button  type="button" class="btn btn-danger" onClick={openModal}><span>Block Foods</span></button>
          </div>
          </tr>
         
        <div >
            
          <form  onSubmit={handleSubmit}>
       
         
         
            <ul>


              <label>Ingredient
                <select  
                value={name} 
                onChange={event => setName(event.target.value)}>
                {options}
                </select> 
              </label>
           
            <input 
              type="text"
              id="quantity"
              name="quantity"
              value={quantity}
              placeholder="Quantity"
              onChange={event => setQuantity(event.target.value)}
            />
             
            
              <label>Select unit
                <select value={age} onChange={event => setAge(event.target.value)}>{options2}</select></label>
            </ul>
      
            <button  class="btn btn-success" >  <span>Add</span></button>
           
           
          </form>
        </div>
        <div > 
     <div >
        <table>
          <thead>
            <tr>
              <th >Ingredient</th>
              <th >Quantity</th>
              <th >Unit</th>
              <th >Delete</th>
            </tr>
          </thead>
          <tbody >
            {tableRows}
          </tbody>
          <button type="button" class="btn btn-success" onClick={handleSave}>Save</button>
        </table>
        </div>
       </div>
       

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>

        <h5> Block Food For Pneumonia  </h5>
        <td></td>
        <td></td>
        <select className="form-select" value={food1} onChange={handleFoodcategory}>
        <options value="">Select Food category</options>
        {optionsforfood}
      </select>


        <div>
      <h1> </h1>
      {foodlist.map(item => (
        <div key={item.id}>
          <div  >
          <td>
                    <div>
          <label>
            <input
              type="checkbox"
              value={item.name}
              checked={selectedItems.includes(item.Fid)}
              onChange={event => handleCheckboxChange(event, item.Fid)}
            />
            
          
          </label>
          </div>
          </td>
                    <td style={{ width: '8%' }}>
          <div className="circle">
            <img
              src={`${global.Apipath}/D_B_D_P/Images1/${item.image}`}
              alt={food.name}
            />
          </div>
        </td>
        <td>
          <h2 className="food-name">{item.name}</h2>
          <h2 className="food-name">Calories: {item.calories}</h2>
        </td>
        <td>
          <h2 className="food-name">Unit: {item.unit}</h2>
         
        </td>
          </div>
        </div>
      ))}
      </div>
      <button type="button" class="btn btn-danger" onClick={closeModal}>Block Foods</button>
     
    </Modal>

      </div>
    </>
  );
}
export default RestrictIngredient;
