// import React, { useState } from 'react';
// import ResponsiveNavbar from '../ResponsiveNavbar'
// import { Link, useNavigate } from "react-router-dom";


// const AddFoodItem = () => {
//   const navigate = useNavigate()
//   const [name, setName] = useState('');
//   const [calories, setCalories] = useState('');
//   const [category, setCategory] = useState('');
//   const [unit, setUnit] = useState('');
//   const [image, setImage] = useState(null);

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('calories', calories);
//     formData.append('category', category);
//     formData.append('unit', unit);
//     formData.append('image', image);

//     try {
//       const response = await fetch('http://localhost/D_B_D_P/api/Admin/addfooditem', {
//         method: 'POST',
//         body: formData,
//       });
      

//       // console.log('Food item added successfully',response.result);
//       if (response.ok) {
//         const data = await response.json();
//   console.log(data);
//         if (data==="Exist")
//         {
//           alert("Name Already Exists")
//               navigate('/AddFoodItem')
//         }
//         else
//         {
//     // Food item added successfully
//     console.log('Food item added successfully');
//     // Reset form fields
//      setName('');
//      setCalories('');
//      setCategory('');
//      setUnit('');
//      setImage(null);
//      navigate('/AddIngredient', { state: { name } });
//         }
    
//       } else {
//         // Handle error response
//         console.log('Error:', response.status);
//         // Show appropriate error message to the user
//       }
//     } catch (error) {
//       console.log('Error:', error.message);
//       // Show appropriate error message to the user
//     }
//   };

//   return (
//     <>
//     <ResponsiveNavbar />
//     <div className="form-container">
//     <form className="form-container" onSubmit={handleFormSubmit}>
//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Calories"
//         value={calories}
//         onChange={(e) => setCalories(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Category"
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Unit"
//         value={unit}
//         onChange={(e) => setUnit(e.target.value)}
//       />
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setImage(e.target.files[0])}
//       />
//       <button type="submit">Add Food Item</button>
//     </form>
//       </div>
//     </>
   
//   );
// };

// export default AddFoodItem;









import React, { useState } from 'react';
import ResponsiveNavbar from '../ResponsiveNavbar'
import { Link, useNavigate } from "react-router-dom";


const AddFoodItem = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [category, setCategory] = useState('');
  const [unit, setUnit] = useState('');
  const [image, setImage] = useState(null);
  const [season, setSeason] = useState('winter');



  const handleChange = (event) => {

    // setSelectedFoods([])
    setSeason(event.target.value);
    console.warn("season",season)
    console.warn("season",event.target.value)
    
  }


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let res;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('calories', calories);
    formData.append('category', category);
    formData.append('unit', unit);
    formData.append('image', image);
    formData.append('season', season);
    try {
      const response = await fetch(`${global.Apipath}D_B_D_P/api/Admin/addfooditem`, {
        method: 'POST',
        body: formData,
      });
      res=response.data;
     console.log("response-------------------------------",response.data)
      if (response.status===200) {
        const data = await response.json();
        if (data === "Exist") {
          alert("Name Already Exists")
          navigate('/AddIngredient', { state: { name } });
        } else {
          console.log('Food item added successfully');
          setName('');
          setCalories('');
          setCategory('');
          setUnit('');
          setImage(null);
          navigate('/AddIngredient', { state: { name } });
        }
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      navigate('/AddIngredient', { state: { name } });
      console.log("response-------------------------------",res)
      console.log('Error:', error.message);
    }
  };

  return (
    <>
      <ResponsiveNavbar />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Calories"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Unit"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                />
              </div>

              <td className="dropdown3">
                <label> Select Season </label>
    <select className="quantity-input" value={season} onChange={handleChange}>
      <option value="winter">Winter</option>
      <option value="summer">Summer</option>
      <option value="both">Both</option>
    </select>
  </td>

              <div className="form-group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <button type="submit" className="btn btn-primary">Add Food Item</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFoodItem;

