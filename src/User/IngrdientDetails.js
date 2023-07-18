import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import NavbarUser from "../Navbar/NavbarUser";
import { Modal } from "react-modal";
import ResponsiveNavUser from '../ResponsiveNavUser'
// import { Modal } from "bootstrap";
// import  Modal  from "react-modal";ls node_modules/react-modalvls node_modules/react-modal
function IngrdientDetails() {


      const navigate = useNavigate()
    const location=useLocation()

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState([]);

  const foodid1 = new URLSearchParams(location.search).get("foodid1");

  const openModal = async () => {
  setModalIsOpen(true);
  try {
    const result = await axios.get('http://localhost/D_B_D_P/api/User/ingredientdetailsget?iid=' + foodid1);
    setModalData(result.data);
  } catch (error) {
    // Handle error
  }
};


const closeModal = () => {
  setModalIsOpen(false);
};

<Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
  <h2>Modal Content</h2>
  {/* Display the fetched data */}
  {modalData.map(item => (
    <div key={item.id}>
      <p>Name: {item.name}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Unit: {item.unit}</p>
    </div>
  ))}
  <button onClick={closeModal}>Close Modal</button>
</Modal>

const handleDetails = () => {
  openModal();
};

          
  
    return (
        <>
        <ResponsiveNavUser />
        <div className="form-container">
        {/* ... */}
        {/* <button onClick={handlesback}>Back</button> */}
        <button onClick={handleDetails}>Details</button>
      </div>

      {/* Add the Modal component here */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {/* Modal Content */}
      </Modal>
        
        </>
         );
}

export default IngrdientDetails;





// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from 'axios';
// import NavbarUser from "../Navbar/NavbarUser";
// function IngrdientDetails() {

//     const navigate = useNavigate()
//     const location=useLocation()
  
//     const foodid1 = new URLSearchParams(location.search).get("foodid1");
//   const foodname1 = new URLSearchParams(location.search).get("foodname1");
//   const pagename = new URLSearchParams(location.search).get("pagename");


//   const name1 = new URLSearchParams(location.search).get("name1");
//   const calories1 = new URLSearchParams(location.search).get("calories1");
//   const days1 = new URLSearchParams(location.search).get("days1");
//   const categ = new URLSearchParams(location.search).get("cate");
//   console.log("Recieved from Plan Details of category="+categ)
//   console.log(foodname1)
//   console.log(foodid1)
//   console.log(pagename)
 
//     const [data, setData] = useState([]);
//     useEffect(() => {
//         const fetchData = async () => {
//           const result = await axios.get('http://localhost/D_B_D_P/api/User/ingredientdetailsget?iid='+foodid1);
//           setData(result.data);
//         };
//         fetchData();
//       }, []);
      



//       const [detailsData, setDetailsData] = useState([]);
//   const fetchDetailsData = async () => {
//     const result = await axios.get('http://localhost/D_B_D_P/api/User/ingredientdetailsget?iid='+foodid1);
//     setDetailsData(result.data);
//   };
//   const handleDetails = () => {
//     fetchDetailsData();
//     console.log(detailsData)
//     const alertTable = (
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Quantity</th>
//             <th>Unit</th>
//           </tr>
//         </thead>
//         <tbody>
//           {detailsData.map(item => (
//             <tr key={item.id}>
//               <td>{item.name}</td>
//               <td>{item.quantity}</td>
//               <td>{item.unit}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
//      console.log(alertTable)
//     window.alert(alertTable);

    
//     // alert(JSON.stringify(detailsData));
//   };


//       function handlesback() {
//         if(pagename==="viewpldet")
//         {
//           navigate("/ViewPlanDetails")
//         }
//         else
//         {
//           navigate(`/PlanDetails?name1=${name1}&calories1=${calories1}&days1=${days1}&cate=${categ}`);
          
//         }
       
    
//       }
//     return (
//         <>
//         <NavbarUser />
//         <div className="form-container">
          
//         <h1 style={{textAlign:"center"}}>Ingredients of  {foodname1}</h1>
//         <div className="container">
//         <div className="boxforingdet" style={{alignItems:"center", height: "500px", overflowY: "scroll"  }}>
           
//         <table className="boxforingdet">
//             <tr>
//             <th><h2>Name</h2></th>
//             <th><h2>Quantity</h2></th>
//             <th><h2>Unit</h2></th>
//             </tr>
//             {data.map(item => (
//           <tr key={item.id}>
//             <td>{item.name}</td>
//             <td>{item.quantity}</td>
//             <td>{item.unit}</td>
            
//           </tr>
//         ))}
            
//         </table>
//         </div> 
//         </div>
//         <button onClick={handlesback}>Back</button>
//         <button onClick={handleDetails}>Details</button>
      
//       </div>
//         </>
//          );
// }

// export default IngrdientDetails;