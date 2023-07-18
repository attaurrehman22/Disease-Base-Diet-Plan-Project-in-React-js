import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export const Register=(props)=>{
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    setData({ ...data, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost//D_B_D_P/api/User/Signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
      // do something with the response data
      navigate("/Login")
    } catch (error) {
      console.error(error);
      // handle error
    }
  };

  return (
    <>
     
     <div className="App">
       <div className="auth-form-container">

    <form className="login-form" onSubmit={handleSubmit}>
    <h2 className="Login-name">Register</h2>
      <input
        onChange={handleInputChange}
        id="name"
        value={data.name}
        placeholder="name"
        type="text"
      ></input>
      <input
        onChange={handleInputChange}
        id="username"
        value={data.username}
        placeholder="username"
        type="text"
      ></input>
      <input
        onChange={handleInputChange}
        id="password"
        value={data.password}
        placeholder="password"
        type="password"
      ></input>
      <button type="submit">Submit</button>
    </form>
    <div>
        <h4> Already have an account? <a style={{color:"blue",marginTop:"2px"}} href="Login">Login</a></h4>
        
      </div>
    </div>
    </div>
    </>
  );
//     const navigate = useNavigate();
//     const baseurl ="http://192.168.0.119//D_B_D_P/api/User/Signup"
//   const[data,setData]=useState({
//     name:"",
//     username:"",
//     pasword:""
// })
// async function submit(e){
//     e.preventDefault();
//     var dataApi=JSON.stringify({
//         name:data.name,
//         username:data.username,
//         pasword:data.pasword
//     });


//     var config = {
//       method: 'post',
//     maxBodyLength: Infinity,
//       url: 'http://192.168.0.119/D_B_D_P/api/User/Signup',
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "192.168.0.119",
//        },
//        data: dataApi,
//     };
    
//     // axios(config)
//     // .then(function (response) {
//     //   console.log(JSON.stringify(response.data));
//     // })
//     // .catch(function (error) {
//     //   console.log(error);
//     // });
//     try {
//       const { data } = await axios(config);
//       alert("Pass")
//       console.log("Data: ",{success:true})
//       if(data.success == true){
//         // Navigation code here
//         navigate('/')
//       }else{
//         alert("wrong username or pasword")
//       }
//       console.log("Pass: ", data);
//     } catch (error) {
//       alert("Fail")
//       console.log("Fail: ", error);
//     }

// }
// function handle(e){
//      const newdata={...data}
//      newdata[e.target.id]=e.target.value
//      setData(newdata)
//      console.log(newdata)
// }
// return (
// <>

//   <div className="App">
//    <div className="auth-form-container">
//     <form className="login-form" onSubmit={(e)=>submit(e)}>
//          <input onChange={(e)=>handle(e)}id="name" value={data.name} placeholder="name" type="text" ></input>
//          <input onChange={(e)=>handle(e)}id="username" value={data.username} placeholder="username" type="text" ></input>
//          <input onChange={(e)=>handle(e)}id="pasword" value={data.pasword} placeholder="pasword" type="pasword" ></input>
//          <button variant="primary">Submit</button> 

//          {/* <a href={`Login`}>Login</a> */}
//   </form>
//   <button className="link-btn" onClick={()=>props.onFormSwitch('Login')}> Already have account? Login</button>
//   </div>
// </div>
// </>

// )

}