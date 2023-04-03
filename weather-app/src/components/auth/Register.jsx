import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container,Button } from "react-bootstrap";
import {useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'

const Register =()=>{


    const [email, setEmail] = useState("test@test.com")
    const [password, setPassword] = useState("test12345")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [error, setError] = useState("jjj")
    const history = useHistory()
  
const signUp=async (e)=>{
e.preventDefault()
try {
    const url = process.env.REACT_APP_URL;
 
    let query = `/users`;
    let response = await fetch(url + query ,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email,password,name,surname}),
         withCredentials: true // use cookies
      });
    if (response.ok) {
    
      console.log("user is created", response);
      history.push("/")
      
  
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
     className="shadow d-flex  align-items-center main-container justify-content-center "
     style={{border: "none", padding:"20px"}}
     >
    
      <div className="form-inputs">
        <form className="form" onSubmit={signUp} >
        <label>Name </label>
          <input
            className="form-input"
            id="name" // WITH THIS ID IT CHECKS IF IT'S A VALID name
            name="name"
            type="name"
            placeholder=""
            value={name} // TAKES THE VALUE FROM MY CUSTOM HOOKS IN USEFORM COMPONENT
            onChange={e => setName(e.target.value)} // THE FUNCTION THAT LISTENS TO THE CHANGE OF THE VALUE

          />
          <br />
          <label>Surname </label>
          <input
            className="form-input"
            id="surname" // WITH THIS ID IT CHECKS IF IT'S A VALID surname
            name="surname"
            type="surname"
            placeholder=""
            value={surname} // TAKES THE VALUE FROM MY CUSTOM HOOKS IN USEFORM COMPONENT
            onChange={e => setSurname(e.target.value)} // THE FUNCTION THAT LISTENS TO THE CHANGE OF THE VALUE

          />
          <br />
   
          <label>Email address </label>
          <input
            className="form-input"
            id="email" // WITH THIS ID IT CHECKS IF IT'S A VALID EMAIL
            name="email"
            type="email"
            placeholder="Email adress "
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
          <br />
  <input   className="form-input-submit align-self-center" type="submit" value="SIGN UP" />
         
      
        </form>
        <hr />
        <h4 className="text-center mb-3">Do you already have an account?</h4>
        <button onClick={() => (window.location = "/") } id="bottom-btn">LOG IN </button>
        </div>
    </Container>

        </>
    )
}
export default Register