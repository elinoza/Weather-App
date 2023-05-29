import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container,Button } from "react-bootstrap";
import {useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { emailRegex } from "../../functions/functions";

const Register =()=>{


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [error, setError] = useState("")
    const [emailError, setEmailError] = useState("")
    const[theme,setTheme]=useState("ThunderStorm")
    const [info, setInfo] = useState("")


    const history = useHistory()

    const themeToggler=()=>{
      const themes=["ThunderStorm","Clear","Drizzle","Rain","Snow","Atmosphere","Clouds"]
themes.map((elem,i)=>
    setTimeout(()=>{{setTheme(elem)};console.log(theme,elem)}, 7000*i))
    }
  
const signUp=async (e)=>{
e.preventDefault()
if(emailValidation){
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
      setInfo("Your account created successfully , please login with your new password.")

      setTimeout(()=>history.push("/"),5000)
  
      
  
    } else {
      console.log(response);
      setError("user already exists in database")
    }
    
} catch (error) {
  setError("user already exists in database")
    console.log(error)
}
}
}

const emailValidation=()=>{
if( !email|| emailRegex.test(email)=== false){
  setEmailError("Email is not valid")
  return false

}
{return true}

}

useEffect(()=>{themeToggler()},[])

    return (
        <>

    <Container 
     id="signup-page-wrapper"
     className={`${theme} shadow d-flex  align-items-center main-container justify-content-center`}
     style={{border: "none", padding:"20px"}}
     >
    
      <div className="form-inputs">
        <form className="form" onSubmit={signUp} novalidate>
        <label>Name </label>
          <input
            className="form-input "
            id="name" // WITH THIS ID IT CHECKS IF IT'S A VALID name
            name="name"
            type="name"
            placeholder=""
            value={name} // TAKES THE VALUE FROM MY CUSTOM HOOKS IN USEFORM COMPONENT
            onChange={e => setName(e.target.value)} // THE FUNCTION THAT LISTENS TO THE CHANGE OF THE VALUE
            required

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
            required
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
            required
          />
           <span className="text-danger">{error}</span>
           
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
            required
          />
        
          <br />
  <input   className="form-input-submit align-self-center" type="submit" value="SIGN UP" />
  <p className="text-success">{info}</p>

      
        </form>
        <hr />
        <h4 className="text-center mb-3">Do you already have an account?</h4>
        <button onClick={() => (window.location = "/") } className="buttons" id="bottom-btn">LOGIN </button>
        </div>
    </Container>

        </>
    )
}
export default Register