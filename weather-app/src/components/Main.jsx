import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import  { useState, useEffect, useMemo, useCallback } from "react";




import {
  Col,
  Row,Container

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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  
  //componentDidMount -->
  useEffect(() => {
    getMe();
  }, []);
 
  

  return (
    
    <Container  className="main-container">
      
 <Row>
      <Col xs={12} md={9}
      
      style={{
       
      }}
      >
     <City id={me._id}/>
     </Col>
     <Col  md={3} className="shadow d-none d-md-block side-bar"
  >
     <Favs id={me._id}/>
    </Col>
    </Row>
 
    </Container>
  );
}

export default Main;
