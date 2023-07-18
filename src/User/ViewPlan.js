// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { color } from "framer-motion";
// import ResponsiveNavUser from '../ResponsiveNavUser'
// import Modal from "react-modal";

// export const ViewPlan = (props) => {
//   const loginId = localStorage.getItem("loginId");
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [active, setActive] = useState([]);
//   const [activatedPlan, setActivatedPlan] = useState(null);
//   const [activeButton, setActiveButton] = useState(null);
//   const [share, setShare] = useState(null);
//   const [activeplanday, setActiveplanDay] = useState(0);

//   useEffect(() => {
//     fetch(`${global.Apipath}/D_B_D_P/api/User/Getactivedayplan?User_id=${loginId}`)
//       .then(response => response.json())
//       .then(data => setActiveplanDay(data))
//       .catch(error => console.error(error));
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios.get(
//         `${global.Apipath}/D_B_D_P/api/User/viewplan?id=` + loginId
//       );
//       setData(result.data);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios.get(
//         `${global.Apipath}/D_B_D_P/api/User/getactiveplanname?id=` + loginId
//       );
//       setActive(result.data);
//       console.log("Result of get api for activeplan = " + result.data)
//       if (result.data === "null") {
//         setActiveButton(null);
//       } else {
//         setActiveButton(result.data);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleClick = (name) => {
//     setActivatedPlan(name);
//   };

//   const handleClick1 = (name) => {
//     console.log("name=" + name)
//     setActivatedPlan(name);
//     axios.post(`${global.Apipath}/D_B_D_P/api/User/ActivePlan`, { name, loginId })
//       .then((response) => {
//         console.log("Plan activated:", response.data);
//       })
//       .catch((error) => {
//         console.log("Error activating plan:", error);
//       });
//     setActiveButton(name);
//     setActivatedPlan(null);
//   };

//   const handleClick2 = (name) => {
//     if (name === activeButton) {
//       axios.post(`${global.Apipath}/D_B_D_P/api/User/DeActivePlan`, { name, loginId })
//         .then((response) => {
//           console.log("Plan deactivated:", response.data);
//         })
//         .catch((error) => {
//           console.log("Error deactivating plan:", error);
//         });
//       setActiveButton(null);
//     }
//     setActivatedPlan(null);
//   };

//   const handleView = (name) => {
//     const name1 = { name };
//     navigate(`/ViewPlanDetails?name1=${name}`);
//   };

//   const handleUpdate = (name) => {
//     const name1 = { name };
//     navigate(`/UpdatePlan?name1=${name}`);
//   };




//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [usernameforshareplan, setUsernameforshareplan] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [nameofshare, setNameofshare] = useState('');
//  useEffect(() => {
//     fetch(`${global.Apipath}/D_B_D_P/api/User/Nameofuserforshareplan`)
//       .then(response => response.json())
//       .then(data => setUsernameforshareplan(data))
//       .catch(error => console.error(error));
//   }, []);

//   useEffect(()=>
//   {
//     console.log("data of username",usernameforshareplan)
//   })


//   const handleCheckboxChange = (event, itemId) => {

//     console.log("itemid",itemId)
//     if (event.target.checked) {
//       setSelectedItems([...selectedItems, itemId]);
//     } else {
//       setSelectedItems(selectedItems.filter(item => item !== itemId));
//     }
//   };


//   const Allusercheck = () => {
//     const allUsernames = usernameforshareplan.map(uname => uname.name);
//     setSelectedItems(allUsernames);
//   };
  
//   const openModal = (name) => {
//     // debugger
//     setNameofshare(name)
//     setModalIsOpen(true);
//   };
  
  
//   const closeModal = async () => {
//     console.log("selected items", selectedItems);
//     console.log("nameofshare", nameofshare);
//     console.log("loginid", loginId);
  

//     try {
     
//       const response = await axios.post(`${global.Apipath}/D_B_D_P/api/User/demo`,{ nameofshare, loginId,selectedItems });
   
//       alert("Update Plan successfully");
//     } catch (error) {
    
//       alert("Failed to save data!");
//     }


  
//     setModalIsOpen(false);
//   };



//   return (
//     <>
//       <ResponsiveNavUser />
//       <div>
//         <h2>
//           Your active plan day is {activeplanday}
//         </h2>
//         {data.map((item) => (
//           <div key={item.id}>
//             <button onClick={() => handleClick(item.name)} style={{ color: "white", backgroundColor: "grey", width: "100%", backgroundColor: activeButton === item.name ? "green" : "grey" }}>
//               {item.name}
//             </button>
//             {activatedPlan === item.name && (
//               <div>
//                 {activeButton === item.name ? (
//                   <>
//                     <button onClick={() => handleClick2(item.name)} style={{ backgroundColor: "red" }}>Deactivate</button>
//                   </>
//                 ) : (
//                   <>
//                     <button onClick={() => handleClick1(item.name)} style={{ backgroundColor: "green" }}>Activate</button>
//                   </>
//                 )}
//                 <button onClick={() => handleView(item.name)} style={{ backgroundColor: "blue" }}>View Plan</button>
//                 <button onClick={() => handleUpdate(item.name)} style={{ backgroundColor: "blue" }}>Update Plan</button>

//                <button onClick={() => openModal(item.name)}  style={{ backgroundColor: "blue" }}>Share Plan</button>     
               
//               </div>
//             )}
//           </div>
//         ))}







// <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
//         <div >
//       <h2 > <b>Choose for Shared Plan</b></h2>
//       <button onClick={Allusercheck}>Select All</button>
//       {usernameforshareplan.map(item => (
//         <div key={item.id}>
//           <div >
          
//                     <div>
//           <label>
//             <input
//               type="checkbox"
//               value={item.name}
//               checked={selectedItems.includes(item.name)}
//               onChange={event => handleCheckboxChange(event, item.name)}
//             />
            
          
//           </label>
//           </div>
         
//           <div >
//             <h2>
//               {item.name}
//             </h2>
          
//           </div>
         
            
//           </div>
//         </div>
//       ))}
//       </div>
//       <button  onClick={closeModal}>Share Plan</button>
     
//     </Modal>




//       </div>
//     </>
//   );
// };






// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import ResponsiveNavUser from '../ResponsiveNavUser'
// import Modal from "react-modal";

// export const ViewPlan = (props) => {
//   const loginId = localStorage.getItem("loginId");
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [active, setActive] = useState([]);
//   const [activatedPlan, setActivatedPlan] = useState(null);
//   const [activeButton, setActiveButton] = useState(null);
//   const [share, setShare] = useState(null);
//   const [activeplanday, setActiveplanDay] = useState(0);

//   useEffect(() => {
//     fetch(`${global.Apipath}/D_B_D_P/api/User/Getactivedayplan?User_id=${loginId}`)
//       .then(response => response.json())
//       .then(data => setActiveplanDay(data))
//       .catch(error => console.error(error));
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios.get(
//         `${global.Apipath}/D_B_D_P/api/User/viewplan?id=` + loginId
//       );
//       setData(result.data);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios.get(
//         `${global.Apipath}/D_B_D_P/api/User/getactiveplanname?id=` + loginId
//       );
//       setActive(result.data);
//       console.log("Result of get api for activeplan = " + result.data)
//       if (result.data === "null") {
//         setActiveButton(null);
//       } else {
//         setActiveButton(result.data);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleClick = (name) => {
//     setActivatedPlan(name);
//   };

//   const handleClick1 = (name) => {
//     console.log("name=" + name)
//     setActivatedPlan(name);
//     axios.post(`${global.Apipath}/D_B_D_P/api/User/ActivePlan`, { name, loginId })
//       .then((response) => {
//         console.log("Plan activated:", response.data);
//       })
//       .catch((error) => {
//         console.log("Error activating plan:", error);
//       });
//     setActiveButton(name);
//     setActivatedPlan(null);
//   };

//   const handleClick2 = (name) => {
//     if (name === activeButton) {
//       axios.post(`${global.Apipath}/D_B_D_P/api/User/DeActivePlan`, { name, loginId })
//         .then((response) => {
//           console.log("Plan deactivated:", response.data);
//         })
//         .catch((error) => {
//           console.log("Error deactivating plan:", error);
//         });
//       setActiveButton(null);
//     }
//     setActivatedPlan(null);
//   };

//   const handleView = (name) => {
//     const name1 = { name };
//     navigate(`/ViewPlanDetails?name1=${name}`);
//   };

//   const handleUpdate = (name) => {
//     const name1 = { name };
//     navigate(`/UpdatePlan?name1=${name}`);
//   };

//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [usernameforshareplan, setUsernameforshareplan] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [nameofshare, setNameofshare] = useState('');

//   useEffect(() => {
//     fetch(`${global.Apipath}/D_B_D_P/api/User/Nameofuserforshareplan`)
//       .then(response => response.json())
//       .then(data => setUsernameforshareplan(data))
//       .catch(error => console.error(error));
//   }, []);

//   useEffect(() => {
//     console.log("data of username", usernameforshareplan)
//   })

//   const handleCheckboxChange = (event, itemId) => {
//     console.log("itemid", itemId)
//     if (event.target.checked) {
//       setSelectedItems([...selectedItems, itemId]);
//     } else {
//       setSelectedItems(selectedItems.filter(item => item !== itemId));
//     }
//   };

//   const Allusercheck = () => {
//     const allUsernames = usernameforshareplan.map(uname => uname.name);
//     setSelectedItems(allUsernames);
//   };

//   const openModal = (name) => {
//     // debugger
//     setNameofshare(name)
//     setModalIsOpen(true);
//   };

//   const closeModal = async () => {
//     console.log("selected items", selectedItems);
//     console.log("nameofshare", nameofshare);
//     console.log("loginid", loginId);

//     try {
//       const response = await axios.post(`${global.Apipath}/D_B_D_P/api/User/demo`, { nameofshare, loginId, selectedItems });
//       alert("Update Plan successfully");
//     } catch (error) {
//       alert("Failed to save data!");
//     }

//     setModalIsOpen(false);
//   };

//   return (
//     <>
//       <ResponsiveNavUser />
//       <div className="container">
//         <h2>Your active plan day is {activeplanday}</h2>


        

//         {data.map((item) => (
//   <div key={item.id}>
//     <tr>
//       <td>
//         <button style={{ width: '100%' }}
//           onClick={() => handleClick(item.name)}
//           className={`btn ${activeButton === item.name ? 'btn-success' : 'btn-secondary'}`}
          
//         >
//           {item.name}
//         </button>
//         <br />
//       </td>
//     </tr>
//     {activatedPlan === item.name && (
//       <div>
//         {activeButton === item.name ? (
//           <>
//             <button onClick={() => handleClick2(item.name)} className="btn btn-danger" style={{ width: '100%' }}>
//               Deactivate
//             </button>
//           </>
//         ) : (
//           <>
//             <button onClick={() => handleClick1(item.name)} className="btn btn-success" style={{ width: '100%' }}>
//               Activate
//             </button>
//           </>
//         )}
//         <button onClick={() => handleView(item.name)} className="btn btn-primary" style={{ width: '100%' }}>
//           View Plan
//         </button>
//         <button onClick={() => handleUpdate(item.name)} className="btn btn-primary" style={{ width: '100%' }}>
//           Update Plan
//         </button>
//         <button onClick={() => openModal(item.name)} className="btn btn-primary" style={{ width: '100%' }}>
//           Share Plan
//         </button>
//       </div>
//     )}
//   </div>
// ))}





//         <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2 className="modal-title"><b>Choose for Shared Plan</b></h2>
//               <button type="button" className="btn btn-secondary" onClick={Allusercheck}>Select All</button>
//             </div>
//             <div className="modal-body">
//               {usernameforshareplan.map(item => (
//                 <div key={item.id}>
//                   <div className="form-check">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       value={item.name}
//                       checked={selectedItems.includes(item.name)}
//                       onChange={event => handleCheckboxChange(event, item.name)}
//                     />
//                     <label className="form-check-label">
//                       {item.name}
//                     </label>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-primary" onClick={closeModal}>Share Plan</button>
//             </div>
//           </div>
//         </Modal>
//       </div>
//     </>
//   );
// };












import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarUser from "../Navbar/NavbarUser";
import { color } from "framer-motion";
import ResponsiveNavUser from '../ResponsiveNavUser'
import Modal from "react-modal";

export const ViewPlan = (props) => {
  const loginId = localStorage.getItem("loginId");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [active, setActive] = useState([]);
  const [activatedPlan, setActivatedPlan] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [share, setShare] = useState(null);
  const [activeplanday, setActiveplanDay] = useState(0);

  useEffect(() => {
    fetch(`${global.Apipath}/D_B_D_P/api/User/Getactivedayplan?User_id=${loginId}`)
      .then(response => response.json())
      .then(data => setActiveplanDay(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `${global.Apipath}/D_B_D_P/api/User/viewplan?id=` + loginId
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `${global.Apipath}/D_B_D_P/api/User/getactiveplanname?id=` + loginId
      );
      setActive(result.data);
      console.log("Result of get api for activeplan = " + result.data)
      if (result.data === "null") {
        setActiveButton(null);
      } else {
        setActiveButton(result.data);
      }
    };
    fetchData();
  }, []);

  const handleClick = (name) => {
    setActivatedPlan(name);
  };

  const handleClick1 = (name) => {
    console.log("name=" + name)
    setActivatedPlan(name);
    axios.post(`${global.Apipath}/D_B_D_P/api/User/ActivePlan`, { name, loginId })
      .then((response) => {
        console.log("Plan activated:", response.data);
      })
      .catch((error) => {
        console.log("Error activating plan:", error);
      });
    setActiveButton(name);
    setActivatedPlan(null);
  };

  const handleClick2 = (name) => {
    if (name === activeButton) {
      axios.post(`${global.Apipath}/D_B_D_P/api/User/DeActivePlan`, { name, loginId })
        .then((response) => {
          console.log("Plan deactivated:", response.data);
        })
        .catch((error) => {
          console.log("Error deactivating plan:", error);
        });
      setActiveButton(null);
    }
    setActivatedPlan(null);
  };

  const handleView = (name) => {
    const name1 = { name };
    navigate(`/ViewPlanDetails?name1=${name}`);
  };

  const handleUpdate = (name) => {
    const name1 = { name };
    navigate(`/UpdatePlan?name1=${name}`);
  };




  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [usernameforshareplan, setUsernameforshareplan] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [nameofshare, setNameofshare] = useState('');
 useEffect(() => {
    fetch(`${global.Apipath}/D_B_D_P/api/User/Nameofuserforshareplan`)
      .then(response => response.json())
      .then(data => setUsernameforshareplan(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(()=>
  {
    console.log("data of username",usernameforshareplan)
  })


  const handleCheckboxChange = (event, itemId) => {

    console.log("itemid",itemId)
    if (event.target.checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== itemId));
    }
  };


  const Allusercheck = () => {
    const allUsernames = usernameforshareplan.map(uname => uname.name);
    setSelectedItems(allUsernames);
  };
  
  const openModal = (name) => {
    // debugger
    setNameofshare(name)
    setModalIsOpen(true);
  };
  
  
  const closeModal = async () => {
    console.log("selected items", selectedItems);
    console.log("nameofshare", nameofshare);
    console.log("loginid", loginId);
  

    try {
      // axios.post("${global.Apipath}/D_B_D_P/api/User/DeActivePlan", { name, loginId })
      const response = await axios.post(`${global.Apipath}/D_B_D_P/api/User/demo`,{ nameofshare, loginId,selectedItems });
      //console.log(response.data);
      alert("Update Plan successfully");
    } catch (error) {
      //console.error(error);
      alert("Failed to save data!");
    }
    setModalIsOpen(false);
  };
  
  
  



  return (
    <>
      <ResponsiveNavUser />
      <div className="form-container" style={{ height: "700px", overflowY: "scroll" }}>
        <h2 style={{ textAlign: "center", color: "black" }}>
          {/* Your active plan day is {activeplanday} */}
        </h2>
        {data.map((item) => (
          <div key={item.id}>
            <button onClick={() => handleClick(item.name)} style={{ color: "white", backgroundColor: "grey", width: "100%", backgroundColor: activeButton === item.name ? "green" : "grey" }}>
              {item.name}
            </button>
            {activatedPlan === item.name && (
              <div>
                {activeButton === item.name ? (
                  <>
                    <button onClick={() => handleClick2(item.name)} style={{ backgroundColor: "red" }}>Deactivate</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleClick1(item.name)} style={{ backgroundColor: "green" }}>Activate</button>
                  </>
                )}
                <button onClick={() => handleView(item.name)} style={{ backgroundColor: "blue" }}>View Plan</button>
                {/* <button onClick={() => handleUpdate(item.name)} style={{ backgroundColor: "blue" }}>Update Plan</button> */}

               {/* <button onClick={() => openModal(item.name)}  style={{ backgroundColor: "blue" }}>Share Plan</button>    */}
               
              </div>
            )}
          </div>
        ))}







{/* <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div style={{ height: "90%",width:"100%",overflowY: "scroll",justifyContent: "center",alignItems: "center" }}>
      <h2 style={{textAlign:"center"}}> <b>Choose for Shared Plan</b></h2>
      <button style={{background:"red",display:"flex",justifyContent: "center",alignitems: "center"}} onClick={Allusercheck}>Select All</button>
      {usernameforshareplan.map(item => (
        <div key={item.id}>
          <div style={{margin:"0px"}} class="container">
          
                    <div>
          <label>
            <input
              type="checkbox"
              value={item.name}
              checked={selectedItems.includes(item.name)}
              onChange={event => handleCheckboxChange(event, item.name)}
            />
            
          
          </label>
          </div>
         
          <div class="box1">
            <h2>
              {item.name}
            </h2>
          
          </div>
         
            
          </div>
        </div>
      ))}
      </div>
      <button style={{background:"red",display:"flex",justifyContent: "center",alignitems: "center"}} onClick={closeModal}>Share Plan</button>
     
    </Modal> */}




      </div>
    </>
  );
};






















// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import NavbarUser from "../Navbar/NavbarUser";
// import { color } from "framer-motion";
// import ResponsiveNavUser from '../ResponsiveNavUser'

// export const ViewPlan = (props) => {
//   const loginId = localStorage.getItem("loginId");
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [active, setActive] = useState([]);
//   const [activatedPlan, setActivatedPlan] = useState(null);
//   const [activeButton, setActiveButton] = useState(null);
//   const [share, setShare] = useState(null);


//   const[activeplanday,setActiveplanDay]=useState(0);
//     useEffect(() => {
        
     
//           fetch(`${global.Apipath}/D_B_D_P/api/User/Getactivedayplan?User_id=${loginId}`)
//             .then(response => response.json())
//             .then(data => setActiveplanDay(data))
//             .catch(error => console.error(error));
            
//       })



//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios.get(
//         "${global.Apipath}/D_B_D_P/api/User/viewplan?id=" + loginId
//       );
//       setData(result.data);
//     };
//     fetchData();
//   }, []);


//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios.get(
//         "${global.Apipath}/D_B_D_P/api/User/getactiveplanname?id=" + loginId
//       );
//       setActive(result.data);
//       console.log("Result of get api for activeplan = "+result.data)
//       if(result.data==="null")
//       {

//       }
//       else{
//         setActiveButton(result.data);
//       }
//     };
//     fetchData();
//   }, []);



//   const handleClick = (name) => {
//     setActivatedPlan(name);
//     // setActiveButton(name);
//   };
//   const handleClick1 = (name) => {
//     console.log("name="+name)
//     setActivatedPlan(name);
//         axios.post("${global.Apipath}/D_B_D_P/api/User/ActivePlan", { name, loginId })
//       .then((response) => {
//         console.log("Plan activated:", response.data);
//       })
//       .catch((error) => {
//         console.log("Error activating plan:", error);
//       });
//     setActiveButton(name);
//     setActivatedPlan(null);
    
//   };
//   const handleClick2 = (name) => {
    
//       if(name===activeButton)
//       {
//         axios.post("${global.Apipath}/D_B_D_P/api/User/DeActivePlan", { name, loginId })
//       .then((response) => {
//         console.log("Plan activated:", response.data);
//       })
//       .catch((error) => {
//         console.log("Error activating plan:", error);
//       });
//         setActiveButton(null);
//       }
//     setActivatedPlan(null);
    
    
//   };
//  const handleView = (name) => {
//     console.log({name})
//     const name1={name}
//     // navigate('/ViewPlanDetails', { state:  name1 });
//     //  navigate(`/ViewPlanDetails/${name1}`);
//      navigate(`/ViewPlanDetails?name1=${name}`);
//   };   

//   const handleShare = (name) => {
//     //console.log({name})
//     const name1={name}
//     // console.log("name",name)

//     fetch(`${global.Apipath}/D_B_D_P/api/User/PlanShare?planname=${name}&loginId=${loginId}`)
//     .then(response => response.json())
//     .then(data => setShare(data))
//     .catch(error => console.error(error));
//     console.log("Data is =",data)
//     if(share=='OK')
//     {
//       alert("Plan Shared Succesfully")
//     }
//     else
//     {
//       alert("Something Error")
//     }

    
//     setActivatedPlan(null);
//   }; 


//   const handleUpdate = (name) => {
//     console.log({name})
//     const name1={name}

//      navigate(`/UpdatePlan?name1=${name}`);
//   };  



//   return (
//     <>
//       <ResponsiveNavUser />
      
//       <div className="form-container" style={{ height: "700px", overflowY: "scroll" }}>
//       <h2 style={{textAlign:"center",color:"white"}}>

// Your active plan day is {activeplanday}
// </h2>
//         {data.map((item) => (
//           <div key={item.id}>
//             <button onClick={() => handleClick(item.name)} style={{color:"white",backgroundColor:"grey",width:"100%",backgroundColor: activeButton === item.name ? "green" : "grey" }} >
//               {item.name}
//             </button>
//             {activatedPlan === item.name && (
//               <div>
//                 <button onClick={() => handleClick1(item.name)} style={{backgroundColor:"green"}}>Activate</button>
//                 <button onClick={() => handleClick2(item.name)} style={{backgroundColor:"Red"}}>Deactivate</button>
//                 <button onClick={() => handleView (item.name)} style={{backgroundColor:"blue"}}>View Plan</button>
//                 {/* <button onClick={() => handleShare (item.name)} style={{backgroundColor:"blue"}}>Share Plan</button> */}
//                 <button onClick={() => handleUpdate (item.name)} style={{backgroundColor:"blue"}}>Update Plan</button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

