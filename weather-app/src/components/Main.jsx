import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import  { useState, useEffect, useMemo, useCallback } from "react";




import {
  Col,
  Row

} from "react-bootstrap";

import City from "./City"
import Favs from "./Favs"

function Main() {

  const [me, setMe] = useState([]);
  const [accessToken, setToken] = useState("");


  const getMe= useCallback(async () => {
    try {
      const url = process.env.REACT_APP_URL;
      // const id ="6038f14842ca86203e481354";
      let query = `/users/me`;
      let response = await fetch(url + query ,
        {
          headers: {
            "Content-Type": "application/json"
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          }
        });
      if (response.ok) {
       let me= await response.json()
        console.log("me", me);
        setMe(me)
        
    
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
    
  }, []);
  
  useEffect(() => {
    getMe();
  }, []);
 
  // useEffect=()=> {setToken(localStorage.getItem("accessToken")),[localStorage]}
  

  return (
    
    <div >
      
 <Row>
      <Col xs={12} md={9}
      className="shadow "
      style={{
        height: "800px",
        backgroundImage: `url("https://images.unsplash.com/photo-1559215334-45971d3b42b0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1334&q=80")`,
        objectFit: "contain",
      }}
      >
     <City id={me._id}/>
     </Col>
     <Col xs={12} md={3}
     style={{backgroundColor:"#D8E2EA"}}>
     <Favs id={me._id}/>
    </Col>
    </Row>
 
    </div>
  );
}

export default Main;
