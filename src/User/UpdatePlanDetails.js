import React, { useState, useEffect,useHistory } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import NavbarUser from "../Navbar/NavbarUser"; 
import  Modal  from "react-modal";
import ResponsiveNavUser from '../ResponsiveNavUser'


function UpdatePlanDetails() {
    const navigate = useNavigate()
  const location=useLocation()

  const [data2, setData2] = useState([]);
  const [mealoption, setMealoption] = useState('Breakfast');
  const [age, setAge] = useState(1);
  const [foods, setFoods] = useState([]);
  const [blockfoods, setBlockFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [remCalories, setRemCalories] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [ing_List, setIng_List] = useState([]);
  const [restrict_ing_List, setRestrict_ing_List] = useState([]);
  const [newList, setNewList] = useState([]);
  const[day_list,setDay_list]=useState([]);
  const [quantity, setQuantity] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState([]);
  const [sendcate,setSendcate]=useState('');
const[foodlist,setfoodlist]=useState([])
  const[ingshow,setIngshow]=useState([]);
  const[usecount,setUsecount]=useState(0);
  const[calcountforuse,setCalcountforuse]=useState(0);



  const[avin,setAvin]=useState(false);
  const[checker,setChecker]=useState(false);
  let [counter,setCounter]=useState(0);

  const [chk, setChk] = useState(false);

  const [ingcount, setIngCount] = React.useState(0);
  const [newrestrict, setNewrestrict] = useState([]);



  const loginId = localStorage.getItem("loginId");
  const name1 = new URLSearchParams(location.search).get("name1");
  const calories1 = new URLSearchParams(location.search).get("calories1");
  const days1 = new URLSearchParams(location.search).get("days1");




  
  useEffect(() => {
    if(usecount<=0)
    {
        fetchData();

    }
        
  }, []);

  const fetchData = async () => {
    try {
        setUsecount(2)
      const response = await fetch(`${global.Apipath}/D_B_D_P/api/User/GetPlanDetailsforUpdateData?planname=${name1}&loginId=${loginId}`);
      const data = await response.json();
      if (response.ok) {
        const newDataList = data.map(item => ({
          Fid: item.Fid,
          loginId: item.Userid,
          mealtype: item.mealtime,
          totalcalories1: item.calories,
          calorieslimit: calories1,
          selectedCategoryId : item.category,
          day: item.day,
          quantity: item.quantity,
          checked: true,
        }));


        setDataList([...dataList, ...newDataList]);
       
      } else {
       // console.log('Error: ', data);
        setUsecount(3);
      }
    } catch (error) {
      //console.log('Error: ', error);
    }
  };



  useEffect(() => {
    //console.log("datalist updated:", dataList);
    setSelectedFoods(dataList)
  }, [dataList]);

  useEffect(() => {
   // console.log("selected foods", selectedFoods);
    
  },[selectedFoods]);
  


  useEffect(() => {
    if(calcountforuse===0)
    {
    const newDataList = dataList.map(item => {
     setCalcountforuse(3);
      if(item.day===age)
      {
        const updatedTotalcalories = item.totalcalories1;
        setTotalCalories(updatedTotalcalories);
        setRemCalories(calories1 - updatedTotalcalories );
        
      }
      const existingAgeIndex = day_list.findIndex((item) => item.age === item.day);
      if (existingAgeIndex !== -1) {
        // Age already exists, update totalCalories
        day_list[existingAgeIndex].totalCalories = item.totalcalories1;
       // console.log("day_list in !==-1",day_list)
      } else {
        // Age does not exist, add new entry to day_list
        day_list.push({ age: item.day, totalCalories: item.totalcalories1 });
        //console.log("day_list in else part",day_list)
      }
      //console.log("day_list===================",day_list)
      setCalcountforuse(5);
    });
  }
  });









  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [ingredientData, setIngredientData] = useState(null);

  const handleDetailsClick = async (food) => {
    setSelectedFood(food);
   // console.log("food",food)

    try {
      const response = await fetch(`${global.Apipath}/D_B_D_P/api/User/ingredientdetailsget?iid=${food.Fid}`);
      const data = await response.json();
      setIngredientData(data);
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


  const foruploadingdayintodatabase=1;
  useEffect(()=>{
    setRemCalories(calories1 - totalCalories ); 
  })
  


  useEffect(() => {
    async function fetchData() {
      const response1 = await axios.get(`${global.Apipath}/D_B_D_P/api/User/getfoodcategoryitem`);
      setData2(response1.data);
      const { name } = response1.data[0];
      await handleOption2Change({ target: { value: name } });
    }
  
    fetchData();
  }, []);
  
 
  

  const days11=3;
  const dayOptions = Array.from(   {length: parseInt(days1)}, (_, index) => index + 1);


  const options2 = data2.map(item => (
    <option key={item.id} value={item.id}>{item.name}</option>
  ));
 
  const handleOption2Change = async (event) => {
    const id=event.target.value
    console.log("id===============",id)
    setSelectedCategoryId(id)
    try {
      const response = await fetch(`${global.Apipath}/D_B_D_P/api/User/getcategoryfood?iid=${id}&loginId=${loginId}`);
      const jsonData = await response.json();
      setFoods(jsonData);

      const response1 = await fetch(`${global.Apipath}/D_B_D_P/api/User/getcategoryblockfood?iid=${id}&loginId=${loginId}`);
      const jsonData1 = await response1.json();
      setBlockFoods(jsonData1);
      // console.log("===================================",jsonData1)


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  
 
   
  };

  

  const handleOption2Change1 = async (event) => {
    const per_day = event.target.value;
    setAge(per_day);
    const existingAge = day_list.find((item) => item.age == per_day);
    if (existingAge) {
      setTotalCalories(existingAge.totalCalories);
      setRemCalories(calories1-existingAge.totalCalories)
    } else {
      setTotalCalories(0)
      setRemCalories(calories1-totalCalories)
    }
  
  };
  

  const handleCallingforuncheck = async (food) => {
    const response1 = await fetch(`${global.Apipath}/D_B_D_P/api/User/ingredientwithsameunit?iid=${food.Fid}`);
      const jsonData1 = await response1.json();
      setIng_List(jsonData1);
  };

  useEffect(() => {
    // console.log("--",ing_List);
   }, [ing_List]);
 


   const handleCalling = async  (food) => {
    let abs;
   let somey= await fetch(`${global.Apipath}/D_B_D_P/api/User/ingredientwithsameunit?iid=${food.Fid}`)
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
    setIng_List(data);
    setAvin(true)
      let found = false;
      //console.log(newList)
    //  debugger
      newList.forEach(existingItem => {
        // debugger
        if (existingItem.name == item.name && existingItem.days==age) {
          existingItem.quantity += item.quantity;
            existingItem.days = age;
           existingItem.countquan = 1;
          found = true;
        }
      });

      if (!found) {
         item.countquan = 1;
         item.days = age; 
        newList.push(item);
      }
    });
  

  
    abs=tempFunctio(data)
    //console.log(abs)
   
  })
  .catch(error => {
   // console.error(error);
  });

  return abs;  
  };

  useEffect(() => {
    //console.log("--",ing_List)    
  },[ing_List]);


  useEffect(() => {
    //console.log("--",newList)    
  },[newList]);



  const handleCallingforquantity= async  (food) => {
    let abs;


      const response = await fetch(`${global.Apipath}/D_B_D_P/api/User/ingredientwithsameunit?iid=${food.Fid}`);
      const data = await response.json();
      return data;  
  };

  useEffect(() => {

    if(counter<10)
    {
    fetch(`${global.Apipath}/D_B_D_P/api/User/getrestrictedingredient?loginId=`+loginId)
       .then(response => response.json())
       .then(data => {
  const getrec=data;
   getrec.forEach(item => {
    let found = false;
    newrestrict.forEach(existingItem => {
        if (existingItem.name === item.name) {
          existingItem.quantity = item.quantity;
          found = true;
        }
      });
  
      if (!found) {
         
        newrestrict.push(item);
      }
    });
  console.log(newrestrict);
        setRestrict_ing_List(data)
        //console.log(restrict_ing_List)
     });
     let forcounter=1;
     counter=forcounter+counter;
     setCounter(counter)
    }
    },[restrict_ing_List]);


    useEffect(() => {
      //console.log("--",newList)    
    },[newList]);
  
    useEffect(() => {
      console.log("--",restrict_ing_List)    
    },[restrict_ing_List]);


    const tempFunctio=async (Param_ing_List)=>{
   
      //console.log("neew list in temp function",newList)
     
       let requiredData;
      let coun=1;
       let inname="";
       let checkname="false";
   
     newList.forEach(existingItem => {
       restrict_ing_List.forEach(item => {
       
           if (existingItem.name == item.name && existingItem.days==age && existingItem.quantity>item.quantity) {
             // alert(item.name+" intake limit Exceed");
             checkname="true";
         coun++;
             inname=item.name;
            Param_ing_List.forEach(nlist =>{
               newList.forEach(inglist => {
   
                 if (nlist.name == inglist.name && inglist.days==age) {
                   // debugger
                   inglist.quantity =inglist.quantity-nlist.quantity;
                 
                 }
               });
             });
           }   
         });
       });
     if(coun>1)
     {
      
        alert(inname+" intake limit Exceed")
        tochecktrue(true);
        
     }
     else
     {
       tochecktrue(false);
     }
     console.log("checked is true or false ?",checkname)
      return checkname;
     }
   
   
   
   
     const tochecktrue=(don)=>{
   
       setChk(don)
       //console.log(chk)
      
     }

     useEffect(() => {
      console.log('chk Updated.',chk);
  
    },[chk]);
    const tochecktrueorfalse=()=>{
  
     //console.log(chk)
    }
  
   
    
    useEffect(() => {
      console.log("--",newList)    
    },[newList]);

    






  const handleSelectFood = async (event, food, type) => {

    if (type === "checkbox") 
    {


      const isChecked = event.target.checked;
      let asd=await handleCalling(food)
     
      tochecktrueorfalse();
      if (isChecked) {
        
        if (totalCalories + food.calories <= calories1 && asd!=="true") {
          setSelectedFoods([...selectedFoods, { ...food, quantity: 1, day : age,mealtype:mealoption}]);
          setTotalCalories(totalCalories + food.calories);
          console.log("setTotalCalories",totalCalories)
          const newData = {
            Fid: food.Fid,
            loginId:loginId,
            mealtype: mealoption,
            totalcalories1: totalCalories+food.calories,
            calorieslimit: calories1,
            selectedCategoryId:selectedCategoryId,
            day: age,
            quantity: 1 
          };
          setDataList([...dataList, newData]);
          setRemCalories(calories1 - totalCalories );    


          const existingAgeIndex = day_list.findIndex((item) => item.age === age);
      if (existingAgeIndex !== -1) {
        // Age already exists, update totalCalories
        day_list[existingAgeIndex].totalCalories = totalCalories+food.calories;
       // console.log("day_list in !==-1",day_list)
      } else {
        // Age does not exist, add new entry to day_list
        day_list.push({ age: age, totalCalories: totalCalories+food.calories });
        //console.log("day_list in else part",day_list)
      }
                  
        } 
        else {
          alert("You have exceeded the limit of calories!");
          setChk(false)
          event.target.checked = false;
        }
      } 
      else {
        let arr = [];
        for (let i = 0; i < selectedFoods.length; i++) {
          if (
            selectedFoods[i].Fid === food.Fid &&
            selectedFoods[i].day === age &&
            selectedFoods[i].mealtype === mealoption
          ) {
  
          } 
          else 
          {
            arr.push(selectedFoods[i]);
          }
        }
              const filteredFoods = selectedFoods.filter((f) => f.Fid !== food.Fid && f.day != age && f.mealtype!=mealoption);
              setSelectedFoods(arr);
        
              const updatedDataList = dataList.filter(
                (item) => item.Fid !== food.Fid || item.mealtype !== mealoption
              );
              let counter=0;
              const quan = dataList.filter((item) => {
                if (item.Fid === food.Fid) {
                 // console.log("------food calories-----",food.calories)
                 // console.log("------item quantity-----",item.quantity)
                 // console.log("-------totalCalories -----",totalCalories)
                  counter=totalCalories - food.calories * item.quantity;
                  //console.log("counter  =",counter)
                  setTotalCalories(totalCalories - food.calories * item.quantity);
                 
                }
                return item.Fid !== food.Fid || item.quantity !== quantity;
              });
              

              const existingAgeIndex = day_list.findIndex((item) => item.age === age);
              if (existingAgeIndex !== -1) {
                // Age already exists, update totalCalories
                day_list[existingAgeIndex].totalCalories = counter;
                //console.log("ageesict calories",day_list)
              }
            
             
        
           
         
              setDataList(updatedDataList);

              setRemCalories(calories1 - totalCalories);

             
           // handleCallingforuncheck(food)
          let data=await handleCallingforquantity(food)
          data.forEach(inglist1=>{
           newList.forEach(nlist1=>{
               if(inglist1.name === nlist1.name && nlist1.days===age && nlist1.quantity>=inglist1.quantity)
               {
                 
                 let are=nlist1.countquan;
                 while(are>0)
                 {
                   nlist1.quantity =nlist1.quantity-inglist1.quantity;
                   are--;
                 }
                 nlist1.countquan = 0;
               }
             }
           ) 
         })

           
         //console.log("new list after uncheck",newList)
        // console.log("restrict ing list",restrict_ing_List)
              
            }
    }



    else if (type === "quantity")
     {
      let countquan=parseInt(event.target.value);
      //console.log("count90=============================",count90)
      //console.log("day_list before chaning===================",day_list)
      const updatedSelectedFoods = selectedFoods.map((f) => {
        if (f.Fid === food.Fid) {
          f.quantity = parseInt(event.target.value);
          
        }
        return f;
      });
      setSelectedFoods(updatedSelectedFoods);
    
      const updatedDataList = dataList.map((item) => {
        if (item.Fid === food.Fid) {
          item.quantity = parseInt(event.target.value);
        }
        return item;
      });
      setDataList(updatedDataList);
    
      const updatedTotalCalories = updatedSelectedFoods.reduce((f) => {
        //console.log("quantity===================",countquan)
        // console.log("total===================",total)
        //console.log("fcalories===================",f.calories)
        //console.log("fquantity===================",f.quantity)
        return totalCalories + food.calories * 1;
      }, 1);

     // console.log("updatedTotalCalories===================",updatedTotalCalories)
      const existingAgeIndex = day_list.findIndex((item) => item.age === age);
      if (existingAgeIndex !== -1) {
        // Age exists, update totalCalories
        day_list[existingAgeIndex].totalCalories = updatedTotalCalories;
      }
     // console.log("day_list   after===================",day_list)

      setTotalCalories(updatedTotalCalories);
    
      setRemCalories(calories1 - updatedTotalCalories);




     



      let data=await handleCallingforquantity(food)
      //console.log("data",data)
      let count = 1;
      let nameCounted = [];
      
      restrict_ing_List.forEach(item => {
       
      newList.forEach(existingItem => {
        
        
        
          if (existingItem.name === item.name && existingItem.quantity < item.quantity) {
            data.forEach(nlist => {
              
              newList.forEach(inglist => {
                // debugger
                if (nlist.name === inglist.name && inglist.days===age && inglist.quantity < item.quantity && !nameCounted.includes(nlist.name)) {
                  count++;
                  inglist.quantity = inglist.quantity + nlist.quantity;
                  inglist.countquan = countquan; // Add the 'day' property to the inglist object
                  nameCounted.push(nlist.name);
                }
                
              });
            });
          }
        });
      });
      
      
      restrict_ing_List.forEach(item => {
       
        newList.forEach(existingItem => {
          
          
          
            if (existingItem.name === item.name && existingItem.quantity > item.quantity) {
              data.forEach(nlist => {
                
                newList.forEach(inglist => {
                  // debugger
                  if (nlist.name === inglist.name && inglist.days===age) {
                   
                    count++;
                    let con=1;
                    inglist.quantity = inglist.quantity - nlist.quantity;
                    inglist.countquan = countquan-con; // Add the 'day' property to the inglist object
      
                  }
                  
                });
              });
              alert("67909uyh")
            }
          });
        });
       // console.log("new List after calling updating",newList)      




    };

    }
    
    
  
  
  
  useEffect(() => {
    const lastSelectedFood = selectedFoods[selectedFoods.length - 1];
    if (totalCalories > calories1 && lastSelectedFood) {
      alert("calories limit exceed")
      setSelectedFoods(selectedFoods.filter((f) => f.Fid !== lastSelectedFood.Fid));
      setTotalCalories(totalCalories - lastSelectedFood.calories * lastSelectedFood.quantity);
      setRemCalories(calories1 - totalCalories);
    }
    
  }, [selectedFoods, totalCalories]);


  
  const handleChange = (event) => {

    // setSelectedFoods([])
    setMealoption(event.target.value);
    
  }
 


const postToDatabase = async () => {

  
  try {
    const response = await axios.post(`${global.Apipath}/D_B_D_P/api/Demo/PostData?planname=`+name1, dataList);
    //console.log(response.data);
    alert("Update Plan successfully");
  } catch (error) {
    //console.error(error);
    alert("Failed to save data!");
  }
};

function saveData() {
  const url = `${global.Apipath}/D_B_D_P/api/Demo/PostData`;
  const data = {
    loginId: loginId,
    name1: name1,
    dataList: dataList
  };
  
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
  
}



  return(
    <>
      <ResponsiveNavUser/>
    

      <table>
          <tbody>
          <tr>
  <td>Plan name: {name1}</td>
  <td>Plan calories: {calories1}</td>
  <td>Remaining calories: {remCalories}</td>
</tr>
</tbody>
          
        </table>


<div className="row justify-content-center">
  <div className="col-md-4">

  

        <tr>
  <td colSpan="3" className="dropdown">
    <label>Day:</label>
    <select style={{ height:'30px',width: '50px' }} value={age} onChange={handleOption2Change1}>
      {dayOptions.map((day) => (
        <option key={day} value={day}>{day}</option>
      ))}
    </select>
  </td>

  <td colSpan="3" className="dropdown">
    <select style={{ height:'30px',width: '120px' }} value={selectedCategoryId} onChange={handleOption2Change}>
      <option value="">Select Food category</option>
      {options2}
    </select>
  </td>

  <td className="dropdown">
  <select className="form-select quantity-input" value={mealoption} onChange={handleChange} style={{ height:'40px',width: '120px' }}>
    <option value="Breakfast">Breakfast</option>
    <option value="Lunch">Lunch</option>
    <option value="Snacks">Snacks</option>
    <option value="Dinner">Dinner</option>
  </select>
</td>



</tr>
</div> 
</div>




<table>
  <tbody>
    {foods.map((food) => (
      <tr key={food.Fid} >
       <td style={{ width: '8%' }}>
  <input
    type="checkbox"
    checked={selectedFoods.some(
      (f) =>
        f.Fid === food.Fid &&
        f.day === age &&
        f.mealtype === mealoption
    )}
    onChange={(event) => handleSelectFood(event, food, 'checkbox')}
  />
</td>

        <td style={{ width: '5%' }}>
          <div className="circle">
            <img
              src={`${global.Apipath}/D_B_D_P/Images1/${food.image}`}
              alt={food.name}
            />
          </div>
        </td>
        <td>
          <h2 className="food-name">{food.name}</h2>
          <h2 className="food-name">Calories: {food.calories}</h2>
        </td>
        <td style={{ width: '30%' }}>
          <h2 className="food-name">Unit: {food.unit}</h2>
          {selectedFoods.some((f) => f.Fid === food.Fid) && (
            <label>
            <span className="label-text">Quantity:</span>
            <input
              type="number"
              min={1}
              value={selectedFoods.find((f) => f.Fid === food.Fid)?.quantity}
              onChange={(event) => handleSelectFood(event, food, 'quantity')}
              className="quantity-input"
            />
          </label>
          
          )}
        </td>
        <td >
          <button type="button" class="btn btn-info" onClick={() => handleDetailsClick(food)}>Details</button>
        </td>
      </tr>
    ))}


{blockfoods.map((food) => (
        
        <tr key={food.Fid}  style={{ background: "red", margin: "0.5px" }}>
          <td style={{ width: '8%' }}>

          </td>
          <td style={{ width: '5%' }}>
          <div >
            <div className="circle">
              <img src={`${global.Apipath}/D_B_D_P/Images1/${food.image}`} alt={food.name} />
            </div>
          </div>
          </td>
          <td >
          <div >
            <h2 className="food-name">{food.name}</h2>
            <h2 className="food-name">Calories: {food.calories}</h2>
          </div>
          </td>
          <td style={{ width: '30%' }}>
          <div >
            <h2 className="food-name">Unit: {food.unit}</h2>
          </div>
          </td>
          <td>
          <div >
            <td>
              <button type="button" class="btn btn-info" onClick={() => handleDetailsClick(food)}>Details</button>
            </td>
          </div>
          </td>
        </tr>
      ))}
  </tbody>
</table>

  <button type="button" class="btn btn-success" onClick={postToDatabase}>Update Plan</button>

  <div>
    {selectedFood && (
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2 ><b>Ingredients Of  {selectedFood.name}</b></h2>

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

        <button onClick={closeModal}>Close</button>
      </Modal>
    )}
  </div>


      
    </>
  )

};
export default UpdatePlanDetails;