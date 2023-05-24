import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container,Button } from "react-bootstrap";
import {useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

import google from "../../logo/google.png";
import { FcGoogle } from "react-icons/fc";





const Login = () => {
  // const { handleChange, values, handleSubmit } = useForm(); // DESTRUCTURING HOOKS TO BE ABLE TO USE THEM IN THIS COMPONENT

  const [email, setEmail] = useState("test@test.com")
  const [password, setPassword] = useState("test12345")
  const [error, setError] = useState("")
  const history = useHistory()
  const[theme,setTheme]=useState("ThunderStorm")

  const getTokens = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams.get("accessToken"));
    if (!urlParams.has("accessToken")) {
    } else {
      const token = urlParams.get("accessToken");
      console.log("token",token);
      localStorage.setItem("token", token);
    window.location.replace("/Main");
    }
  };

  const themeToggler=()=>{
    const themes=["ThunderStorm","Clear","Drizzle","Rain","Snow","Atmosphere","Clouds"]
    const count=themes.map((elem,i)=>
  setTimeout(()=>{{setTheme(elem)};console.log(theme,elem)}, 7000*i))
  }


  const login = async (e)=> {
    try {
      e.preventDefault()
      console.log(email,password)
      const url=process.env.REACT_APP_URL
      const res = await axios(`${url}/users/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          email, password
        }, withCredentials: true // use cookies
      })
      console.log(res)
     // localStorage.setItem("token", res.data)
       //window.location.replace("/Main")
      if (res.statusText==="OK"|| res.status===200){
      localStorage.setItem("token", res.data)
       history.push("/Main")
      }
      else{console.log(res.status,"res.status")
      setError("Email or password is not correct")
    }
    
      
    } catch (error) {
    
      console.log("error from catch",error)
      setError("Email or password is not correct")
    }
      
    };
    useEffect(() => {
      getTokens()
      themeToggler()
 
    }, []);
    


    const resetPassword=async(e)=>{
      e.preventDefault()
      try {
       
        const url=process.env.REACT_APP_URL
        const query= "/users/send/email"
        console.log("email",email)
        let res= await fetch(url+query,{
          method:"POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email:email }),
          withCredentials: true, // use cookies
          
        }
          )

          if (res.ok){
            console.log(res)

          }
          else{
            setError("Email not found.")
            console.log(res)

          }



      } catch (error) {
        setError("Email not found or valid")
        console.log(error)
        
      }
    }

   
  return (


    <Container 
     id="signup-page-wrapper"
     className={`shadow d-flex  ${theme} align-items-center main-container justify-content-center`}
     style={{flexDirection:"column",
     border: "none", padding:"20px"}}
     >

      

     
      <div className="form-inputs">
        <form className="form" onSubmit={login} >
   
          <label>Email address or username</label>
          <input
            className="form-input"
            id="email" // WITH THIS ID IT CHECKS IF IT'S A VALID EMAIL
            name="email"
            type="email"
            placeholder="Email adress or username"
            value={email} // TAKES THE VALUE FROM MY CUSTOM HOOKS IN USEFORM COMPONENT
            onChange={e => setEmail(e.target.value)} // THE FUNCTION THAT LISTENS TO THE CHANGE OF THE VALUE

          />
          <br />
          <label>Password</label>
          <input
            className="form-input"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <p className="text-danger">{error}</p>
   
          <button onClick={resetPassword } id="forgotUrPasswordBtn"> Forgot your password? </button> 
          <div className="submit-btn">
            <input type="checkbox" id="checkbox" className="my-auto" />
            <p className="ml-n5 my-auto">Remember me</p>
            <input   className="form-input-submit" type="submit" value="LOG IN" />
          </div>
      
        </form>
       
        <hr />
       
        <div className=" my-2">
        
        <a href={process.env.REACT_APP_URL+"/users/googleLogin"} >  <Button className="  google-button buttons "><FcGoogle id="googleIcon" />Continue with Google </Button></a>
      </div>
       
        <button onClick={() => (window.location = "/register") } className="buttons "> Dont have an account? Sign Up </button>
      </div>
    </Container>

    );
};

export default Login;
