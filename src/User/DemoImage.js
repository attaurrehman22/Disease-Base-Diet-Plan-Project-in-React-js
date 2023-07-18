import React,{useEffect,useState} from "react";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavbarDoctor from "../Navbar/NavbarDoctor";

function DemoImage() {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost/D_B_D_P/api/Demo/CreateProductWithImage', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to create product');
      }
      const newProduct = await response.json();
      console.log('New product created:', newProduct);
      setName('');
      setDescription('');
      setPrice('');
      setImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </label>
      <label>
        Image:
        <input type="file" onChange={(event) => setImage(event.target.files[0])} />
      </label>
      <button type="submit">Create Product</button>
    </form>
  );


 
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //   async function fetchData() {
    //     const response = await fetch('http://localhost/D_B_D_P/api/User/demoimageget');
    //     const jsonData = await response.json();
    //     setData(jsonData);
    //   }
    //   fetchData();
    // }, []);
  
    // return (
    //   <div>
    //     <h1>Images</h1>
    //     <ul>
    //       {data.map(item => (
    //         <li key={item.name}>
    //           <img src={item.name} alt="food" />
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // );



//     const [imageList, setImageList] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost/D_B_D_P/api/User/demoimageget')
//       .then(response => {
//         setImageList(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <>
//     <p> images </p>
//     <div>
//       {imageList.map(image => (
//         <div key={image.id}>
//           <h2>{image.title}</h2>
//           <img src={`data:image/png;base64,${image.data}`} alt={image.title} />
//         </div>
//       ))}
//     </div>
//     </>
//   );
}
export default DemoImage