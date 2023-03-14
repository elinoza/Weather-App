import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container,Button } from "react-bootstrap";

const Register =()=>{


    const [email, setEmail] = useState("test@test.com")
    const [password, setPassword] = useState("test12345")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [error, setError] = useState("jjj")
    const history = useHistory()
  

    return (
        <>
          <Container
        fluid
        className="shadow "
        style={{
          height: "800px",
          backgroundImage: `url("https://images.unsplash.com/photo-1472190649224-495422e1b602?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80")`,
          objectFit: "contain",
        }}>
    <Container 
     id="signup-page-wrapper"
     className="shadow d-flex  align-items-center"
     style={{flexDirection:"column",
     border: "none", padding:"20px"}}
     >
      <h1 className="text-white">Add your favourite cities by signing up! </h1>
      <div className="form-inputs">
        <form className="form" onSubmit={signUp} >
        <label>Name </label>
          <input
            className="form-input"
            id="name" // WITH THIS ID IT CHECKS IF IT'S A VALID name
            name="name"
            type="name"
            placeholder="name adress or username"
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
            placeholder="surname adress or username"
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
          <br />
         
      
        </form>
        </div>
    </Container>
    </Container>
        </>
    )
}
export default Register