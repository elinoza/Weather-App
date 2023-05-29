import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container,Button } from "react-bootstrap";
import {useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { emailRegex } from "../../functions/functions";


const Reset =()=>{


   
    const [password, setPassword] = useState("")
    const [info, setInfo] = useState("")
  

    const history = useHistory()
    
  
const signUp=async (e)=>{
e.preventDefault()

try {
    const url = process.env.REACT_APP_URL;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams.get("accessToken"));
    const token = urlParams.get("accessToken");
    console.log("token",token);
    let query = `/users/me`;
    let response = await fetch(url + query ,
      {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({password}),
         withCredentials: true // use cookies
      });
    if (response.ok) {
    
      console.log("password is resetted by successfully", response);
      setInfo("Password is resetted succesfully , please login with your new password.")

      setTimeout(()=>history.push("/"),5000)
      
      
  
    } else {
      console.log(response);
    }
    
} catch (error) {
    console.log(error)
}

}



    return (
        <>

    <Container 
     id="signup-page-wrapper"
     className="ThunderStorm shadow d-flex  align-items-center main-container justify-content-center "
     style={{border: "none", padding:"20px"}}
     >
    
      <div className="form-inputs">
        <form className="form" onSubmit={signUp} novalidate>
      
          <label>Password</label>
          <input
            className="form-input"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
           <p className="text-success">{info}</p>
          <br />
  <input   className="form-input-submit align-self-center" type="submit" value="Reset " />
 
         
      
        </form>
       
        </div>
    </Container>

        </>
    )
}
export default Reset