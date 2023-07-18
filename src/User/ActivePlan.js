import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarUser from "../Navbar/NavbarUser";
import { color } from "framer-motion";
import ResponsiveNavUser from '../ResponsiveNavUser'

export const ActivePlan = (props) => {


  const loginId = localStorage.getItem("loginId");
  const navigate = useNavigate();
  const [planname, setPlanname] = useState([]);
  const [activatedPlan, setActivatedPlan] = useState(null);
  const [activeStates, setActiveStates] = useState({});
  const [selectday, setSelectday] = useState(0); // Set initial value to 0
  const [day, setDay] = useState([]);
  const [days, setDays] = useState([]);
  const [mealoption, setMealoption] = useState('Breakfast'); // Set initial value to 'Breakfast'
  const [planDetails, setPlanDetails] = useState([]);
  const [plancal, setPlancal] = useState([]);
  const [activeday, setActiveday] = useState(0);
  const[selectedDay,setSelectedDay]=useState(0);

  useEffect(() => {
    fetch(`${global.Apipath}/D_B_D_P/api/User/Getactivedayplan?User_id=${loginId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("---------",data)
        if (data !== undefined) {
          if(data===0)
          {
            console.log("--------if(data===0)------",data)
            setSelectday(1);
          }
          else
          {
            console.log("-------if(data===0)-----else---------",data) 
            setSelectday(data);
          }
        
        } else {
          console.log("----------else-----------",data)
          setSelectday(-1)
        }
      })
 
      .catch((error) => console.error(error));

     
     
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `${global.Apipath}/D_B_D_P/api/User/ActivePlanname?iid=` + loginId
      );
      setPlanname(result.data);
    };
    fetchData();
  }, []);


  useEffect(()=>{
    if(selectday<0)
    {
     if(planname)
     {
      axios.post(`${global.Apipath}/D_B_D_P/api/User/DeActivePlan`, { planname, loginId })
      .then((response) => {

      })
      .catch((error) => {
        console.log("Error activating plan:", error);
      });

    }

      navigate("/ViewPlan")
      alert("your plan is complete")
     
    }
    else
    {
      console.log("plan day is not complete",selectday)
    }
  },[selectday])

 

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `${global.Apipath}/D_B_D_P/api/User/ActivePlancal?iid=` + loginId
      );
      setPlancal(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetch(
      `${global.Apipath}/D_B_D_P/api/User/getdayofplan?planname=${planname}&userId=${loginId}`
    )
      .then((response) => response.json())
      .then((data) => {
        const daysArray = Array.from({ length: data }, (_, i) => i + 1);
        setDays(daysArray);
      })
      .catch((error) => console.log(error));
  }, [planname, loginId]);

  const handleChange = (event) => {
    setMealoption(event.target.value);
  };

  const handleDayChange = (event) => {
    const newday = event.target.value;
    console.warn("newday",newday)
    setSelectedDay(newday)
    console.warn("selectedday",selectedDay)
  };



 
  const handleshuffle = async () => {
    // console.warn("loginId",loginId)
    // console.warn("planname",planname)
    // console.warn("selectedDay",selectedDay)
    // console.warn("selectday",selectday)
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "loginId": loginId,
  "planname":planname,
  "selectedDay": selectedDay,
  "selectday": selectday
});
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

    fetch("http://192.168.0.100/D_B_D_P/api/User/activeplandayshuffle", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));





    // await fetch(`${global.Apipath}D_B_D_P/api/User/activeplandayshuffle`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     loginId,
    //     planname,
    //     selectedDay,
    //     selectday,
    //   }),
    // })
    //   .then((response) => {
    //     // handle the response if needed
    //   })
    //   .catch((error) => {
    //     console.log("Error calling the API:", error);
    //   });
  };
  
  


  useEffect(() => {
    if (selectday>0) {
      fetch(
        `${global.Apipath}/D_B_D_P/api/User/viewplandetailsnew?day=${selectday}&mealoption=${mealoption}&loginId=${loginId}&planname=${planname}`
      )
        .then((response) => response.json())
        .then((data) => setPlanDetails(data))
        .catch((error) => console.error(error));
    }
  });

  return (
    <>
      <ResponsiveNavUser />

      <div class="container-md">
      <h1> Plan Name :{planname}</h1>
      <h1> Plan Calories :{plancal}</h1>
      
      <h1>Active Day : {selectday}</h1>


  {/* <div className="table">
        <>
          <tr>
          
          </tr>
          <tr>
          <div className="col-md-6">
      <>
        <h4>Day {selectday} shuffle with</h4>
        <select
          id="dayDropdown"
          value={selectedDay}
          onChange={handleDayChange}
          className="form-select"
        >
          <option value="">Select Day</option>
          {days.map((day) => (
            <option key={day} value={day}>
              Day {day}
            </option>
          ))}
        </select>
      </>
    </div>

          </tr>
        </>
        
    <button className="" onClick={handleshuffle}>come here</button>

        </div> */}


  <div className="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Calories</th>
            <th>Unit</th>
            <th>Quantity</th>
            <th>Category</th>
         
            <th>MealTime</th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
          {planDetails.map((detail, index) => (
            <tr key={index}>
              <div className="circle">
              <td><img src={`${global.Apipath}/D_B_D_P/Images1/${detail.fimage}`} alt={detail.fname} /></td>
              </div>
              <td>{detail.fname}</td>
              <td>{detail.fcalories}</td>
              <td>{detail.funit}</td>
              <td>{detail.quantity}</td>
              <td>{detail.fcategory}</td>
            
              <td>{detail.mealtime}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
      </div>
     </div>



    </>
  );
};

