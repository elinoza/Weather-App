
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
 Container,Card,Col,Row

} from "react-bootstrap";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
function Favs(props) {
  const [city, setCity] = useState({});



  useEffect(() => {
  
    setCity(props.city)
   }, [setCity,props.city]);
  
  // const getFavs = useCallback(async () => {
  //   try {
  //     const url = process.env.REACT_APP_URL;
  //     // const id ="6038f14842ca86203e481354";
  //     let query = `/users/${id}/favs`;;

  //     let response = await fetch(url + query);
  //     if (response.ok) {
  //       let favs2 = await response.json();
  //       setFavs(favs2);
  //       console.log("favs", favs);
        
  //     } else {
  //       console.log(response);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [id]);

  // useEffect(() => {
  //   getFavs();
  // }, [id]);


  return (
   

  


    <Col xs={12}>
    
    <Card style={{ }}>
  
    <Card.Body>
      <Card.Title> {city.favCity}  <MdFavorite
              className=" ml-4"
              style={{ color: "red", fontSize: "20px" }}
             
            /></Card.Title>
    
      
      <Card.Text>
     
      </Card.Text>
      
    </Card.Body>
  </Card>
    </Col> 

  
  

  );
}

export default Favs;
