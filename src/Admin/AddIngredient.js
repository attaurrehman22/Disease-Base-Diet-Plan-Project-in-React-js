


import React,{useEffect,useState} from "react";
import axios from 'axios';
import Navbar from '../Navbar/Navbar'
import { useLocation, useNavigate } from "react-router-dom";
import ResponsiveNavbar from "../ResponsiveNavbar";
function AddIngredient() {
  const navigate = useNavigate()
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: "",
  });
  const name1 = location.state?.name;
  const [ingredientList, setIngredientList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // If editing an existing ingredient, update the ingredient at the editingIndex
    if (editingIndex !== null) {
      setIngredientList([
        ...ingredientList.slice(0, editingIndex),
        formData,
        ...ingredientList.slice(editingIndex + 1),
      ]);
      setEditingIndex(null);
    } else {
      // Add the form data to the ingredient list
      setIngredientList([...ingredientList, formData]);
    }
    // Clear the form data
    setFormData({
      name: "",
      quantity: "",
      unit: "",
    });
  };

  const handleEdit = (index) => {
    // Populate the form inputs with the data for the ingredient at the given index
    setFormData(ingredientList[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    // Remove the ingredient at the given index from the list
    setIngredientList([
      ...ingredientList.slice(0, index),
      ...ingredientList.slice(index + 1),
    ]);
    // Clear the form data
    setFormData({
      name: "",
      quantity: "",
      unit: "",
    });
    // Reset the editingIndex
    setEditingIndex(null);
  };
  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${global.Apipath}D_B_D_P/api/Demo/savingingredient?foodname=` + name1,
        ingredientList
      );
      console.log(response.data); // log the response data to the console
      navigate('/AddFoodItem')
    } catch (error) {
      console.error(error); // log any errors to the console
    }
  };
  
 
  return (
    <>
    <ResponsiveNavbar/>
    
   <div className="container-fluid">
   <div >
     {/* here is code for food name that are come from AddFoodItem Component */}
             <label>Food Name   :   {name1}  </label>


             </div>
      <form  onSubmit={handleSubmit}>
        <input
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Ingredient Name"
          type="text"
        />
        <input
          id="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
          type="text"
        />
        <input
          id="unit"
          value={formData.unit}
          onChange={handleInputChange}
          placeholder="Unit"
          type="text"
        />
        <br/>
        <div class="container">
  <div class="row">
    <div class="col-12 d-md-none">
      <div class="text-right mb-3">
        <button class="btn btn-secondary">Add</button>
      </div>
    </div>
  </div>
</div>

      </form>
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ingredientList.map((ingredient, index) => (
            <tr key={index}>
              <td >{ingredient.name}</td>
              <td >{ingredient.quantity}</td>
              <td >{ingredient.unit}</td>
              <td>
              <button type="button" class="btn btn-primary" onClick={() => handleEdit(index)}><span>Update</span> </button>
                <button  type="button" class="btn btn-danger" onClick={() => handleDelete(index)}><span>Delete</span></button>
              </td>
            </tr>
            
          ))}

<tr>
  <td colspan="2" class="d-sm-flex justify-content-end">
    <button class="btn btn-success" onClick={handleSave}>Save</button>
  </td>
</tr>




         
        </tbody>
      </table>
    
    </div>
    </>
  );
}
export default AddIngredient







